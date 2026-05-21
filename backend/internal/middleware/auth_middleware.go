package middleware

import (
	"backend-go/internal/config"
	"backend-go/internal/utils"
	"errors"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

type AuthMiddleware struct {
	RedisClient *redis.Client
	JWTSecret   string
	Conf        *config.Config
}

func NewAuthMiddleware(rdb *redis.Client, secret string) *AuthMiddleware {
	return &AuthMiddleware{
		RedisClient: rdb,
		JWTSecret:   secret,
	}
}

func (m *AuthMiddleware) JWTCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			utils.Fail(c, utils.NoAuthError.Status, utils.NoAuthError.Code, "unauthorized")
			return
		}
		// 1. 验证JWT
		claims, err := utils.VerifyJWT(tokenString)
		if err != nil {
			utils.Fail(c, utils.NoAuthError.Status, utils.NoAuthError.Code, "uid error")
			return
		}
		// 2. 处理UID类型（float64 -> int64)
		uidFloat, err := strconv.ParseFloat(claims["uid"].(string), 64)
		if err != nil {
			utils.Fail(c, utils.NoAuthError.Status, utils.NoAuthError.Code, "uid error")
		}
		uid := int64(uidFloat)
		uidStr := strconv.FormatInt(uid, 10)

		// 3. Redis 二次验证
		val, err := m.RedisClient.WithContext(c).Get("auth:uid" + uidStr).Result()
		if errors.Is(err, redis.Nil) || val != tokenString {
			utils.Fail(c, utils.NoAuthError.Status, utils.ParamsError.Code, "登录状态已失效，请重新登录")
			c.Abort()
			return
		}

		// 4. 通过校验，将 uid 写入上下文供后续接口使用
		c.Set("uid", uid)
		c.Next()
	}
}

func (m *AuthMiddleware) Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", m.Conf.Server.FrontendURL)
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		c.Header("Access-Control-Expose-Headers", "Content-Length")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Next()
	}
}
