package service

import "backend-go/internal/dal/query"

type AuthInterface interface {
	GetUser(code string) (string, error)
}

type AuthService struct {
	query *query.Query
}

func NewAuthService(query *query.Query) *AuthService {
	return &AuthService{query: query}
}
