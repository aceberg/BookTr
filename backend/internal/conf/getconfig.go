package conf

import (
	"github.com/spf13/viper"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/models"
)

// Get - read config from file or env
func Get(path string) models.Conf {
	var config models.Conf

	viper.SetDefault("HOST", "0.0.0.0")
	viper.SetDefault("PORT", "8851")
	viper.SetDefault("THEME", "ocean")
	viper.SetDefault("COLOR", "light")
	viper.SetDefault("NODEPATH", "")
	viper.SetDefault("LANGFROM", "fr")
	viper.SetDefault("LANGTO", "en")
	viper.SetDefault("LTRPATH", "")
	viper.SetDefault("LTRKEY", "")

	viper.SetConfigFile(path)
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	check.IfError(err)

	viper.AutomaticEnv() // Get ENVIRONMENT variables

	config.Host, _ = viper.Get("HOST").(string)
	config.Port, _ = viper.Get("PORT").(string)
	config.Theme, _ = viper.Get("THEME").(string)
	config.Color, _ = viper.Get("COLOR").(string)
	config.NodePath, _ = viper.Get("NODEPATH").(string)
	config.LangFrom, _ = viper.Get("LANGFROM").(string)
	config.LangTo, _ = viper.Get("LANGTO").(string)
	config.LtrPath, _ = viper.Get("LTRPATH").(string)
	config.LtrKey, _ = viper.Get("LTRKEY").(string)

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
	viper.Set("nodepath", config.NodePath)
	viper.Set("langfrom", config.LangFrom)
	viper.Set("langto", config.LangTo)
	viper.Set("ltrpath", config.LtrPath)
	viper.Set("ltrkey", config.LtrKey)

	err := viper.WriteConfig()
	check.IfError(err)
}
