import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('ip')
export class IpEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    ip: string;

    @ManyToOne(() => UserEntity, user => user.ips)
    user: UserEntity
}