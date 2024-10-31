import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { PostResponseDto } from 'src/post/dto/post-response.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });

    if (!category) throw new ForbiddenException('Could not create category');

    return category as CategoryResponseDto;
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.prisma.category.findMany();

    if (!categories.length) throw new NotFoundException('No categories found');

    return categories.map((category) => category as CategoryResponseDto);
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) throw new NotFoundException('Category not found');

    return category as CategoryResponseDto;
  }

  async update(id: number, updateCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    if (!category) throw new NotFoundException('Category not found');

    return category as CategoryResponseDto;
  }

  async delete(id: number): Promise<string> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) throw new NotFoundException('Category not found');

    await this.prisma.category.delete({ where: { id } });
    return `Category with ID ${id} deleted successfully`;
  }

  async getCategoryPosts(
    id: number,
  ): Promise<CategoryResponseDto & { posts: PostResponseDto[] }> {
    const category = await this.findOne(id);
    const posts = await this.prisma.post.findMany({
      where: { categoryId: id },
    });

    return { ...category, posts }; // Combine user data with their posts
  }
}
