import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.model";
import { AuthGuard } from "../auth/auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
@UseGuards(AuthGuard)
export class TaskController {
	constructor(
		@Inject(TaskRepository) private readonly taskRepository: TaskRepository,
	) {}


	@Get()
	async getAllTasks(): Promise<Task[]> {
		const tasks = await this.taskRepository.getAllTasks();
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

	@Post('tasks')
	async createTask(@Body() body: CreateTaskDto): Promise<string> {
		await this.taskRepository.createTask(body);
		return "Task created successfully";
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
