import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({ type: CategoryResponseDto })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ type: [CategoryResponseDto] })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: CategoryResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ type: CategoryResponseDto })
  async updateOne(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(+id);
  }

  @Get('posts/:id')
  async getCategoryPosts(@Param('id') id: string) {
    return await this.categoryService.getCategoryPosts(+id);
  }
}
