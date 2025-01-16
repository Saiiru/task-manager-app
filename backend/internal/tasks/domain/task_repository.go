package domain

type TaskRepository interface {
	Save(task *Task) error
	FindAll() ([]Task, error)
	FindByID(id int) (Task, error)
}
