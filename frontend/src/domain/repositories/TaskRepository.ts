import { Task } from '../entities/Task';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Omit<Task, 'id'>): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}
