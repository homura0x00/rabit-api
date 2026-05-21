package handler

import (
	"backend-go/internal/config"
	"backend-go/internal/dal/dto"
	"backend-go/internal/service"
	"backend-go/internal/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"golang.org/x/oauth2"
)

type AuthHandler struct {
	uSvc       service.UsersService
	rdb        *redis.Client
	oauth2Conf *oauth2.Config
	conf       *config.Config
}

func NewAuthHandler(uSvc service.UsersService, rdb *redis.Client, oauth *oauth2.Config, conf *config.Config) *AuthHandler {
	return &AuthHandler{
		uSvc:       uSvc,
		rdb:        rdb,
		oauth2Conf: oauth,
		conf:       conf,
	}
}

// RedirectToGithub redirect to the GitHub login page
func (h *AuthHandler) RedirectToGithub(c *gin.Context) {
	url := h.oauth2Conf.AuthCodeURL("state")
	c.Redirect(http.StatusFound, url)
}

// GithubCallback 获取 Github 返回信息
func (h *AuthHandler) GithubCallback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		utils.Fail(c, utils.ParamsError.Status, utils.ParamsError.Code, "非法请求")
		return
	}

	githubToken, err := h.oauth2Conf.Exchange(c, code)
	if err != nil {
		// 建议不要返回 404，这并不是用户不存在，而是授权逻辑错误
		utils.Fail(c, utils.ParamsError.Status, utils.ParamsError.Code, "授权码已失效或已被使用")
		return
	}

	client := h.oauth2Conf.Client(c, githubToken)
	//req, _ := http.NewRequest("GET", "https://api.github.com/user", nil)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		fmt.Println("GetMessage Err: ", err.Error())
	}
	defer resp.Body.Close()

	// 2. 准备一个结构体或者 map 来接收数据
	var ghUser dto.GithubUser

	// 3. 直接从 resp.Body 解码到 result 变量中
	// 这一步会自动把 JSON 字节流转换成 Go 的 Map 对象
	if err := json.NewDecoder(resp.Body).Decode(&ghUser); err != nil {
		utils.Fail(c, utils.SystemError.Status, utils.SystemError.Code, "解析JSON失败")
		return
	}

	// 4. 数据查询
	user, err := h.uSvc.GithubLogin(c, &ghUser)
	if err != nil {
		utils.Fail(c, utils.SystemError.Status, utils.SystemError.Code, "系统错误")
		return
	}

	// 5. JWT + Redis
	userStr := strconv.FormatInt(user.ID, 10)
	jwtToken, _ := utils.GenerateJWT(userStr)

	err = h.rdb.WithContext(c).Set("auth:uid:"+userStr, jwtToken, time.Duration(h.conf.Jwt.Expires)*time.Hour).Err()
	if err != nil {
		utils.Fail(c, utils.SystemError.Status, utils.SystemError.Code, "系统错误")
		return
	}

	// 1. 获取前端基础域名（从 DI 注入的配置中读取）
	frontendBase := h.conf.Server.FrontendURL

	// 2. 只把 token 传回去，或者再加一个标识位表示“首次登录”
	targetURL := fmt.Sprintf("%s/auth/callback?token=%s",
		frontendBase,
		jwtToken,
	)

	c.Redirect(http.StatusFound, targetURL)
}

// LogoutUser 用户退出
func (h *AuthHandler) LogoutUser(c *gin.Context) {
	uid, _ := c.Get("uid")

	if err := h.rdb.WithContext(c).Del("auth:uid:" + uid.(string)).Err(); err != nil {
		utils.Fail(c, utils.SystemError.Status, utils.SystemError.Code, "清除登录态失败")
		return
	}

	c.Redirect(http.StatusFound, "/")
}
