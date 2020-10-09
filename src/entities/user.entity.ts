import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IpEntity } from './ip.entity';
import { RoleEntity } from './role.entity';
import { TodoEntity } from './todo.entity';

@Entity('user')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    username: string;

    @Column({ nullable: false})
    password: string;

    @OneToMany(() => IpEntity, ip => ip.user)
    ips: IpEntity[];

    @ManyToMany(() => RoleEntity)
    @JoinTable({ name: 'user_roles' })
    roles: RoleEntity[];

    @OneToMany(() => TodoEntity, todo => todo.user)
    todos: TodoEntity[];

}