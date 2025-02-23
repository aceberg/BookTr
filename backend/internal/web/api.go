package web

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	// "strings"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/conf"
	"github.com/aceberg/BookTr/internal/models"
	"github.com/aceberg/BookTr/internal/myjson"
	"github.com/aceberg/BookTr/internal/translate"
)

func apiHandler(c *gin.Context) {

	msg := "This is API"
	log.Println(msg)

	c.IndentedJSON(http.StatusOK, msg)
}

func apiGetTr(c *gin.Context) {
	var result string
	treq := struct {
		Text string
		Alt  string
	}{"", ""}

	treqStr := c.PostForm("treq")
	err := json.Unmarshal([]byte(treqStr), &treq)
	check.IfError(err)

	if treq.Text == "" {
		result = ""
	} else {
		result = translate.Libre(treq.Text, appConfig, treq.Alt)
	}

	log.Println("TEXT", treq.Text)
	log.Println("RESULT", result)

	c.IndentedJSON(http.StatusOK, result)
}

func apiGetConfig(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, appConfig)
}

func apiSaveConf(c *gin.Context) {
	var config models.Conf

	str := c.PostForm("conf")
	err := json.Unmarshal([]byte(str), &config)
	check.IfError(err)

	log.Println("CONF", config)
	appConfig.Host = config.Host
	appConfig.Port = config.Port
	appConfig.Theme = config.Theme
	appConfig.Color = config.Color
	appConfig.NodePath = config.NodePath
	appConfig.LangFrom = config.LangFrom
	appConfig.LangTo = config.LangTo
	appConfig.LtrPath = config.LtrPath
	appConfig.LtrKey = config.LtrKey

	conf.Write(appConfig)

	c.IndentedJSON(http.StatusOK, true)
}

func apiSaveFile(c *gin.Context) {
	var toSave models.ToSave

	str := c.PostForm("tosave")
	err := json.Unmarshal([]byte(str), &toSave)
	check.IfError(err)

	path := appConfig.DirPath + "/saved/" + toSave.Name
	check.Path(path)
	myjson.Write(path, toSave)

	c.IndentedJSON(http.StatusOK, true)
}

func apiGetFile(c *gin.Context) {

	name := c.Query("name")
	path := appConfig.DirPath + "/saved/" + name
	toSave := myjson.Read(path)

	c.IndentedJSON(http.StatusOK, toSave)
}

func apiGetList(c *gin.Context) {
	var list []string

	path := appConfig.DirPath + "/saved/"
	files, err := os.ReadDir(path)
	check.IfError(err)

	for _, file := range files {
		if !file.IsDir() {
			list = append(list, file.Name())
		}
	}

	c.IndentedJSON(http.StatusOK, list)
}

func apiDelFile(c *gin.Context) {

	name := c.Query("name")
	path := appConfig.DirPath + "/saved/" + name
	err := os.Remove(path)
	check.IfError(err)

	c.IndentedJSON(http.StatusOK, true)
}
