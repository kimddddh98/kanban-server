import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // Entity 자동 로드
        synchronize: true, // 개발 환경에서는 true (테이블 자동 생성)
        logging: true, // SQL 쿼리 로그 출력,
        entities: [UsersModel],
      }),
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
