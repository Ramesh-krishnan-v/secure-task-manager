import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity'; // ✅ Import entity

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // ✅ Register entity here
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}