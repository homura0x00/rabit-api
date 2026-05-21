package router

import (
	"backend-go/internal/config"
	"backend-go/internal/dal/query"
	"backend-go/internal/handler"
	"backend-go/internal/middleware"
	"backend-go/internal/provider"
	"backend-go/internal/service"
	"backend-go/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type Router struct {
	Interface *InterfaceRouter
}

func InitRouter(db *gorm.DB, rdb *redis.Client, conf *config.Config) *gin.Engine {
	r := gin.New()

	q := query.Use(db)

	r.GET("/health", func(c *gin.Context) {
		utils.OK(c, "ok")
	})

	// 全局中间件
	//r.Use(middleware2.Cors, middleware2.RefreshToken)
	// 中间件 DI
	authMW := middleware.NewAuthMiddleware(rdb, conf.Jwt.SecretKey)

	// InterfaceInfo 路由
	itfSvc := service.NewInterfaceInfoService(q)
	itfHdl := handler.NewInterfaceHandler(itfSvc)
	itfRouter := NewInterfaceRouter(itfHdl)
	// user 路由注册
	usSvc := service.NewUserService(q)
	usHdl := handler.NewUserHandler(usSvc)
	usRouter := NewUserRouter(usHdl)

	oauthGithub := provider.ProvideGitHubOauthConfig(conf)
	authHdl := handler.NewAuthHandler(usSvc, rdb, oauthGithub, conf)
	authRouter := NewAuthRouter(authHdl)

	r.Use(authMW.Cors())

	apiV1 := r.Group("/api/v1")
	{
		authRouter.Init(apiV1)
		usRouter.Init(apiV1, authMW)
		itfRouter.Init(apiV1)
	}
	return r
}
