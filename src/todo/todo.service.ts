import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(userId: number, createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        userId,
      },
    });
  }

  async updateTodo(id: number, userId: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.updateMany({
      where: { id, userId },
      data: updateTodoDto,
    });
  }

  async deleteTodo(id: number, userId: number) {
    return this.prisma.todo.deleteMany({
      where: { id, userId },
    });
  }

  async getTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async getTodoById(id: number, userId: number) {
    return this.prisma.todo.findFirst({
      where: { id, userId },
    });
  }
}
