import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsEnum(['CUSTOMER', 'ARTIST', 'ADMIN'], {
    message: 'Role must be either CUSTOMER, ARTIST, or ADMIN',
  })
  @ApiProperty()
  role: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phoneNumber?: string;
}
