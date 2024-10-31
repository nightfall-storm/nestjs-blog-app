import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtAuthGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
