package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Code int

// Response is the standard API envelope.
type Response struct {
	Success bool       `json:"success"`
	Data    any        `json:"data,omitempty"`
	Error   *ErrorInfo `json:"error,omitempty"`
	Meta    *Meta      `json:"meta,omitempty"`
}

type ErrorInfo struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type Meta struct {
	Page      int `json:"page,omitempty"`
	PerPage   int `json:"per_page,omitempty"`
	Total     int `json:"total,omitempty"`
	TotalPage int `json:"total_page,omitempty"`
}

// OK sends a success response.
func OK(c *gin.Context, data any) {
	c.JSON(http.StatusOK, Response{
		Success: true,
		Data:    data,
	})
}

// Fail sends an error response.
func Fail(c *gin.Context, statue int, code, msg string) {
	c.JSON(statue, Response{
		Success: false,
		Error:   &ErrorInfo{Code: code, Message: msg},
	})
}
