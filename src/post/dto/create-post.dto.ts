import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'The ID of the author', type: Number })
  @IsInt()
  authorId: number;
}
