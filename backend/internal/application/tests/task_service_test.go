package application_test

import (
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/domain"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockTaskRepository struct {
	mock.Mock
}

func (m *MockTaskRepository) Create(task *domain.Task) error {
	args := m.Called(task)
	return args.Error(0)
}

func (m *MockTaskRepository) FindByID(id int) (*domain.Task, error) {
	args := m.Called(id)
	if args.Get(0) != nil {
		return args.Get(0).(*domain.Task), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *MockTaskRepository) FindAll(filter domain.TaskFilter) (*domain.TaskConnection, error) {
	args := m.Called(filter)
	return args.Get(0).(*domain.TaskConnection), args.Error(1)
}

func (m *MockTaskRepository) Update(task *domain.Task) error {
	args := m.Called(task)
	return args.Error(0)
}

func (m *MockTaskRepository) Delete(id int) error {
	args := m.Called(id)
	return args.Error(0)
}

func (m *MockTaskRepository) FindByUserID(userID int) ([]domain.Task, error) {
	args := m.Called(userID)
	return args.Get(0).([]domain.Task), args.Error(1)
}

func TestCreateTask(t *testing.T) {
	repo := new(MockTaskRepository)
	service := application.NewTaskService(repo)

	task := &domain.Task{
		Title:  "Test Task",
		UserID: 1,
	}
	repo.On("Create", task).Return(nil)

	err := service.CreateTask(task)
	assert.NoError(t, err)
	repo.AssertExpectations(t)
}
