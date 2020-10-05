import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/common/utils/utils.module';
import { Todo, TodoSchemas } from '../todos/schema/todos.schemas';
import { TodosService } from '../todos/todos.service';
import { User, UserSchemas } from './schema/user.schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ 
    MongooseModule.forFeature([ {name: User.name, schema: UserSchemas}, {name: Todo.name, schema: TodoSchemas} ]),
    UtilsModule
  ],
  controllers: [ UsersController ],
  providers: [ UsersService, TodosService ],
  exports: [ UsersService ]
})
export class UsersModule {}
