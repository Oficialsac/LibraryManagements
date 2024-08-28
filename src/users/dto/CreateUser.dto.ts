import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
