import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDTO } from "./CreateUser.dto";

export class UpdateUserCredentialDTO extends CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    readonly id: string;
}