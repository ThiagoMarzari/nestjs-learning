import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/dto/interceptors/logging.interceptor';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @UseInterceptors(new LoggerInterceptor())
  findAllTasks(@Query() paginationDto: PaginationDto) {
    return this.taskService.findAll(paginationDto);
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
