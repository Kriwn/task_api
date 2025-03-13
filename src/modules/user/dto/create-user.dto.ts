import { IsEmail, isEmail, IsString, minLength } from "class-validator";

export class CreateUserDto {

	@IsString()
	fullName: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	constructor(data: CreateUserDto) {
		this.fullName = data.fullName;
		this.email = data.email;
		this.password = data.password;
	}
}
