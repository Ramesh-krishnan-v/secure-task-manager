import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

// RBAC imports
import { Roles } from '@secure-task-manager/auth/roles.decorator';
import { Role } from '@secure-task-manager/auth/role.enum';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Post()
  @Roles(Role.Owner, Role.Admin)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Roles(Role.Owner, Role.Admin, Role.Viewer)
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @Roles(Role.Owner, Role.Admin, Role.Viewer)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Owner, Role.Admin)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}