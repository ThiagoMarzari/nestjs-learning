import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return allTasks;
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (task) return task;

    throw new HttpException('Essa tarefa não existe.', HttpStatus.NOT_FOUND);
  }

  async create(body: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        completed: false,
      },
    });

    return newTask;
  }

  async update(id: string, body: UpdateTaskDto) {
    const taskf = await this.prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!taskf) {
      throw new HttpException('Não achou uma tarefa', HttpStatus.NOT_FOUND);
    }

    const task = await this.prisma.task.update({
      where: {
        id: Number(id),
      },
      data: body,
    });

    if (task) return task;
  }

  async delete(id: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!task) {
        throw new HttpException('Não achou uma tarefa', HttpStatus.NOT_FOUND);
      }

      const deletedTask = await this.prisma.task.delete({
        where: {
          id: Number(id),
        },
      });

      return deletedTask;
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar tarefa' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
