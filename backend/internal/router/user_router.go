package router

import (
	"backend-go/internal/handler"
	"backend-go/internal/middleware"

	"github.com/gin-gonic/gin"
)

type UserRouter struct {
	hdl *handler.UserHandler
}

func NewUserRouter(hdl *handler.UserHandler) *UserRouter {
	return &UserRouter{
		hdl: hdl,
	}
}

func (ur *UserRouter) Init(rg *gin.RouterGroup, authMiddleware *middleware.AuthMiddleware) {
	users := rg.Group("/users")
	{
		/**
		 *		GET 	/get/login 	查询登录用户信息
		 *		GET 	/			查询所有用户
		 *		GET 	/:id		查询单个用户信息
		 *		PUT 	/			更新用户信息
		 *		DELETE	/:id		删除用户
		 */
		// 置顶，jwt验证，非登录用户无权限
		users.Use(authMiddleware.JWTCheck())
		// 查登录用户信息并返回
		users.GET("/get/login", ur.hdl.GetLoginUser)

		users.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "list_users"})
		})
		users.GET("/:id", ur.hdl.GetUser)
		users.PUT("/update", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "update_user"})
		})
		users.DELETE("/:id", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "delete_user"})
		})
	}
}
