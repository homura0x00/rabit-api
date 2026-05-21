package list

import (
	"backend-go/global"
	"fmt"

	"gorm.io/gorm"
)

type Option struct {
	model.Pagination
	Likes   []string // 模糊查询对应的列名
	Debug   bool     // 是否开启原生sql（打印sql语句）
	Where   *gorm.DB
	Preload []string // 预加载相关联的数据
}

func QueryList[T any](model T, option Option) (list []T, count int, err error) {
	query := global.DB.Where(model)
	if option.Debug {
		query = query.Debug()
	}

	// 输出排序
	if option.Sort == "" {
		option.Sort = "created_at desc"
	}

	// 显示一页的查询条数
	if option.Limit == 0 {
		option.Limit = 10 // 当无输入时默认条数为10
	}

	if option.Where != nil {
		query.Where(option.Where)
	}

	// 当前端的搜索框有值时，模糊匹配
	if option.Key != "" {
		likeQuery := global.DB.Where("")
		for index, column := range option.Likes {
			if index == 0 {
				likeQuery.Where(fmt.Sprintf("%s like ?", column), fmt.Sprintf("%%%s%%", option.Key))
			} else {
				likeQuery.Or(fmt.Sprintf("%s like ?", column), fmt.Sprintf("%%%s%%", option.Key))
			}
		}
		query = query.Where(likeQuery)
	}
	count = int(query.Find(&list).RowsAffected)
	for _, preload := range option.Preload {
		query.Preload(preload)
	}

	offset := (option.Page - 1) * option.Limit
	err = query.Limit(option.Limit).Offset(offset).Order(option.Sort).Find(&list).Error

	return
}
