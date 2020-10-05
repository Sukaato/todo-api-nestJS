import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../todos/schema/todos.schemas';
import { UsersService } from '../users/users.service';
import { CreateTodoDTO } from './dto/CreateTodo.dto';
import { UpdateTodoDTO } from './dto/UpdateTodo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoSchema: Model<Todo>,
                private readonly usersService: UsersService) {}

    async create(todo: CreateTodoDTO, user_id: string): Promise<Todo> {
        const todoSchema = new this.todoSchema({ ...todo });
        const user = await this.usersService.findOneById(user_id);
        user.todos = [ ...user.todos, todoSchema ];
        await user.save();
        return todoSchema;
    }

    async findAll(user_id: string): Promise<Todo[]> {
        const user = await this.usersService.findOneById(user_id);
        return user.todos;
    }

    async findOne(user_id: string, todo_id: string): Promise<Todo> {
        const todos = await this.findAll(user_id);
        return todos.find(todo => todo.id === todo_id);
    }

    async update(user_id: string, todo_id: string, todo: UpdateTodoDTO) {
        const user = await this.usersService.findOneById(user_id);
        user.todos.map(t => {
            if (t.id === todo_id) {
                return { ... todo }
            }
            return t;
        });
        await user.save();
        return todo;
    }

    async delete(user_id: string, todo_id: string) {
        const user = await this.usersService.findOneById(user_id);
        user.todos.filter(t => t.id !== todo_id);
        await user.save();
    }

}
