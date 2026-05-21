package utils

import "fmt"

type BusinessError struct {
	ErrorCode  ErrorCode
	LogMessage string
}

func (e *BusinessError) Error() string {
	return fmt.Sprintf("BusinessError: [Code: %s, Msg: %s], LogMsg: %s",
		e.ErrorCode.Code, e.ErrorCode.Message, e.LogMessage)
}

// NewBusinessError 创建一个标准的业务异常
func NewBusinessError(errorCode ErrorCode, logMessage string) *BusinessError {
	return &BusinessError{
		ErrorCode:  errorCode,
		LogMessage: logMessage,
	}
}
