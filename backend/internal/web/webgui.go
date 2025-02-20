package web

import (
	"embed"
	"html/template"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/conf"
	"github.com/aceberg/BookTr/internal/models"
)

var (
	appConfig models.Conf

	// pubFS - public folder
	//
	//go:embed public/assets/*
	assetsFS embed.FS

	//go:embed public/index.html
	templFS embed.FS
)

// Gui - start web server
func Gui(dirPath, nodePath string) {

	confPath := dirPath + "/config.yaml"
	check.Path(confPath)
	appConfig = conf.Get(confPath)

	appConfig.DirPath = dirPath
	appConfig.ConfPath = confPath
	appConfig.NodePath = nodePath

	// Remove after config is done
	appConfig.LtrPath = "http://192.168.2.3:5000"
	appConfig.LangFrom = "en"
	appConfig.LangTo = "ru"

	log.Println("INFO: starting web gui with config", appConfig.ConfPath)

	address := appConfig.Host + ":" + appConfig.Port

	log.Println("=================================== ")
	log.Printf("Web GUI at http://%s", address)
	log.Println("=================================== ")

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	templ := template.Must(template.New("").ParseFS(templFS, "public/index.html"))
	router.SetHTMLTemplate(templ) // templates

	router.GET("/", indexHandler) // index.go
	router.StaticFS("/fs", http.FS(assetsFS))

	router.GET("/api", apiHandler)        // api.go
	router.GET("/api/conf", apiGetConfig) // api.go
	router.GET("/api/tr", apiGetTr)       // api.go

	router.POST("/api/conf", apiSaveConf) // api.go

	err := router.Run(address)
	check.IfError(err)
}
