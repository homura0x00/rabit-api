package router

import (
	"backend-go/internal/handler"

	"github.com/gin-gonic/gin"
)

type InterfaceRouter struct {
	hdl *handler.InterfaceInfoHandler
}

func NewInterfaceRouter(hdl *handler.InterfaceInfoHandler) *InterfaceRouter {
	return &InterfaceRouter{
		hdl: hdl,
	}
}

func (ir *InterfaceRouter) Init(rg *gin.RouterGroup) {
	// TODO interfaceInfo 路由服务注册
	interfaceInfos := rg.Group("/interface")
	{
		interfaceInfos.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "list_interfaces"})
		})
		interfaceInfos.POST("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "create_interfaces"})
		})
		interfaceInfos.GET("/:id", ir.hdl.GetDetail)
		interfaceInfos.PUT("/:id", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "update_interfaces"})
		})
		interfaceInfos.DELETE("/:id", func(c *gin.Context) {
			c.JSON(200, gin.H{"action": "delete_interfaces"})
		})
	}
}
