import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  password: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  profile_image?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
