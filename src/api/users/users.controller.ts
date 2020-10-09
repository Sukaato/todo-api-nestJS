import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateUserCredentialDTO } from './dto/UpdateUserCredencial.dto';
import { UsersService } from './users.service';

@Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.usersService.findOneById(id);
    }

    @Patch(':id/credential')
    async updateCredential(@Body() user: UpdateUserCredentialDTO, @Param('id') id: number) {
        if (!user) {
            throw new BadRequestException("User can't be null");
        }
        if (user.id !== id) {
            throw new BadRequestException('User id and parameter id must not be different');
        }

        return await this.usersService.updateCredential(user, id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.usersService.delete(id);
    }


    /* Todos */
/* 
    @Roles('user')
    @Post(':id/todos')
    async createTodo(@Body() todo: CreateTodoDTO, @Param('id') id: string) {
        return await this.todosService.create(todo, id);
    }

    @Get(':id/todos')
    async findAllTodos(@Param('id') id: string) {
        return await this.todosService.findAll(id);
    }

    @Get(':id/todos/:todo_id')
    async findOneTodo(@Param('id') user_id: string, @Param('todo_id') todo_id: string) {
        const todo = await this.todosService.findOne(user_id, todo_id);
        if (!todo) {
            throw new NotFoundException(`no Todo found with id: ${todo_id}`);
        }
        return todo;
    }

    @Put(':id/todos/:todo_id')
    async updateTodo(@Body() todo: UpdateTodoDTO, @Param('id') user_id: string, @Param('todo_id') todo_id: string) {
        if (!todo) {
            throw new BadRequestException("Todo can't be null");
        }
        if (todo.id !== todo_id) {
            throw new BadRequestException('Todo id and parameter id must not be different');
        }
        return await this.todosService.update(user_id, todo_id, todo);
    }

    @Delete(':id/todos/:todo_id')
    async deleteTodo(@Param('id') user_id: string, @Param('todo_id') todo_id: string) {
        return await this.todosService.delete(user_id, todo_id);
    }
 */
}
