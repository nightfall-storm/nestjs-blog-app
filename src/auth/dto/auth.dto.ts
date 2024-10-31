import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user1@g.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @MinLength(3)
  password: string;
}
