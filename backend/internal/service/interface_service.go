package service

import (
	"backend-go/internal/dal/model"
	"backend-go/internal/dal/query"
	"context"
)

type InterfaceInfoService interface {
	CreateInterface(c context.Context, info *model.InterfaceInfo) error
	GetInterfaceInfo(c context.Context, id int64) (*model.InterfaceInfo, error)
}

type InterfaceService struct {
	query *query.Query
}

func NewInterfaceInfoService(q *query.Query) *InterfaceService {
	return &InterfaceService{query: q}
}

func (s *InterfaceService) CreateInterface(ctx context.Context, info *model.InterfaceInfo) error {
	return s.query.InterfaceInfo.WithContext(ctx).Create(info)
}

func (s *InterfaceService) GetInterfaceInfo(ctx context.Context, id int64) (*model.InterfaceInfo, error) {
	return s.query.InterfaceInfo.WithContext(ctx).Where(s.query.InterfaceInfo.ID.Eq(id)).First()
}
