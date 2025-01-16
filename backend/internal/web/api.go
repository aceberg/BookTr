package web

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/BookTr/internal/translate"
)

func apiHandler(c *gin.Context) {

	msg := "This is API"
	log.Println(msg)

	c.IndentedJSON(http.StatusOK, msg)
}

func apiTr(c *gin.Context) {

	text := c.PostForm("text")
	result := translate.Libre(text, "en", "ru")

	log.Println("RESULT", result)

	c.IndentedJSON(http.StatusOK, result)
}
