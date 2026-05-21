package router

import (
	"backend-go/internal/handler"

	"github.com/gin-gonic/gin"
)

type AuthRouter struct {
	authHandler *handler.AuthHandler
}

func NewAuthRouter(ah *handler.AuthHandler) *AuthRouter {
	return &AuthRouter{
		authHandler: ah,
	}
}

func (ar *AuthRouter) Init(rg *gin.RouterGroup) {
	auth := rg.Group("/auth")
	{
		auth.GET("/github/login", ar.authHandler.RedirectToGithub)

		auth.GET("/github/callback", ar.authHandler.GithubCallback)

		auth.GET("/logout", ar.authHandler.LogoutUser)
	}
}
