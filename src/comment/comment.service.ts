import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import based on your structure
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }

  async findOne(id: number): Promise<Comment> {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCommentDto): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
