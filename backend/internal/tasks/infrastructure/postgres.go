package infrastructure

import (
	"task-manager-app/backend/internal/tasks/domain"

	"github.com/jinzhu/gorm"
)

type TaskRepository struct {
	db *gorm.DB
}

// NewTaskRepository creates a new task repository.
func NewTaskRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db: db}
}

// Save saves or updates a task in the database.
func (r *TaskRepository) Save(task *domain.Task) error {
	if task.ID == 0 {
		return r.db.Create(task).Error
	}
	return r.db.Save(task).Error
}

// FindAll returns all tasks.
func (r *TaskRepository) FindAll() ([]domain.Task, error) {
	var tasks []domain.Task
	err := r.db.Find(&tasks).Error
	return tasks, err
}

// FindByID finds a task by ID.
func (r *TaskRepository) FindByID(id int) (domain.Task, error) {
	var task domain.Task
	err := r.db.First(&task, id).Error
	return task, err
}
