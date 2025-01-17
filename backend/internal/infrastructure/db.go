package infrastructure

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Task struct {
	ID     uint   `gorm:"primaryKey"`
	Title  string `gorm:"not null"`
	Status string `gorm:"not null"`
}

func ConnectDB(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}
