package test

import (
	"backend-go/internal/config"
	"fmt"
	"testing"
)

func TestReadConfig(t *testing.T) {
	conf := config.Load("configs/config.yaml")

	fmt.Println(conf)
}
