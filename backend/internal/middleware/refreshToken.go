package middleware

// RefreshToken 全局中间件，判断有token就刷新，无token就放行；用于维持用户状态（无退出事件发生时）
//func RefreshToken(c *gin.Context) {
//	// 从请求头中获取Token，没有token就直接返回
//	token := c.GetHeader("Authorization")
//	token = strings.TrimPrefix(token, "Bearer ")
//	//claims, err := jwts.ParseToken(token)
//	//if err != nil {
//	//	logrus.Fatal(c, "Token err: "+err.Error())
//	//	c.Abort()
//	//	return
//	//}
//	//fmt.Println(claims)
//	//if time.Since(claims.ExpiresAt.Local()) < time.Duration(global.Config.Jwt.Expires)*time.Hour {
//	//	newToken, err := jwts.GenToken(claims.JwyPayLoad)
//	//}
//	//fmt.Printf("token: %s\n", token)
//	if token == "" {
//		c.Next()
//	}
//	tokenKey := "login:token:" + token
//	id, err := global.Redis.HGet(tokenKey, "id").Result()
//	if err != nil {
//		fmt.Println(err.Error())
//		return
//	}
//	// 登录表中没有查询到任何用户，直接放行
//	if id == "" {
//		c.Next()
//	}
//	fmt.Sprintf("id: %s\n\n", id)
//	// 存在用户，刷新token时间
//	tokenTime := time.Duration(config.GlobalConfig.Jwt.Expires) * time.Hour
//	err = global.Redis.Expire(tokenKey, tokenTime).Err()
//	if err != nil {
//		fmt.Println(err.Error())
//		return
//	}
//}
