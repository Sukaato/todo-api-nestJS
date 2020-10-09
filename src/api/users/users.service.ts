import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'src/common/utils/utils.service';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserCredentialDTO } from './dto/UpdateUserCredencial.dto';
import { IpEntity } from '../../entities/ip.entity';
import { RoleEntity } from '../../entities/role.entity';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly utilsService: UtilsService) {}

    async create(user: CreateUserDTO, ip: string): Promise<UserEntity> {
        const ipEntity = IpEntity.create();
        ipEntity.ip = ip;
        const user_ip = await ipEntity.save()

        let user_role: RoleEntity;
        try {
            const roleEntity = RoleEntity.create();
            roleEntity.name = 'user';
            user_role = await roleEntity.save();
        } catch (error) {
            Logger.log(error);
        }

        const { username, password } = user;
        const userEntity = UserEntity.create();
        userEntity.username = username;
        userEntity.password = password;
        userEntity.ips = [ user_ip ];
        userEntity.roles = [ user_role ];

        return UserEntity.save(userEntity)
            .then(userEntity => userEntity)
            .catch(err => this.utilsService.handleError(err));
    }

    async findAll(): Promise<UserEntity[]> {
        return await UserEntity.find({ relations: ['ips', 'roles', 'todos'] });
    }

    /** It will be returns a user without todos. */
    async findOneByUsername(username: string): Promise<UserEntity> {
        return UserEntity.findOne({ username }, { relations: ['ips', 'roles'] })
            .then(user => {
                const { id, username, password, ips, roles } = this.check(user);
                return { id, username, password, ips, roles };
            })
            .catch(err => this.utilsService.handleError(err));
    }

    async findOneById(id: number): Promise<UserEntity> {
        return UserEntity.findOne(id, { relations: ['ips', 'roles', 'todos'] })
            .then(user => this.check(user))
            .catch(err => this.utilsService.handleError(err));
    }

    async updateCredential(user: UpdateUserCredentialDTO, id: number): Promise<UserEntity> {
        const { username, password } = user;
        return UserEntity.update(id, { username, password })
            .then(result => result)
            .catch(err => this.utilsService.handleError(err));
    }

    async delete(id: number) {
        return UserEntity.delete(id)
            .then(result => result)
            .catch(err => this.utilsService.handleError(err));
    }

    private check(user: UserEntity) {
        Logger.log({user})
        if (!user) {
            throw new NotFoundException('User with this id does not exist');
        }
        return user;
    }

}
