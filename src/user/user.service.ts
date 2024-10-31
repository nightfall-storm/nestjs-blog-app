import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper method to remove sensitive data before returning user data
  private toResponse(user): UserResponseDto {
    const { password, ...rest } = user;
    return rest as UserResponseDto;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPw = await argon.hash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPw,
        profile_image: createUserDto.profile_image,
        bio: createUserDto.bio,
        role: createUserDto.role,
      },
    });

    if (!user) throw new ForbiddenException('Could not create user');

    return this.toResponse(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();

    if (!users.length) throw new NotFoundException('No users found');

    return users.map(this.toResponse);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return this.toResponse(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) throw new NotFoundException('User not found');

    return this.toResponse(user);
  }

  async delete(id: number): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.delete({ where: { id } });
    return `User with ID ${id} deleted successfully`;
  }
}
