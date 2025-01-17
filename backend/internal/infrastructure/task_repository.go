package infrastructure

import (
	"task-manager-app/backend/internal/domain"

	"gorm.io/gorm"
)

type TaskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db: db}
}

func (r *TaskRepository) Create(task *domain.Task) error {
	return r.db.Create(task).Error
}

func (r *TaskRepository) FindByID(id int) (*domain.Task, error) {
	var task domain.Task
	if err := r.db.First(&task, id).Error; err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *TaskRepository) FindAll() ([]domain.Task, error) {
	var tasks []domain.Task
	if err := r.db.Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *TaskRepository) Update(task *domain.Task) error {
	return r.db.Save(task).Error
}

func (r *TaskRepository) Delete(id int) error {
	return r.db.Delete(&domain.Task{}, id).Error
}
