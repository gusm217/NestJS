import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Equals, IsNotEmpty, IsString } from 'class-validator';
import { filter } from 'rxjs';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task ${id} was not found.`);
    }

    return found;
  }

  createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // deleteTask(id: string): Task[] {
  //   const findTask = this.getTaskById(id);
  //   return this.tasks.filter((task) => task.id !== findTask.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // getAllTasksWithFilters(filtersDto: GetTasksFilterDto): Task[] {
  //   let tasks = this.getAllTasks();

  //   if (filtersDto.status) {
  //     tasks = this.tasks.filter((task) => task.status === filtersDto.status);
  //   }

  //   if (filtersDto.search) {
  //     tasks = this.tasks.filter(
  //       (task) =>
  //         task.title.includes(filtersDto.search) ||
  //         task.description.includes(filtersDto.search),
  //     );
  //   }

  //   return tasks;
  // }
}
