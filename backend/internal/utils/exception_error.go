package utils

import "net/http"

// ErrorCode 定义业务错误码结构体
type ErrorCode struct {
	Code    string // 业务状态码
	Message string // 状态码描述（后端看/日志看）
	Status  int    // 对应的 HTTP 状态码
}

// 定义常用的全局业务错误码
var (
	Success       = ErrorCode{Code: "0", Message: "ok", Status: http.StatusOK}
	ParamsError   = ErrorCode{Code: "40000", Message: "请求参数错误", Status: http.StatusBadRequest}
	NotLoginError = ErrorCode{Code: "40100", Message: "未登录", Status: http.StatusUnauthorized}
	NoAuthError   = ErrorCode{Code: "40101", Message: "无权限", Status: http.StatusForbidden}
	NotFoundError = ErrorCode{Code: "40400", Message: "请求数据不存在", Status: http.StatusNotFound}
	TokenError    = ErrorCode{Code: "40201", Message: "接口凭证已过期", Status: http.StatusUnauthorized}
	SystemError   = ErrorCode{Code: "50000", Message: "系统内部异常", Status: http.StatusInternalServerError}
)
