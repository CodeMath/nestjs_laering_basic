import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsStrongPassword, minLength, IsStrongPasswordOptions, IsString } from "class-validator";


export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(16)
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minSymbols:1
    },{message: "비밀번호는 6자리 이상, 영문 대문자 1개 및 특수문자 1개를 포함하세요."})
    password: string;
}