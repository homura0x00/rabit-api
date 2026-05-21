package main

import (
	"backend-go/internal/config"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath:       "./internal/dal/query",
		ModelPkgPath:  "./internal/dal/model",
		Mode:          gen.WithoutContext | gen.WithDefaultQuery, // 启用默认查询和链式接口
		FieldNullable: true,                                      // 允许 NULL 的字段生成指针类型
	})

	cfg := config.Load("configs/config.yaml").Mysql

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?%s",
		cfg.User,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.DBName,
		cfg.Config)

	fmt.Println(dsn)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connect database success")
	g.UseDB(db)
	g.ApplyBasic(g.GenerateAllTable()...)
	g.Execute()
}
