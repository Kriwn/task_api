import { IsEmail, isEmail, IsString, minLength } from "class-validator";

export class CreateUserDto {

	@IsString()
	fullName: string;

	@IsEmail({}, {
		message: "Not email froma"
	})
	email: string;

	@IsString()
	password: string;

}
