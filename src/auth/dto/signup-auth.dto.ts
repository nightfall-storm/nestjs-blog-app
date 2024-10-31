import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupAuthDto {
  @ApiProperty({ example: 'night' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'user1@g.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @MinLength(3)
  password: string;
}
