package main

import (
	"fmt"
	"log"
	"os"
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/infrastructure"
	"task-manager-app/backend/internal/interfaces"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Configuração do banco de dados
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	// Conexão com o PostgreSQL
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	// Conectando ao banco de dados
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Criar as tabelas
	if err := db.AutoMigrate(&infrastructure.Task{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Inicializar WebSocket
	interfaces.SetupWebSocket()

	// Configurar GraphQL
	interfaces.SetupGraphQL()

	// Configurar REST API
	router := gin.Default()
	taskRepo := infrastructure.NewTaskRepository(db)
	taskService := application.NewTaskService(taskRepo)
	interfaces.NewTaskHandler(router, taskService)

	// Iniciar servidor
	router.Run(":8080")
}
