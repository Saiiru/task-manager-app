package infrastructure_test

import (
	"task-manager-app/backend/internal/domain"
	"task-manager-app/backend/internal/infrastructure"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupUserRepository() (*infrastructure.UserRepository, *gorm.DB) {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&domain.User{})
	repo := infrastructure.NewUserRepository(db)
	return repo, db
}

func TestCreateUser(t *testing.T) {
	repo, db := setupUserRepository()

	user := &domain.User{Email: "test@example.com", PasswordHash: "password"}
	err := repo.Create(user)
	assert.NoError(t, err)

	var result domain.User
	db.First(&result, user.ID)
	assert.Equal(t, "test@example.com", result.Email)
}

func TestFindByEmail(t *testing.T) {
	repo, _ := setupUserRepository()

	user := &domain.User{Email: "test@example.com", PasswordHash: "password"}
	err := repo.Create(user)
	assert.NoError(t, err)

	result, err := repo.FindByEmail("test@example.com")
	assert.NoError(t, err)
	assert.Equal(t, "test@example.com", result.Email)
}
