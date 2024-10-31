import { IsString, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class PostResponseDto {
  @ApiProperty({ description: 'The ID of the post' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'The ID of the author', type: Number })
  @IsInt()
  authorId: number;

  @ApiProperty({ description: 'The date the post was created', type: String })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The date the post was last updated',
    type: String,
  })
  @IsDate()
  updatedAt: Date;
}
