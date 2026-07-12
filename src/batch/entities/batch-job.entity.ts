import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  BATCH_JOB_STATUS,
  BatchJobStatus,
} from '../constants/batch-job-status.constant';
import { BatchJobType } from '../constants/batch-job-type.constant';
import { BatchJobFailure } from './batch-job-failure.entity';

@Entity()
export class BatchJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: BatchJobType;

  @Column({
    type: 'enum',
    enum: BATCH_JOB_STATUS,
    default: BATCH_JOB_STATUS.PENDING,
  })
  status: BatchJobStatus;

  @Column({ default: 0 })
  totalCount: number;

  @Column({ default: 0 })
  processedCount: number;

  @Column({ default: 0 })
  successCount: number;

  @Column({ default: 0 })
  failedCount: number;

  @Column({ type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @OneToMany(() => BatchJobFailure, (failure) => failure.job)
  failures: BatchJobFailure[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
