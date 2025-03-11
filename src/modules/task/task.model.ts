import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class Task {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({
		type: "enum",
		enum: ["to_do", "in_progress", "done"],
		default: "to_do"
	})

	@Column()
	creationDate: Date;

	@Column()
	updateDate: Date;

	@Column()
	userId: number;

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;
}
