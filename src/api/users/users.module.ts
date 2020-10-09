import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/common/utils/utils.module';
import { IpEntity } from '../../entities/ip.entity';
import { RoleEntity } from '../../entities/role.entity';
import { TodoEntity } from '../../entities/todo.entity';
import { UserEntity } from '../../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserEntity, IpEntity, RoleEntity, TodoEntity]),
    UtilsModule
  ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports: [ UsersService, TypeOrmModule ]
})
export class UsersModule {}
