import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @ApiResponse({ type: CreatePostDto })
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Get()
  @ApiResponse({ type: [PostResponseDto] })
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Post ID' })
  @ApiResponse({ type: PostResponseDto })
  async findOne(@Param() params) {
    return await this.postService.findOne(+params.id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'Post ID' })
  @ApiResponse({ description: 'Post deleted successfully' })
  async delete(@Param('id') id: string) {
    return await this.postService.delete(+id);
  }
}
