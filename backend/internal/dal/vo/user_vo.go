package vo

type UserVo struct {
	ID        int64    `json:"id"`
	UserName  string   `json:"user_name"`
	AvatarURL *string  `json:"avatar_url"`
	Roles     []string `json:"roles"`
}
