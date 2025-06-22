import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@secure-task-manager/auth/role.guard'; 
import { AuthModule } from '@secure-task-manager/auth';
import { User } from '@secure-task-manager/auth/entities/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Task, User],
      synchronize: true,
    }),
    TaskModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}