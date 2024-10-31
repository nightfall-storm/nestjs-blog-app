import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PostResponseDto } from 'src/post/dto/post-response.dto';

@ApiTags('Users')
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiResponse({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ type: [UserResponseDto] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ type: UserResponseDto })
  async findOne(@Param() params) {
    return await this.userService.findOne(+params.id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ description: 'User deleted successfully' })
  async delete(@Param('id') id: string) {
    return await this.userService.delete(+id);
  }

  @Get(':id/profile')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.getUserProfile(+id);
  }
}
