import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoError } from 'src/common/mongoError.dto';
import { UtilsService } from 'src/common/utils/utils.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserCredentialDTO } from './dto/UpdateUserCredencial.dto';
import { User } from './schema/user.schemas';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userSchema: Model<User>,
                private readonly utilsService: UtilsService) {}

    async create(user: CreateUserDTO, ip: string): Promise<User> {
        return this.userSchema.create({ ...user, ips: [ip], roles: ['user'], todos: [] })
            .then(async user => await user.save())
            .catch(err => {
                throw new BadRequestException("This user already exist !");
            });
    }

    async findAll(): Promise<User[]> {
        return this.userSchema.find()
            .select('-__v')
            .exec();
    }

    /** It will be returns a user without todos. */
    async findOneByUsername(username: string): Promise<User> {
        return this.userSchema.findOne({ username })
            .select(['-__v', '-todos'])
            .exec();
    }

    async findOneById(id: string): Promise<User> {
        const user = await this.userSchema.findOne({ _id: id })
            .select('-__v')
            .exec();
        if (!user) {
            throw new NotFoundException('User with this id does not exist');
        }
        return user;
    }

    async updateCredential(user: UpdateUserCredentialDTO, id: string): Promise<User | MongoError> {
        const { username, password } = user;
        return this.userSchema.findOneAndUpdate({ _id: id }, { username, password })
            .then(async updatedUser => await updatedUser.save())
            .catch(err => this.utilsService.handleError(err));
    }

    async delete(id: string): Promise<User> {
        return this.userSchema.findOneAndDelete({ _id: id })
            .select('-__v')
            .exec();
    }

}
