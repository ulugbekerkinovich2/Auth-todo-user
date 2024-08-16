import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Todo created.' })
  create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(req.user.id, createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Get all todos.' })
  findAll(@Request() req) {
    return this.todoService.getTodos(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get todo by id.' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.todoService.getTodoById(+id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Update todo.' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(+id, req.user.id, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete todo.' })
  remove(@Request() req, @Param('id') id: string) {
    return this.todoService.deleteTodo(+id, req.user.id);
  }
}
