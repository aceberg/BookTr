package web

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/booktr/internal/models"
)

func translateHandler(c *gin.Context) {
	var guiData models.GuiData
	guiData.Config = AppConfig

	_ = c.Request.ParseForm()
	tr := c.PostForm("tr")

	if tr != "" {
		log.Println("TR:", tr)

		guiData.Tr.Left = tr
		guiData.Tr.Right = tr
	}

	c.HTML(http.StatusOK, "header.html", guiData)
	c.HTML(http.StatusOK, "translate.html", guiData)
}
