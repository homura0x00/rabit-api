package utils

import (
	"backend-go/internal/config"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var conf config.Config

// GenerateJWT 生成JWT
func GenerateJWT(userID string) (string, error) {
	now := time.Now()

	claims := jwt.MapClaims{
		"uid": userID,
		"iss": conf.Jwt.Issuer, // 签发人
		"exp": jwt.NewNumericDate(now.Add(time.Duration(conf.Jwt.Expires) * time.Hour)),
		"iat": jwt.NewNumericDate(now),
		"nbf": jwt.NewNumericDate(now), // 作用：该时间前无效
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(conf.Jwt.SecretKey))

	if err != nil {
		return "", err
	}

	return signedToken, nil
}

// VerifyJWT 校验 JWT 并返回载荷信息
func VerifyJWT(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// 验证加密算法是否符合预期 (HS256)
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(conf.Jwt.SecretKey), nil
	})

	// 错误处理,将错误返回给上层逻辑处理
	if err != nil {
		return nil, err
	}

	// 4. 验证 Token 是否有效并转换 Claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// 验证 issuer 签发人
		if iss, _ := claims.GetIssuer(); iss != conf.Jwt.Issuer {
			return nil, fmt.Errorf("invalid issuer: %s", iss)
		}
		return claims, nil
	}

	return nil, fmt.Errorf("invalid token")
}

// GenerateAK 生成24位 AccessKey
func GenerateAK() string {
	buf := make([]byte, 12)
	if _, err := io.ReadFull(rand.Reader, buf); err != nil {
		return "ak_failed_to_generate"
	}
	return hex.EncodeToString(buf)
}

// GenerateSK 生成32位 SecretKey
func GenerateSK() string {
	buf := make([]byte, 16)
	if _, err := io.ReadFull(rand.Reader, buf); err != nil {
		return "sk_failed_to_generate"
	}

	return hex.EncodeToString(buf)
}
