import { Logger } from "@nestjs/common";
import { IsNotEmpty, IsString, Length, ValidateBy, ValidationArguments } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @Length(6, 50)
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    @ValidateBy({
        validator: {validate: (value, args) => validatePassword(value, args) }, 
        name: 'password'
    })
    readonly password: string;
}


const validatePassword = (password: string, args: ValidationArguments): boolean => {
    Logger.log({ password, args });
    return true;
}
