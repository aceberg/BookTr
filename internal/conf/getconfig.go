package conf

import (
	"github.com/spf13/viper"

	"github.com/aceberg/booktr/internal/check"
	"github.com/aceberg/booktr/internal/models"
)

// Get - read config from file or env
func Get(path string) models.Conf {
	var config models.Conf

	viper.SetDefault("HOST", "0.0.0.0")
	viper.SetDefault("PORT", "8851")
	viper.SetDefault("THEME", "cosmo")
	viper.SetDefault("COLOR", "dark")
	viper.SetDefault("HOVER_COL", "#55b8ff")
	viper.SetDefault("HOVER_TR", "50")

	viper.SetConfigFile(path)
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	check.IfError(err)

	viper.AutomaticEnv() // Get ENVIRONMENT variables

	config.Host, _ = viper.Get("HOST").(string)
	config.Port, _ = viper.Get("PORT").(string)
	config.Theme, _ = viper.Get("THEME").(string)
	config.Color, _ = viper.Get("COLOR").(string)
	config.HoverCol, _ = viper.Get("HOVER_COL").(string)
	config.HoverTr, _ = viper.Get("HOVER_TR").(string)

	return config
}

// Write - write config to file
func Write(config models.Conf) {

	viper.SetConfigFile(config.ConfPath)
	viper.SetConfigType("yaml")

	viper.Set("host", config.Host)
	viper.Set("port", config.Port)
	viper.Set("theme", config.Theme)
	viper.Set("color", config.Color)
	viper.Set("hover_col", config.HoverCol)
	viper.Set("hover_tr", config.HoverTr)

	err := viper.WriteConfig()
	check.IfError(err)
}
