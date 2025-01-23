export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewTask {
  title: string;
  description?: string;
  date: string;
  isImportant?: boolean;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  date?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
}
