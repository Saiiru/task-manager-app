package domain

import (
	"errors"
	"regexp"
	"task-manager-app/backend/pkg/utils"
	"time"
)

// User represents our database user
type User struct {
	ID           int       `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"` // "-" means this won't be included in JSON
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// UserLogin represents login request data
type UserLogin struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// UserRegister represents registration request data
type UserRegister struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=5"`
}

// Validate checks if email format is valid
func (u *UserRegister) Validate() error {
	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	if !emailRegex.MatchString(u.Email) {
		return errors.New("invalid email format")
	}
	return nil
}

// HashPassword hashes the user's password
func (u *User) HashPassword(password string) error {
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return err
	}
	u.PasswordHash = hashedPassword
	return nil
}

// CheckPassword compares the hashed password with the plain text password
func (u *User) CheckPassword(password string) error {
	if !utils.CheckPasswordHash(password, u.PasswordHash) {
		return errors.New("invalid password")
	}
	return nil
}

// UserRepository defines the methods that any
// data storage provider needs to implement to get
// and store users
type UserRepository interface {
	Create(user *User) error
	FindByEmail(email string) (*User, error)
	FindAll() ([]User, error)
	FindByID(id int) (*User, error)
	Update(user *User) error
	Delete(id int) error
}
