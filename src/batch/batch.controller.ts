import {
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post('users/seed')
  seedUsers(
    @Query('count', new DefaultValuePipe(1000), ParseIntPipe) count: number,
  ) {
    return this.batchService.seedUsers(count);
  }
}
