import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ description: 'The content of the comment', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
