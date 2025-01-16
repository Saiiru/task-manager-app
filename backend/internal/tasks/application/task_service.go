package application

import (
	"task-manager-app/backend/internal/tasks/domain"
	"task-manager-app/backend/internal/tasks/infrastructure"
)

type TaskService struct {
	repo *infrastructure.TaskRepository // Torna o repositório um ponteiro
}

// NewTaskService creates a new TaskService.
func NewTaskService(repo *infrastructure.TaskRepository) *TaskService { // Alteração para ponteiro
	return &TaskService{repo: repo}
}

// CreateTask creates a new task.
func (s *TaskService) CreateTask(name string) (domain.Task, error) {
	task := domain.NewTask(name)
	err := s.repo.Save(&task) // Passa ponteiro de task para o repositório
	if err != nil {
		return domain.Task{}, err
	}
	return task, nil
}

// GetAllTasks returns all tasks.
func (s *TaskService) GetAllTasks() ([]domain.Task, error) {
	return s.repo.FindAll() // O repositório deve lidar com ponteiros aqui também
}

// CompleteTask marks a task as completed.
func (s *TaskService) CompleteTask(id int) (domain.Task, error) {
	task, err := s.repo.FindByID(id)
	if err != nil {
		return domain.Task{}, err
	}
	task.Complete()          // Altera o status da task
	err = s.repo.Save(&task) // Passa ponteiro de task
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
	task.UpdateName(newName) // Atualiza o nome da task
	err = s.repo.Save(&task) // Passa ponteiro de task
	if err != nil {
		return domain.Task{}, err
	}
	return task, nil
}
