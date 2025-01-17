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

func (s *TaskService) GetTaskByID(id int) (*domain.Task, error) {
	return s.repository.FindByID(id)
}

func (s *TaskService) UpdateTask(task *domain.Task) error {
	return s.repository.Update(task)
}

func (s *TaskService) DeleteTask(id int) error {
	return s.repository.Delete(id)
}
