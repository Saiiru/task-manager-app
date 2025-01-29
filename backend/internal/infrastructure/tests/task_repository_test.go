package infrastructure_test

import (
	"task-manager-app/backend/internal/domain"
	"task-manager-app/backend/internal/infrastructure"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTaskRepository() (*infrastructure.TaskRepository, *gorm.DB) {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&domain.Task{})
	repo := infrastructure.NewTaskRepository(db)
	return repo, db
}

func TestCreateTask(t *testing.T) {
	repo, _ := setupTaskRepository()

	task := &domain.Task{
		Title:  "Test Task",
		UserID: 1,
	}
	err := repo.Create(task)
	assert.NoError(t, err)
	assert.NotZero(t, task.ID)
}

func TestFindTaskByID(t *testing.T) {
	repo, _ := setupTaskRepository()

	task := &domain.Task{
		Title:  "Test Task",
		UserID: 1,
	}
	repo.Create(task)

	found, err := repo.FindByID(task.ID)
	assert.NoError(t, err)
	assert.Equal(t, task.Title, found.Title)
}
