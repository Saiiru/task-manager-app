package application

import (
	"task-manager-app/backend/internal/tasks/domain"
)

type TaskService struct {
	repo domain.TaskRepository
}

// NewTaskService creates a new TaskService.
func NewTaskService(repo domain.TaskRepository) *TaskService {
	return &TaskService{repo: repo}
}

// CreateTask creates a new task.
func (s *TaskService) CreateTask(name string) (domain.Task, error) {
	task := domain.NewTask(name)
	err := s.repo.Save(&task)
	if err != nil {
		return domain.Task{}, err
	}
	return task, nil
}

// GetAllTasks returns all tasks.
func (s *TaskService) GetAllTasks() ([]domain.Task, error) {
	return s.repo.FindAll()
}

// CompleteTask marks a task as completed.
func (s *TaskService) CompleteTask(id int) (domain.Task, error) {
	task, err := s.repo.FindByID(id)
	if err != nil {
		return domain.Task{}, err
	}
	task.Complete()
	err = s.repo.Save(&task)
	if err != nil {
		return domain.Task{}, err
	}
	return task, nil
}

// UpdateTaskName updates the name of a task.
func (s *TaskService) UpdateTaskName(id int, newName string) (domain.Task, error) {
	task, err := s.repo.FindByID(id)
	if err != nil {
		return domain.Task{}, err
	}
	task.UpdateName(newName)
	err = s.repo.Save(&task)
	if err != nil {
		return domain.Task{}, err
	}
	return task, nil
}
