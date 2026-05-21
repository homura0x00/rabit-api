package config

type Config struct {
	Server Server
	Mysql  MySQL
	Redis  Redis
	Jwt    Jwt
	OAuth  OAuth
}

type Server struct {
	Port        string
	Mode        string
	FrontendURL string `yaml:"frontendURL"`
}

type MySQL struct {
	Host     string // 服务器地址url
	Port     string // 端口
	Config   string // 高级配置
	DBName   string // 数据库名
	User     string // 数据库登录名
	Password string // 数据库登录密码
	LogLevel string // 是否开启Gorm全局日志
}

type Redis struct {
	IP       string `yaml:"ip"`
	Port     int    `yaml:"port"`
	Password string `yaml:"password"`
	PoolSize int    `yaml:"poolSize"` // 连接池大小
}

type Jwt struct {
	Expires   int    `yaml:"expires"`   // 过期时间，单位：小时
	Issuer    string `yaml:"issuer"`    // 颁发人
	SecretKey string `yaml:"secretKey"` // 密钥
}

type OAuth struct {
	Github Github `yaml:"github"`
}
type Github struct {
	ClientID     string `yaml:"clientId"`
	ClientSecret string `yaml:"clientSecret"`
	RedirectURL  string `yaml:"redirectUrl"`
}
