export interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  isCompleted: boolean;
  isImportant: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class TaskEntity implements Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public userId: string,
    public isCompleted: boolean = false,
    public isImportant: boolean = false,
    public date: Date = new Date(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.title.trim()) {
      throw new Error('Task title is required');
    }
  }

  complete(): void {
    this.isCompleted = true;
    this.updatedAt = new Date();
  }

  toggleImportance(): void {
    this.isImportant = !this.isImportant;
    this.updatedAt = new Date();
  }
}
