import { IsString } from "class-validator";


export class CreateTaskDto {

	@IsString()
	title: string;

	@IsString()
	userId: string;

	@IsString()
	description: string;

	constructor(data: CreateTaskDto) {
		this.title = data.title;
		this.userId = data.userId;
		this.description = data.description;
	}
}
