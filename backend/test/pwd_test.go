package test

import (
	"backend-go/internal/utils"
	"fmt"
)

func main() {
	hash := utils.HashPwd("1234")
	hash1 := utils.HashPwd("1234")
	fmt.Println(hash, hash1)

	ok := utils.CheckPwd(hash, "1234")
	fmt.Println(ok)
	ok1 := utils.CheckPwd(hash1, "1234")
	fmt.Println(ok1)

}
