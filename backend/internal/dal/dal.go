package dal

import (
	"backend-go/internal/config"
	"log"

	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type Data struct {
	DB  *gorm.DB
	RDB *redis.Client
}


func NewData(conf *config.Config) (*Data, func(), error) {
	db := InitMySQL(conf.Mysql)

	rdb := InitRedis(conf.Redis)

	data := &Data{
		DB:  db,
		RDB: rdb,
	}

	cleanup := func() {
		log.Println("Starting to close database connections...")

		// 1. Cleaning MySQL
		if sqlDB, err := db.DB(); err != nil {
			if sqlDB.Close(); err != nil {
				log.Println("Failed to close database connection:", err)
			} else {
				log.Println("MySQL connection closed successfully")
			}
		} else {
			log.Printf("Error getting SQL DB instance: %v\n", err)
		}

		// 2. Cleaning Redis
		if err := rdb.Close(); err != nil {
			log.Printf("Error closing Redis: %v\n", err)
		} else {
			log.Println("Redis connection closed successfully")
		}
	}

	return data, cleanup, nil
}
