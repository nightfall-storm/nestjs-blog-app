import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, PrismaModule, PostModule, CategoryModule],
  providers: [PrismaService],
  
})
export class AppModule {}
