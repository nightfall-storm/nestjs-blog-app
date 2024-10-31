import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const post = await this.prisma.post.create({
      data: createPostDto,
    });
    return post as PostResponseDto;
  }

  async findAll(): Promise<PostResponseDto[]> {
    return await this.prisma.post.findMany({include: { author: {
        select: {
            id: true,
            username: true,
            email: true,
            profile_image: true, 
            // bio: true,           
            role: true,         
            // createdAt: true,    
            // updatedAt: true,    
        }
    }},});
  }

  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post as PostResponseDto;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    if (!post) throw new NotFoundException('Post not found');
    return post as PostResponseDto;
  }

  async delete(id: number): Promise<string> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    await this.prisma.post.delete({ where: { id } });
    return `Post with ID ${id} deleted successfully`;
  }
}
