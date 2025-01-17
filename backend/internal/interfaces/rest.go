package interfaces

import (
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/domain"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	service *application.TaskService
}

func NewTaskHandler(router *gin.Engine, service *application.TaskService) {
	handler := &TaskHandler{service: service}
	router.GET("/tasks", handler.GetTasks)
	router.POST("/tasks", handler.CreateTask)
}

func (h *TaskHandler) GetTasks(c *gin.Context) {
	tasks, err := h.service.GetAllTasks()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, tasks)
}

func (h *TaskHandler) CreateTask(c *gin.Context) {
	var task domain.Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := h.service.CreateTask(&task); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, task)
}
