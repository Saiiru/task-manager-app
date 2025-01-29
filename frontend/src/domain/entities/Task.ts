export interface Task {
  id: string;
  title: string;
  description?: string;
  userId: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewTask {
  title: string;
  description?: string;
  userId: string;
  isCompleted: boolean;
}
