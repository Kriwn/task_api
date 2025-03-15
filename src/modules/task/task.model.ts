import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.model";

export enum TaskStatus {
    TO_DO,
    IN_PROGRESS,
    DONE,
}

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
		enum: TaskStatus,
		default: TaskStatus.TO_DO,
	})

	@CreateDateColumn()
	creationDate: Date;

	@UpdateDateColumn()
	updateDate: Date;

	@Column()
	userId: string;

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;
}
