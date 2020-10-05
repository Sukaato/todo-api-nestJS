import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/api/users/users.service';
import { CreateUserDTO } from '../users/dto/CreateUser.dto';
import { User } from '../users/schema/user.schemas';
import { CredentialDTO } from './dto/credential.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) {}

    async register(credential: CredentialDTO, ip: string) {
        const hashedPswd = await hash(credential.password, 10);
        const user: CreateUserDTO = { username: credential.username, password: hashedPswd};

        return await this.usersService.create(user, ip);
    }

    async connect(credential: CredentialDTO) {
        const user = await this.usersService.findOneByUsername(credential.username);
        if (!user) {
            throw new NotFoundException('Wrong credentials provided');
        }

        const passwordMatch = await compare(credential.password, user.password);
        if (!passwordMatch) {
            throw new NotFoundException('Wrong credentials provided');
        }

        const { id, username, ips, roles } = user;
        return { id, username, ips, roles };
    }

    async disconnect() {}

    public generateJwtToken(user: User) {
        Logger.log(user);
        const payload = { ...user };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>('JWT_EXPIRATION_TIME')}`;
    }

}
