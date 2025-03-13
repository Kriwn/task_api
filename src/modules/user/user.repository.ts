import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {

	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>
	){}

	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } });
	  }

	async getUserById(id: string): Promise<User | null> {
		return await this.userRepository.findOne({where: {id}});
	}

	async createUser(data: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(data);
		await this.userRepository.save(user);
		return user;
	}

	async updateUser(id: string, data:UpdateUserDto): Promise<User | null> {
		const user = await this.userRepository.findOne({where: {id}});
		if (!user)
		{
			return null;
		}

		Object.assign(user, data);
		return await this.userRepository.save(user);
	}

	async deleteUser(id: string): Promise<User | null> {
		const user = await this.userRepository.findOne({where: {id}});
		if (!user)
		{
			return null
		}
		await this.userRepository.delete(id);
		return user;
	}
}
