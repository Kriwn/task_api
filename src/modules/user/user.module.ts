import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { User } from "./user.model";


@Module({
	imports: [TypeOrmModule.forFeature([User])],
  	controllers: [UserController],
  	providers: [UserRepository],
})


export class UserModule {}
