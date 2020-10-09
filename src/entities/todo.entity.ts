import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { TodoStatus } from './todoStatus.enum';
import { UserEntity } from './user.entity';

@Entity('todo')
export class TodoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    title: string;

    @Column({ nullable: false})
    description: string;

    @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.TODO})
    status: TodoStatus;

    @ManyToOne(() => UserEntity, user => user.todos)
    user: UserEntity
}