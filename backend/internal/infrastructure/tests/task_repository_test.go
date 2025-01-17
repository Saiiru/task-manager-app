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
	repo, db := setupTaskRepository()

	task := &domain.Task{Title: "Test Task", IsCompleted: false, UserID: 1}
	err := repo.Create(task)
	assert.NoError(t, err)

	var result domain.Task
	db.First(&result, task.ID)
	assert.Equal(t, "Test Task", result.Title)
}

func TestFindByID(t *testing.T) {
	repo, _ := setupTaskRepository()

	task := &domain.Task{Title: "Test Task", IsCompleted: false, UserID: 1}
	err := repo.Create(task)
	assert.NoError(t, err)

	result, err := repo.FindByID(task.ID)
	assert.NoError(t, err)
	assert.Equal(t, "Test Task", result.Title)
}
