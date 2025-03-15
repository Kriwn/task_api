import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  fullName: string;

  @IsEmail({}, {
    message: "Not email fromat"
  })
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

}
