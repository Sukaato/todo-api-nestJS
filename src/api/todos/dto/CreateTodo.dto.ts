import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTodoDTO {

    @IsString()
    @IsNotEmpty()
    @Length(10, 50)
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @Length(20, 200)
    readonly description: string;
}