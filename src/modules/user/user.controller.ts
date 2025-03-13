import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./user.model";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {
	constructor(
		@Inject(UserRepository) private readonly userRepository: UserRepository,
	) {}

	@Get()
	async getAllUsers(): Promise<User[]> {
		const users = await this.userRepository.getAllUsers();
		if (!users)
		{
			throw new NotFoundException('No users found');
		}
		return users
	}

	@Get(':id')
	async getUserById(@Param("id") id: string): Promise<User | null> {
		const user = await this.userRepository.getUserById(id);
		if (!user)
		{
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@Patch(':id')
	async updateUser(@Param("id")  id: string, @Body() data: UpdateUserDto): Promise<User | null> {
		const updateData = new UpdateUserDto(data);
		const user = await this.userRepository.updateUser(id, data);
		if (!user)
		{
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@Delete(':id')
	async deleteUser(@Param("id") id: string): Promise<User | null> {
		const user = await this.userRepository.deleteUser(id);
		if (!user)
		{
			throw new NotFoundException('User not found');
		}
		return user;
	}
}
