import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  BATCH_JOB_FAILURE_STATUS,
  BatchJobFailureStatus,
} from '../constants/batch-job-failure-status.constant';
import { BatchJob } from './batch-job.entity';

@Entity()
export class BatchJobFailure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BatchJob, (job) => job.failures, { onDelete: 'CASCADE' })
  job: BatchJob;

  @Column({ nullable: true })
  targetId: string | null;

  @Column({ type: 'jsonb', nullable: true })
  payload: Record<string, unknown> | null;

  @Column({ nullable: true })
  errorCode: string | null;

  @Column({ type: 'text' })
  errorMessage: string;

  @Column({ default: 0 })
  retryCount: number;

  @Column({
    type: 'enum',
    enum: BATCH_JOB_FAILURE_STATUS,
    default: BATCH_JOB_FAILURE_STATUS.FAILED,
  })
  status: BatchJobFailureStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
