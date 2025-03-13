import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  constructor(data: UpdateUserDto) {
    this.fullName = data.fullName;
    this.email = data.email;
    this.password = data.password;
  }
}
