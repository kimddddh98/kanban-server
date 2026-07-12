import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModel } from '../users/entities/users.entity';
import { BatchService } from './batch.service';
import { BatchJob } from './entities/batch-job.entity';

describe('BatchService', () => {
  let service: BatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchService,
        {
          provide: getRepositoryToken(BatchJob),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UsersModel),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BatchService>(BatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
