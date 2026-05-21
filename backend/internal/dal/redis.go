package dal

import (
	"backend-go/internal/config"
	"strconv"

	"github.com/go-redis/redis"
)

func InitRedis(conf config.Redis) *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     conf.IP + ":" + strconv.Itoa(conf.Port),
		Password: conf.Password,
		DB:       0,
	})

	if err := rdb.Ping().Err(); err != nil {
		panic("Failed to connect to redis: " + err.Error())
	}
	return rdb
}
