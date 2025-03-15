import { BadRequestException, Body, Controller, Inject, NotFoundException, Post } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { UserRepository } from "../user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";


export default function EncryptPassword(password: string): string {
	const hash = bcrypt.hashSync(password, 10);
	return hash;
}


@Controller("auth")
export class AuthController {
	constructor(
		@Inject(UserRepository) private readonly userRepository: UserRepository,
		@Inject(JwtService) private readonly jwtService: JwtService
	  ) {}

	@Post("signup")
	async signUp(@Body() body: CreateUserDto): Promise<string> {
		const finedUser = await this.userRepository.findByEmail(body.email);
		if (finedUser) {
			throw new BadRequestException("User already exists");
		}
		const hashedPassword = EncryptPassword(body.password);
		console.log(hashedPassword);
		body.password = hashedPassword;
		await this.userRepository.createUser(body);
		return "User created successfully";
	}

	@Post("login")
	async login(@Body() body: {email: string, password: string}): Promise<{accessToken: string}> {
		const finedUser = await this.userRepository.findByEmail(body.email);
		if (!finedUser) {
			throw new NotFoundException("User not found");
		}
		const isPasswordCorrect = await bcrypt.compare(body.password, finedUser.password);
		if (isPasswordCorrect) {
			const payload = {email: finedUser.email, id: finedUser.id};
			const accessToken = this.jwtService.sign(payload);
			return {accessToken};
		}
		throw new BadRequestException("Invalid password");
	}
}
