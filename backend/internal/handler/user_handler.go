package handler

import (
	"backend-go/internal/dal/vo"
	"backend-go/internal/service"
	"backend-go/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

// TODO 完善用户功能（注销，更改，封禁，软删除）

type UserHandler struct {
	uSvc service.UsersService
	rdb  *redis.Client
}

func NewUserHandler(svc service.UsersService) *UserHandler {
	return &UserHandler{uSvc: svc}
}

// GetLoginUser 获取登录（在线）用户的信息
func (h *UserHandler) GetLoginUser(c *gin.Context) {
	// 1. 从 context 中获取
	uid, _ := c.Get("uid")
	uidInt64, _ := uid.(int64)
	// 2. 查询用户信息和用户角色
	user, err := h.uSvc.GetLoginUserInfo(c, uidInt64)
	roles, err := h.uSvc.GetUserRole(c, uidInt64)
	if err != nil {
		utils.Fail(c, utils.SystemError.Status, utils.SystemError.Code, "系统错误")
		return
	}
	// 3. 用户信息脱敏
	loginUser := vo.UserVo{
		ID:        user.ID,
		UserName:  user.UserName,
		AvatarURL: user.AvatarURL,
		Roles:     roles,
	}

	utils.OK(c, loginUser)
}

// GetUserList 以List的形式列出所有用户的信息
func (h *UserHandler) GetUserList(c *gin.Context) {

}

func (h *UserHandler) GetUser(c *gin.Context) {}

// UpdateUserInfo 更新用户信息
func (h *UserHandler) UpdateUserInfo(c *gin.Context) {
}

// DeleteUser 删除用户
func (h *UserHandler) DeleteUser(c *gin.Context) {}
