package test

import (
	jwts2 "backend-go/internal/utils/jwts"
	"fmt"
	"os"
)

func main() {
	s, err := jwts2.GenToken(jwts2.JwyPayLoad{
		NickName: "fengfeng",
	})
	if err != nil {
		fmt.Println("generate jwt failed, ", err)
		os.Exit(1)
	}
	fmt.Printf("token为：%s\n", s)

	// 解析jwt
	claims, err := jwts2.ParseToken(s)
	if err != nil {
		fmt.Println("parse jwt failed, ", err)
		os.Exit(1)
	}
	fmt.Printf("token的解析为：%+v\n", claims)
}
