package main

import (
	"backend-go/internal/config"
	"backend-go/internal/dal"
	"backend-go/internal/router"
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	// 配置加载
	conf := config.Load("configs/config.yaml")

	// 数据库初始化
	data, cleanup, err := dal.NewData(conf)
	if err != nil {
		panic(err)
	}
	defer cleanup() // 确保程序正常退出时连接被正常关闭

	// 路由注册
	r := router.InitRouter(data.DB, data.RDB, conf)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", conf.Server.Port),
		Handler: r,
	}
	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal, 1)
	// kill (no params) by default sends syscall.SIGTERM
	// kill -2 is syscall.SIGINT
	// kill -9 is syscall.SIGKILL but can't be caught, so don't need to add it
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Println("Server Shutdown:", err)
	}
	log.Println("Server exiting")
}
