import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator'
import { Roles } from '../../../enum'

export class CreateYDto{
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsPhoneNumber()
    phone!: string

    @IsStrongPassword()
    password!: string

    @IsEnum(Roles)
    role!: string;
}