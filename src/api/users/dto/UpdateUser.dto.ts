import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray } from "class-validator";
import { UpdateUserCredentialDTO } from "./UpdateUserCredencial.dto";

export class UpdateUserDTO extends UpdateUserCredentialDTO {

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(0)
    @ArrayMaxSize(5)
    readonly ips: string[];

    @IsArray()
    @ArrayNotEmpty()
    readonly roles: string[];

    @IsArray()
    @ArrayMinSize(0)
    @ArrayMaxSize(10)
    readonly todo_ids: number[];
}