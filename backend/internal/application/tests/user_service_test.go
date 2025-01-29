package application_test

import (
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/domain"
	"task-manager-app/backend/pkg/utils"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// MockUserRepository é um mock do repositório de usuários
type MockUserRepository struct {
	mock.Mock
}

func (m *MockUserRepository) Create(user *domain.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockUserRepository) FindByEmail(email string) (*domain.User, error) {
	args := m.Called(email)
	if args.Get(0) != nil {
		return args.Get(0).(*domain.User), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *MockUserRepository) FindAll() ([]domain.User, error) {
	args := m.Called()
	return args.Get(0).([]domain.User), args.Error(1)
}

func (m *MockUserRepository) FindByID(id int) (*domain.User, error) {
	args := m.Called(id)
	if args.Get(0) != nil {
		return args.Get(0).(*domain.User), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *MockUserRepository) Update(user *domain.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockUserRepository) Delete(id int) error {
	args := m.Called(id)
	return args.Error(0)
}

func TestRegisterUser(t *testing.T) {
	repo := new(MockUserRepository)
	service := application.NewUserService(repo)

	user := &domain.User{Email: "test@example.com", PasswordHash: "password"}
	repo.On("Create", user).Return(nil)

	err := service.Register(user)
	assert.NoError(t, err)
	repo.AssertExpectations(t)
}

func TestLoginUser(t *testing.T) {
	repo := new(MockUserRepository)
	service := application.NewUserService(repo)

	// Simular a senha hash
	hashedPassword, _ := utils.HashPassword("password")
	user := &domain.User{Email: "test@example.com", PasswordHash: hashedPassword}
	repo.On("FindByEmail", "test@example.com").Return(user, nil)

	user, token, err := service.Login("test@example.com", "password")
	assert.NoError(t, err)
	assert.NotEmpty(t, token)
	repo.AssertExpectations(t)
}
