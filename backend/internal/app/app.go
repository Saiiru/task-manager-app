package app

import (
	"fmt"
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/config"
	"task-manager-app/backend/internal/database"
	"task-manager-app/backend/internal/domain"
	"task-manager-app/backend/internal/infrastructure"
	"task-manager-app/backend/internal/interfaces"
	"task-manager-app/backend/internal/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// InitializeApp initializes the application components such as the database, services, and routers.
func InitializeApp(cfg *config.Config, useInMemoryDB bool) (*gin.Engine, error) {
	var db *gorm.DB
	var err error

	if useInMemoryDB {
		// Use in-memory SQLite database for tests
		db, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
		if err != nil {
			return nil, fmt.Errorf("failed to initialize in-memory database: %v", err)
		}
		// Apply migrations
		if err := db.AutoMigrate(&domain.User{}, &domain.Task{}); err != nil {
			return nil, fmt.Errorf("failed to apply migrations: %v", err)
		}
	} else {
		// Initialize the PostgreSQL database connection
		dsn := cfg.GetDSN()
		db, err = database.NewDatabase(dsn)
		if err != nil {
			return nil, fmt.Errorf("failed to initialize database: %v", err)
		}
	}

	// Initialize Gin router
	router := gin.Default()

	// Set up middleware (Rate limiter)
	router.Use(middleware.RateLimiter())

	// Initialize repositories
	userRepo := infrastructure.NewUserRepository(db)
	taskRepo := infrastructure.NewTaskRepository(db)

	// Initialize services
	userService := application.NewUserService(userRepo)
	taskService := application.NewTaskService(taskRepo)

	// Initialize handlers
	authHandler := interfaces.NewAuthHandler(userService, []byte(cfg.JWT.Secret))
	interfaces.NewTaskHandler(router, taskService)
	interfaces.NewUserHandler(router, userService)

	// Register routes
	registerRoutes(router, authHandler, cfg)

	return router, nil
}

func registerRoutes(router *gin.Engine, authHandler *interfaces.AuthHandler, cfg *config.Config) {
	router.POST("/api/v1/register", authHandler.Register)
	router.POST("/api/v1/login", authHandler.Login)
	router.POST("/api/v1/refresh-token", middleware.AuthMiddleware([]byte(cfg.JWT.Secret)), authHandler.RefreshToken)
	router.POST("/api/v1/logout", middleware.AuthMiddleware([]byte(cfg.JWT.Secret)), authHandler.Logout)

	// Profile route, returns the email stored in JWT token
	router.GET("/api/v1/profile", middleware.AuthMiddleware([]byte(cfg.JWT.Secret)), func(c *gin.Context) {
		email, _ := c.Get("email")
		c.JSON(200, gin.H{"email": email})
	})
}
