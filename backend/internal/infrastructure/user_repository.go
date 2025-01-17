package infrastructure

import (
	"fmt"
	"task-manager-app/backend/internal/domain"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository initializes the user repository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

// Create creates a new user
func (r *UserRepository) Create(user *domain.User) error {
	if err := r.db.Create(user).Error; err != nil {
		return fmt.Errorf("failed to create user: %w", err)
	}
	return nil
}

// FindByEmail finds a user by email
func (r *UserRepository) FindByEmail(email string) (*domain.User, error) {
	var user domain.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to find user by email: %w", err)
	}
	return &user, nil
}

// FindAll finds all users
func (r *UserRepository) FindAll() ([]domain.User, error) {
	var users []domain.User
	if err := r.db.Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to find all users: %w", err)
	}
	return users, nil
}

// FindByID finds a user by ID
func (r *UserRepository) FindByID(id int) (*domain.User, error) {
	var user domain.User
	if err := r.db.First(&user, id).Error; err != nil {
		return nil, fmt.Errorf("failed to find user by ID: %w", err)
	}
	return &user, nil
}

// Update updates a user
func (r *UserRepository) Update(user *domain.User) error {
	if err := r.db.Save(user).Error; err != nil {
		return fmt.Errorf("failed to update user: %w", err)
	}
	return nil
}

// Delete deletes a user by ID
func (r *UserRepository) Delete(id int) error {
	if err := r.db.Delete(&domain.User{}, id).Error; err != nil {
		return fmt.Errorf("failed to delete user: %w", err)
	}
	return nil
}
