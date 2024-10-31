import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'The ID of the post the comment belongs to' })
  @IsInt()
  postId: number;

  @ApiProperty({ description: 'The ID of the user who made the comment' })
  @IsInt()
  userId: number; 
}
