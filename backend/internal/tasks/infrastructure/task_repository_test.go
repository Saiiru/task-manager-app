package infrastructure

import (
	"task-manager-app/backend/internal/tasks/domain"
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func TestTaskRepository(t *testing.T) {
	db, err := gorm.Open("sqlite3", ":memory:")
	if err != nil {
		t.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	db.AutoMigrate(&domain.Task{})

	repo := NewTaskRepository(db)

	task := &domain.Task{Name: "Test Task"}
	err = repo.Save(task)
	if err != nil {
		t.Fatalf("Failed to save task: %v", err)
	}

	tasks, err := repo.FindAll()
	if err != nil {
		t.Fatalf("Failed to find all tasks: %v", err)
	}

	if len(tasks) != 1 {
		t.Fatalf("Expected 1 task, got %d", len(tasks))
	}

	if tasks[0].Name != "Test Task" {
		t.Fatalf("Expected task name to be 'Test Task', got '%s'", tasks[0].Name)
	}
}
