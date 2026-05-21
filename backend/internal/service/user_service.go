package service

import (
	"backend-go/internal/dal/dto"
	"backend-go/internal/dal/model"
	"backend-go/internal/dal/query"
	"backend-go/internal/utils"
	"context"
	"errors"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// UsersService 用户Service层实现
type UsersService interface {
	// GithubLogin OAuth侧用户登录
	GithubLogin(ctx context.Context, ghUser *dto.GithubUser) (*model.SysUser, error)
	// GetLoginUserInfo 查询登录用户信息
	GetLoginUserInfo(ctx context.Context, id int64) (*model.SysUser, error)
	// GetUserRole 获取用户角色
	GetUserRole(ctx context.Context, id int64) ([]string, error)
}

type UserService struct {
	db *query.Query
}

func NewUserService(db *query.Query) *UserService {
	return &UserService{
		db: db,
	}
}

// GithubLogin OAuth侧用户登录
func (h *UserService) GithubLogin(ctx context.Context, authInfo *dto.GithubUser) (*model.SysUser, error) {
	// 1. 查询本地数据库是否记录有该用户的OAuth信息
	auth, err := h.db.SysUserAuth.WithContext(ctx).Where(h.db.SysUserAuth.Identifier.Eq(strconv.Itoa(authInfo.ID))).Where(h.db.SysUserAuth.IdentityType.Eq("github")).First()
	// 有就直接返回SysUser表中的用户ID
	if err == nil {
		user, _ := h.db.SysUser.WithContext(ctx).Where(h.db.SysUser.ID.Eq(auth.UserID)).First()
		return user, nil
	}
	// 非 NotFound 错误（如数据库断连），直接抛出
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// 2. [用户不存在] 注册用户信息
	var newUser *model.SysUser
	// 开启事务
	err = h.db.Transaction(func(tx *query.Query) error {
		// A. 创建SysUser
		newUser = &model.SysUser{
			UserAccount: &authInfo.Login,
			UserName:    authInfo.Name,
			AvatarURL:   &authInfo.AvatarURL,
			Email:       authInfo.Email,
			AccessKey:   utils.GenerateAK(),
			SecretKey:   utils.GenerateAK(),
		}
		if err := tx.SysUser.WithContext(ctx).Create(newUser); err != nil {
			return err
		}

		// B. 创建SysUserAuth
		newAuth := &model.SysUserAuth{
			UserID:       newUser.ID,
			IdentityType: "github",
			Identifier:   fmt.Sprintf("%d", authInfo.ID),
		}
		if err := tx.SysUserAuth.WithContext(ctx).Create(newAuth); err != nil {
			return err
		}

		// C. 创建SysUserRole
		newRole := &model.SysUserRole{
			UserID: newUser.ID,
			RoleID: 2,
		}
		return tx.SysUserRole.WithContext(ctx).Create(newRole)
	})

	// 返回用户信息
	return newUser, err
}

// GetUserRole 获取用户角色
func (h *UserService) GetUserRole(ctx context.Context, userID int64) ([]string, error) {
	var roleKeys []string
	q := h.db
	err := q.SysRole.WithContext(ctx).
		Select(q.SysRole.RoleKey).
		LeftJoin(q.SysUserRole, q.SysRole.ID.EqCol(q.SysUserRole.RoleID)).
		Where(q.SysUserRole.UserID.Eq(userID)).
		Scan(&roleKeys)

	if err != nil {
		return nil, err
	}

	// 保险，全都为user角色
	if len(roleKeys) == 0 {
		return []string{"user"}, nil
	}

	return roleKeys, nil
}

// GetLoginUserInfo 查询登录用户信息
func (h *UserService) GetLoginUserInfo(ctx context.Context, id int64) (*model.SysUser, error) {
	user, _ := h.db.SysUser.WithContext(ctx).Where(h.db.SysUser.ID.Eq(id)).First()
	if user == nil {
		return nil, errors.New("user not found")
	}

	return user, nil
}

func (h *UserService) UpdateUserInfo(c *gin.Context, userId string) {}

func (h *UserService) GetUserLists(c *gin.Context) {

}

func (h *UserService) CreateUser(c *gin.Context) {

}
