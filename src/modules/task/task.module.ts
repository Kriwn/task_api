import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { TaskController } from "./task.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TaskController],
})

export class TaskModule {}
