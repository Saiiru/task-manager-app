package domain

type Task struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Status string `json:"status"`
}

type TaskRepository interface {
	Create(task *Task) error
	FindByID(id int) (*Task, error)
	FindAll() ([]Task, error)
	Update(task *Task) error
	Delete(id int) error
}
