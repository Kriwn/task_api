import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.model";
import { Repository } from "typeorm";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TaskRepository {

	constructor(
		@InjectRepository(Task) private taskRepository: Repository<Task>,
	){}

	async getAllTasks(): Promise<Task[]> {
		return await this.taskRepository.find();
	}

	async getTaskById(id: number): Promise<Task | null> {
		return await this.taskRepository.findOne({where: {id}});
	}

	async getTaskByUserId(userId: string): Promise<Task[]> {
		return await this.taskRepository.find({where: {userId}});
	}

	async createTask(userId: string, data: CreateTaskDto): Promise<Task> {

		const task = this.taskRepository.create({
			...data,
			userId
		});
		await this.taskRepository.save(task);
		return task;
	}

	async updateTask(id: number, data: UpdateTaskDto): Promise<Task | null> {
		const task = await this.taskRepository.findOne({where: {id}});
		if (!task)
		{
			return null;
		}
		Object.assign(task, data);
		return await this.taskRepository.save(task);

	}

	async deleteTask(id: number): Promise<Task | null> {
		const task = await this.taskRepository.findOne({where: {id}});
		if (!task)
		{
			return null
		}
		await this.taskRepository.delete(id);
		return task;
	}
}
