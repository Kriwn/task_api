import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { Task } from "../task/task.model";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	fullName: string;

	@Column({unique: true})
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Task, (task) => task.user)
	tasks: Task[];
}
