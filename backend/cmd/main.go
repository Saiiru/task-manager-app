package main

import (
	"log"
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/config"
	"task-manager-app/backend/internal/database"
	"task-manager-app/backend/internal/infrastructure"
	"task-manager-app/backend/internal/interfaces/graphql/generated"
	resolvers "task-manager-app/backend/internal/interfaces/graphql/resolver"
	"task-manager-app/backend/internal/middleware"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func graphqlHandler(resolver *resolvers.Resolver) gin.HandlerFunc {
	h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{
		Resolvers: resolver,
	}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	router := gin.Default()

	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Initialize database
	db, err := database.NewDatabase(cfg.GetDSN())
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Initialize repositories
	taskRepo := infrastructure.NewTaskRepository(db)
	userRepo := infrastructure.NewUserRepository(db)

	// Initialize services
	taskService := application.NewTaskService(taskRepo)
	userService := application.NewUserService(userRepo)

	resolver := resolvers.NewResolver(taskService, userService)

	// Public routes
	router.GET("/playground", playgroundHandler())
	router.POST("/query", graphqlHandler(resolver)) // For GraphQL queries

	// Protected routes
	protected := router.Group("/protected")
	protected.Use(middleware.AuthMiddleware([]byte(cfg.JWT.Secret)))
	protected.POST("/query", graphqlHandler(resolver)) // For authenticated operations

	log.Printf("Server running on http://%s:%s", cfg.Server.Host, cfg.Server.Port)
	log.Printf("GraphQL playground available at http://%s:%s/playground", cfg.Server.Host, cfg.Server.Port)

	if err := router.Run(cfg.Server.Host + ":" + cfg.Server.Port); err != nil {
		log.Fatalf("Error running server: %v", err)
	}
}
