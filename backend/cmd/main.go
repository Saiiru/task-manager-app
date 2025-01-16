package main

import (
	"log"
	"os"
	"task-manager-app/backend/internal/tasks/application"
	"task-manager-app/backend/internal/tasks/domain"
	"task-manager-app/backend/internal/tasks/infrastructure"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

func main() {
	// Carregar variáveis de ambiente do arquivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get DATABASE_URL environment variable
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set.")
	}

	// Connect to PostgreSQL database
	db, err := gorm.Open("postgres", databaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Auto migrate the database
	db.AutoMigrate(&domain.Task{})

	// Initialize repository and service
	taskRepo := infrastructure.NewTaskRepository(db)
	taskService := application.NewTaskService(taskRepo)

	// Set up the router
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

	r.Run()
}
