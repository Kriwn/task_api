import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { TaskController } from "./task.controller";
import { JwtModule } from "@nestjs/jwt";
import { Task } from "./task.model";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1h" },
      }),
    }),
    TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskRepository],
})

export class TaskModule {}
