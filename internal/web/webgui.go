package web

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/booktr/internal/check"
	"github.com/aceberg/booktr/internal/conf"
)

// Gui - start web server
func Gui(confPath, nodePath string) {

	AppConfig = conf.Get(confPath)
	AppConfig.ConfPath = confPath
	AppConfig.NodePath = ""
	AppConfig.Icon = Icon
	log.Println("INFO: starting web gui with config", AppConfig.ConfPath)

	address := AppConfig.Host + ":" + AppConfig.Port

	log.Println("=================================== ")
	log.Printf("Web GUI at http://%s", address)
	log.Println("=================================== ")

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.LoadHTMLGlob(TemplPath + "/*.html")

	router.GET("/", indexHandler)         // index.go
	router.POST("/", indexHandler)        // index.go
	router.POST("/tr/", translateHandler) // translate.go

	err := router.Run(address)
	check.IfError(err)
}
