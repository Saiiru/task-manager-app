package domain

import "time"

type Task struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	IsCompleted bool      `json:"is_completed"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	UserID      int       `json:"user_id"`
}

type TaskRepository interface {
	Create(task *Task) error
	FindByID(id int) (*Task, error)
	FindAll() ([]Task, error)
	Update(task *Task) error
	Delete(id int) error
}
