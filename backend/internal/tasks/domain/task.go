package domain

import (
	"time"
)

type Task struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// NewTask creates a new task with basic data.
func NewTask(name string) Task {
	return Task{
		Name:      name,
		Completed: false,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

// Complete marks a task as completed.
func (t *Task) Complete() {
	t.Completed = true
	t.UpdatedAt = time.Now()
}

// UpdateName updates the name of the task.
func (t *Task) UpdateName(newName string) {
	t.Name = newName
	t.UpdatedAt = time.Now()
}
