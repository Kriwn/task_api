import { Body, Controller, Delete, ExecutionContext, Get, Inject, NotFoundException, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.model";
import { AuthGuard } from "../auth/auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
	user: { id: string; email: string };
  }

@ApiBearerAuth()
@Controller("tasks")
@UseGuards(AuthGuard)
export class TaskController {
	constructor(
		@Inject(TaskRepository) private readonly taskRepository: TaskRepository,
		@Inject(JwtService) private readonly jwtService: JwtService
	) {}


	@Get("getAll")
	async getAllTasks(): Promise<Task[]> {
		const tasks = await this.taskRepository.getAllTasks();
		if (!tasks)
		{
			throw new NotFoundException("Task not found");
		}
		return tasks;
	}

	@Get()
	async getTaskByuserId(@Req() request: AuthenticatedRequest): Promise<Task[]> {
		const userId = request.user.id;
		const tasks = await this.taskRepository.getTaskByUserId(userId);
		if (!tasks)
		{
			throw new NotFoundException("Task not found");
		}
		return tasks;
	}

	@Get(":id")
	async getTaskById(@Param("id") id: number): Promise<Task | null> {
		const task = await this.taskRepository.getTaskById(id);
		if (!task)
		{
			throw new NotFoundException("Task not found");
		}
		return task;
	}

	@Post()
	async createTask(@Body() body: CreateTaskDto, @Req() request: AuthenticatedRequest): Promise<string> {
	  const userId = request.user.id;
	  const tasks = await this.taskRepository.createTask(userId, body);
	  if (!tasks) {
		throw new NotFoundException('Task not created');
	  }

	  return 'Task created successfully';
	}


	@Patch(":id")
	async updateTask(@Param("id") id: number, @Body() body: UpdateTaskDto): Promise<Task | null> {
		const task = await this.taskRepository.updateTask(id, body);
		if (!task)
		{
			throw new NotFoundException("Task not found");
		}
		return task;
	}

	@Delete(":id")
	async deleteTask(@Param("id") id: number): Promise<string | null> {
		const task = await this.taskRepository.deleteTask(id);
		if (!task)
		{
			throw new NotFoundException("Task not found");
		}
		return "Task deleted successfully";
	}
}
