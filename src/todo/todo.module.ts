import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaModule } from '../prisma/prisma.module'; // PrismaModule'ni import qilish

@Module({
  imports: [PrismaModule], // Bu qator PrismaService'ni TodoModule'ga qo'shadi
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
