import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    name: string;
}