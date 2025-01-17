package database

import (
	"task-manager-app/backend/internal/domain"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// NewDatabase initializes the PostgreSQL database connection and returns a *gorm.DB instance.
func NewDatabase(connectionString string) (*gorm.DB, error) {
	// Open database connection
	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Configure connection pool
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	sqlDB.SetMaxOpenConns(25)                 // Limit maximum simultaneous connections
	sqlDB.SetMaxIdleConns(5)                  // Keep some connections ready
	sqlDB.SetConnMaxLifetime(5 * time.Minute) // Refresh connections periodically

	// Verify connection is working
	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}

	// Perform migrations
	if err := db.AutoMigrate(&domain.User{}, &domain.Task{}); err != nil {
		return nil, err
	}

	// Insert initial data
	if err := insertInitialData(db); err != nil {
		return nil, err
	}

	return db, nil
}

func insertInitialData(db *gorm.DB) error {
	// Check if initial data already exists
	var count int64
	db.Model(&domain.User{}).Count(&count)
	if count == 0 {
		// Insert initial user
		user := domain.User{
			Email:        "admin@example.com",
			PasswordHash: "admin", // Note: In a real application, make sure to hash the password
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		}
		if err := user.HashPassword("admin"); err != nil {
			return err
		}
		if err := db.Create(&user).Error; err != nil {
			return err
		}

		// Insert initial tasks
		tasks := []domain.Task{
			{Title: "Task 1", IsCompleted: false, UserID: user.ID, CreatedAt: time.Now(), UpdatedAt: time.Now()},
			{Title: "Task 2", IsCompleted: true, UserID: user.ID, CreatedAt: time.Now(), UpdatedAt: time.Now()},
		}
		for _, task := range tasks {
			if err := db.Create(&task).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
