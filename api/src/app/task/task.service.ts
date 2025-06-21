import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepo.create({
      ...createTaskDto,
      completed: false,
    });
    return this.taskRepo.save(newTask);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepo.findOneByOrFail({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepo.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
