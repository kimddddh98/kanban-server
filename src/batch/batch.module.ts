import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from '../users/entities/users.entity';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { BatchJobFailure } from './entities/batch-job-failure.entity';
import { BatchJob } from './entities/batch-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BatchJob, BatchJobFailure, UsersModel])],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
