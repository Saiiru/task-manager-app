package application_test

import (
	"errors"
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/domain"
	"testing"
	"time"

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

func (m *MockTaskRepository) FindAll() ([]domain.Task, error) {
	args := m.Called()
	return args.Get(0).([]domain.Task), args.Error(1)
}

func (m *MockTaskRepository) Update(task *domain.Task) error {
	args := m.Called(task)
	return args.Error(0)
}

func (m *MockTaskRepository) Delete(id int) error {
	args := m.Called(id)
	return args.Error(0)
}

func TestCreateTask(t *testing.T) {
	repo := new(MockTaskRepository)
	service := application.NewTaskService(repo)

	task := &domain.Task{Title: "Test Task", IsCompleted: false, CreatedAt: time.Now(), UpdatedAt: time.Now(), UserID: 1}
	repo.On("Create", task).Return(nil)

	err := service.CreateTask(task)
	assert.NoError(t, err)
	repo.AssertExpectations(t)
}

func TestCreateTaskWithEmptyTitle(t *testing.T) {
	repo := new(MockTaskRepository)
	service := application.NewTaskService(repo)

	task := &domain.Task{Title: "", IsCompleted: false, CreatedAt: time.Now(), UpdatedAt: time.Now(), UserID: 1}
	repo.On("Create", task).Return(errors.New("title cannot be empty"))

	err := service.CreateTask(task)
	assert.Error(t, err)
	assert.Equal(t, "title cannot be empty", err.Error())
	repo.AssertExpectations(t)
}
