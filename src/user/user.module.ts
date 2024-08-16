import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // PrismaModule'ni import qilish

@Module({
  imports: [PrismaModule], // PrismaModule import qilingan
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // UserService'ni eksport qilish
})
export class UserModule {}
