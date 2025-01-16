package application

import (
	"task-manager-app/backend/internal/tasks/domain"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// MockTaskRepository is a mock implementation of the TaskRepository interface
type MockTaskRepository struct {
	mock.Mock
}

func (m *MockTaskRepository) Save(task *domain.Task) error {
	args := m.Called(task)
	return args.Error(0)
}

func (m *MockTaskRepository) FindAll() ([]domain.Task, error) {
	args := m.Called()
	return args.Get(0).([]domain.Task), args.Error(1)
}

func (m *MockTaskRepository) FindByID(id int) (domain.Task, error) {
	args := m.Called(id)
	return args.Get(0).(domain.Task), args.Error(1)
}

// TaskMatcher is a custom matcher for comparing tasks ignoring timestamps
type TaskMatcher struct {
	expected *domain.Task
}

func (m TaskMatcher) Matches(x interface{}) bool {
	task, ok := x.(*domain.Task)
	if !ok {
		return false
	}
	return task.ID == m.expected.ID && task.Name == m.expected.Name && task.Completed == m.expected.Completed
}

func (m TaskMatcher) String() string {
	return "matches task ignoring timestamps"
}

func TestCreateTask(t *testing.T) {
	mockRepo := new(MockTaskRepository)
	taskService := NewTaskService(mockRepo)

	task := domain.NewTask("Test Task")
	mockRepo.On("Save", mock.MatchedBy(TaskMatcher{expected: &task}.Matches)).Return(nil)

	createdTask, err := taskService.CreateTask("Test Task")

	assert.NoError(t, err)
	assert.Equal(t, "Test Task", createdTask.Name)
	mockRepo.AssertExpectations(t)
}

func TestGetAllTasks(t *testing.T) {
	mockRepo := new(MockTaskRepository)
	taskService := NewTaskService(mockRepo)

	tasks := []domain.Task{
		domain.NewTask("Task 1"),
		domain.NewTask("Task 2"),
	}
	mockRepo.On("FindAll").Return(tasks, nil)

	result, err := taskService.GetAllTasks()

	assert.NoError(t, err)
	assert.Equal(t, 2, len(result))
	assert.Equal(t, "Task 1", result[0].Name)
	assert.Equal(t, "Task 2", result[1].Name)
	mockRepo.AssertExpectations(t)
}

func TestCompleteTask(t *testing.T) {
	mockRepo := new(MockTaskRepository)
	taskService := NewTaskService(mockRepo)

	task := domain.NewTask("Test Task")
	mockRepo.On("FindByID", task.ID).Return(task, nil)
	task.Complete() // Marcar a tarefa como completa antes de passar para o matcher
	mockRepo.On("Save", mock.MatchedBy(TaskMatcher{expected: &task}.Matches)).Return(nil)

	completedTask, err := taskService.CompleteTask(task.ID)

	assert.NoError(t, err)
	assert.True(t, completedTask.Completed)
	mockRepo.AssertExpectations(t)
}

func TestUpdateTaskName(t *testing.T) {
	mockRepo := new(MockTaskRepository)
	taskService := NewTaskService(mockRepo)

	task := domain.NewTask("Test Task")
	mockRepo.On("FindByID", task.ID).Return(task, nil)
	task.UpdateName("Updated Task") // Atualizar o nome da tarefa antes de passar para o matcher
	mockRepo.On("Save", mock.MatchedBy(TaskMatcher{expected: &task}.Matches)).Return(nil)

	updatedTask, err := taskService.UpdateTaskName(task.ID, "Updated Task")

	assert.NoError(t, err)
	assert.Equal(t, "Updated Task", updatedTask.Name)
	mockRepo.AssertExpectations(t)
}
