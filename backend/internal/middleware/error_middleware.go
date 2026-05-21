package middleware

import (
	"backend-go/internal/utils"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GlobalErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if rValue := recover(); rValue != nil {

				// 将 any 尝试转换为标准的 error 接口对象 (给errors.As用的，不想转的化去掉这一块代码并将rValue改回error）
				var err error
				switch v := rValue.(type) {
				case error:
					err = v
				default:
					// 如果 panic 出来的不是 error（比如有人写了 panic("string")），将其包装成 error
					err = fmt.Errorf("%v", v)
				}

				// 1. 尝试断言是否为我们自定义的业务异常 BusinessError
				var busErr *utils.BusinessError
				if errors.As(err, &busErr) {
					// 【信息拆分 A】：后端保留详细日志（写 Log）
					log.Printf("[BUSINESS ERROR] 路径: %s | 业务状态码: %s | 内部日志: %s",
						c.Request.URL.Path, busErr.ErrorCode.Code, busErr.LogMessage)

					// 【信息拆分 B】：前端脱敏返回（给用户看）
					c.JSON(busErr.ErrorCode.Status, utils.Response{
						Success: false,
						Error: &utils.ErrorInfo{
							Code:    busErr.ErrorCode.Code,
							Message: busErr.ErrorCode.Message, // 比如“请求参数错误”，绝不暴露数据库细节
						},
					})
					c.Abort()
					return
				}

				// 2. 如果是系统级崩溃（比如空指针异常、数组越界等未知 panic）
				// 【信息拆分 A】：后端打印出最致命的崩溃堆栈日志
				log.Printf("[SYSTEM PANIC] 路径: %s | 致命异常: %v", c.Request.URL.Path, err)

				// 【信息拆分 B】：前端只给一个模糊的、安全的“系统错误”提示
				c.JSON(http.StatusInternalServerError, utils.Response{
					Success: false,
					Error: &utils.ErrorInfo{
						Code:    utils.SystemError.Code,
						Message: "服务器开小差了，请稍后再试", // 绝对不把底层 panic 信息丢给前端
					},
				})
				c.Abort()
			}
		}()
		c.Next()
	}
}
