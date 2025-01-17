package application

import "task-manager-app/backend/internal/domain"

type TaskService struct {
	repository domain.TaskRepository
}

func NewTaskService(repo domain.TaskRepository) *TaskService {
	return &TaskService{repository: repo}
}

func (s *TaskService) CreateTask(task *domain.Task) error {
	return s.repository.Create(task)
}

func (s *TaskService) GetAllTasks() ([]domain.Task, error) {
	return s.repository.FindAll()
}
