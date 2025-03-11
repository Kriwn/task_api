import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './modules/task/task.model';
import { User } from './modules/user/user.model';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Task],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
  ]
})
export class AppModule {}
