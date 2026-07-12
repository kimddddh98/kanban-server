import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../users/entities/users.entity';
import { BATCH_JOB_STATUS } from './constants/batch-job-status.constant';
import { BATCH_JOB_TYPE } from './constants/batch-job-type.constant';
import { BatchJob } from './entities/batch-job.entity';

@Injectable()
export class BatchService {
  private readonly userInsertChunkSize = 1000;

  constructor(
    @InjectRepository(BatchJob)
    private readonly batchJobRepository: Repository<BatchJob>,
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async seedUsers(count: number) {
    if (!Number.isInteger(count) || count <= 0) {
      throw new BadRequestException('count must be a positive integer.');
    }

    const job = await this.batchJobRepository.save({
      type: BATCH_JOB_TYPE.USER_SEED,
      status: BATCH_JOB_STATUS.PENDING,
      totalCount: count,
    });

    try {
      await this.batchJobRepository.update(job.id, {
        status: BATCH_JOB_STATUS.RUNNING,
        startedAt: new Date(),
      });

      let processedCount = 0;

      for (let offset = 0; offset < count; offset += this.userInsertChunkSize) {
        const chunkSize = Math.min(this.userInsertChunkSize, count - offset);
        const users = Array.from({ length: chunkSize }, (_, index) => ({
          name: `batch-user-${job.id}-${offset + index + 1}`,
        }));

        await this.usersRepository.insert(users);

        processedCount += chunkSize;
        await this.batchJobRepository.update(job.id, {
          processedCount,
          successCount: processedCount,
        });
      }

      await this.batchJobRepository.update(job.id, {
        status: BATCH_JOB_STATUS.SUCCESS,
        processedCount: count,
        successCount: count,
        failedCount: 0,
        finishedAt: new Date(),
      });

      return this.batchJobRepository.findOneByOrFail({ id: job.id });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown batch error.';

      await this.batchJobRepository.update(job.id, {
        status: BATCH_JOB_STATUS.FAILED,
        errorMessage,
        finishedAt: new Date(),
      });

      return this.batchJobRepository.findOneByOrFail({ id: job.id });
    }
  }
}
