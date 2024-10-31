// user/dto/user-response.dto.ts
import { Role } from '@prisma/client';

export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  profile_image?: string;
  bio?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
