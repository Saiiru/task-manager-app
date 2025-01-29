package resolvers_test

import (
	"context"
	"task-manager-app/backend/internal/app"
	"task-manager-app/backend/internal/config"
	"task-manager-app/backend/internal/interfaces/graphql/model"
	"testing"
)

func TestTaskCRUD(t *testing.T) {
	cfg := &config.Config{
		Database: config.DatabaseConfig{
			Host:     "localhost",
			Port:     "5432",
			User:     "test",
			Password: "test",
			Name:     "test_db",
		},
	}

	router, taskService, userService, err := app.InitializeApp(cfg, true)
	if err != nil {
		t.Fatalf("Failed to initialize app: %v", err)
	}

	resolver := NewResolver(taskService, userService)

	// Test Create Task
	t.Run("Create Task", func(t *testing.T) {
		input := model.NewTask{
			Title:  "Test Task",
			UserID: "1",
		}

		task, err := resolver.Mutation().CreateTask(context.Background(), input)
		if err != nil {
			t.Fatalf("Failed to create task: %v", err)
		}

		if task.Title != input.Title {
			t.Errorf("Expected title %s, got %s", input.Title, task.Title)
		}
	})

	// Add more test cases for Read, Update, Delete
}
