package config

import "github.com/spf13/viper"

var GlobalConfig *Config

func Load(path string) *Config {
	v := viper.New()
	v.SetConfigFile(path)
	v.SetConfigType("yaml")

	// 允许读取环境变量（生产环境常用）
	// 比如环境变量 DB_PASSWORD 会覆盖配置文件中的相关项
	v.AutomaticEnv()

	if err := v.ReadInConfig(); err != nil {
		panic("failed to read config: " + err.Error())
	}

	if err := v.Unmarshal(&GlobalConfig); err != nil {
		panic("failed to unmarshal config: " + err.Error())
	}

	return GlobalConfig
}
