import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { Comment } from '@prisma/client';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The comment has been created.' })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of comments.' })
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'The found comment.' })
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'The updated comment.' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 204, description: 'The comment has been deleted.' })
  async delete(@Param('id') id: string): Promise<Comment> {
    return this.commentService.delete(+id);
  }
}
