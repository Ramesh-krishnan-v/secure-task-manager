import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  private getRole(req: Request): string {
    return req.headers['x-user-role']?.toString() || 'Viewer';
  }

  @Post()
  async create(@Body() dto: CreateTaskDto, @Req() req: Request) {
    const role = this.getRole(req);
    if (role !== 'Admin' && role !== 'Owner') {
      throw new ForbiddenException('Access denied');
    }
    return this.taskService.create(dto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const role = this.getRole(req);
    if (!['Admin', 'Owner', 'Viewer'].includes(role)) {
      throw new ForbiddenException('Access denied');
    }
    return this.taskService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: Request) {
    const role = this.getRole(req);
    if (role !== 'Admin' && role !== 'Owner') {
      throw new ForbiddenException('Access denied');
    }
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const role = this.getRole(req);
    if (role !== 'Admin' && role !== 'Owner') {
      throw new ForbiddenException('Access denied');
    }
    return this.taskService.remove(id);
  }
}
