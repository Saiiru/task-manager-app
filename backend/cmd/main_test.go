package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"task-manager-app/backend/internal/tasks/application"
	"task-manager-app/backend/internal/tasks/domain"
	"task-manager-app/backend/internal/tasks/infrastructure"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/stretchr/testify/assert"
)

func setupRouter() *gin.Engine {
	// Use an in-memory SQLite database for testing
	db, _ := gorm.Open("sqlite3", ":memory:")
	db.AutoMigrate(&domain.Task{})

	taskRepo := infrastructure.NewTaskRepository(db)
	taskService := application.NewTaskService(taskRepo)

	r := gin.Default()

	r.GET("/tasks", func(c *gin.Context) {
		tasks, err := taskService.GetAllTasks()
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, tasks)
	})

	r.POST("/tasks", func(c *gin.Context) {
		var task domain.Task
		if err := c.ShouldBindJSON(&task); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		createdTask, err := taskService.CreateTask(task.Name)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(201, createdTask)
	})

	return r
}

func TestGetTasks(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/tasks", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Contains(t, w.Body.String(), "[]")
}

func TestCreateTask(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/tasks", strings.NewReader(`{"name":"Test Task"}`))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	assert.Equal(t, 201, w.Code)
	assert.Contains(t, w.Body.String(), "Test Task")
}
