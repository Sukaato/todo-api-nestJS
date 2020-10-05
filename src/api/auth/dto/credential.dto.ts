import { IsNotEmpty, IsString, Length } from "class-validator";

export class CredentialDTO {

    @IsString()
    @IsNotEmpty()
    @Length(6, 50)
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 50)
    readonly password: string;
}
