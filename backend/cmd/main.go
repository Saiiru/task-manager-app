package main

import (
	"log"
	"task-manager-app/backend/internal/app"
	"task-manager-app/backend/internal/config"
)

func main() {
	// Load the configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize the application components (router, handlers, etc.)
	router, err := app.InitializeApp(cfg, false)
	if err != nil {
		log.Fatalf("Error initializing application: %v", err)
	}

	// Run the server
	serverAddr := cfg.Server.Host + ":" + cfg.Server.Port
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Error running the server: %v", err)
	}
}
