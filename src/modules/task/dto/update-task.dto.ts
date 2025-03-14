import { IsOptional, IsString } from "class-validator";


export class UpdateTaskDto {

	@IsString()
	@IsOptional()
	title: string;

	@IsString()
	@IsOptional()
	userId: string;

	@IsString()
	@IsOptional()
	description: string;
}
