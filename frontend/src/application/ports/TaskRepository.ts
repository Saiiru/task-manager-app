export interface TaskRepository {
  getTaskById(id: string): Promise<Task | null>;
  getTasks(name?: string, page?: number, limit?: number): Promise<Task[]>;
  createTask(input: NewTask): Promise<Task>;
  updateTask(input: UpdateTaskInput): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
}