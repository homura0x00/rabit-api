package provider

import (
	"backend-go/internal/config"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

// ProvideGitHubOauthConfig Github OAuth2 配置
func ProvideGitHubOauthConfig(cfg *config.Config) *oauth2.Config {
	return &oauth2.Config{
		ClientID:     cfg.OAuth.Github.ClientID,
		ClientSecret: cfg.OAuth.Github.ClientSecret,
		RedirectURL:  cfg.OAuth.Github.RedirectURL,
		Endpoint:     github.Endpoint,
		Scopes:       []string{"default"},
	}
}
