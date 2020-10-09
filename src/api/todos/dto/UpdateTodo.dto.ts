import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CreateTodoDTO } from "./CreateTodo.dto";

export class UpdateTodoDTO extends CreateTodoDTO {

    @IsString()
    @IsNotEmpty()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @IsIn(['to do', 'in progress', 'done'])
    readonly status: 'to do' | 'in progress' | 'done';
}