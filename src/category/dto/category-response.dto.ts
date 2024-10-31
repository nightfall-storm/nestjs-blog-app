import { IsInt, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ description: 'The ID of the category' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The date the category was created' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'The date the category was last updated' })
  @IsDate()
  updatedAt: Date;
}
