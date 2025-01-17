package application

import (
	"errors"
	"task-manager-app/backend/internal/domain"
	"task-manager-app/backend/pkg/utils"
)

type UserService struct {
	repo domain.UserRepository
}

func NewUserService(repo domain.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Register(user *domain.User) error {
	if err := utils.ValidatePassword(user.PasswordHash); err != nil {
		return err
	}
	return s.repo.Create(user)
}

func (s *UserService) Login(email, password string) (string, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		return "", err
	}

	if err := user.CheckPassword(password); err != nil {
		return "", errors.New("invalid credentials")
	}

	token, err := utils.GenerateJWT(user.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *UserService) GetAllUsers() ([]domain.User, error) {
	return s.repo.FindAll()
}

func (s *UserService) GetUserByID(id int) (*domain.User, error) {
	return s.repo.FindByID(id)
}

func (s *UserService) UpdateUser(user *domain.User) error {
	return s.repo.Update(user)
}

func (s *UserService) DeleteUser(id int) error {
	return s.repo.Delete(id)
}
