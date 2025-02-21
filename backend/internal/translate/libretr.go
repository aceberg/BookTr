package translate

import (
	"bytes"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/models"
)

// Libre - translate with LibreTranslate
func Libre(text string, conf models.Conf, alt string) string {
	type Post struct {
		Result string   `json:"translatedText"`
		Error  string   `json:"error"`
		Alt    []string `json:"alternatives"`
	}

	postURL := conf.LtrPath + "/translate"
	postBody, _ := json.Marshal(map[string]string{
		"q":            text,
		"source":       conf.LangFrom,
		"target":       conf.LangTo,
		"api_key":      conf.LtrKey,
		"alternatives": alt, // if "0" - no alternatives
	})
	responseBody := bytes.NewBuffer(postBody)

	resp, err := http.Post(postURL, "application/json", responseBody)
	check.IfError(err)

	defer resp.Body.Close()

	post := &Post{}
	err = json.NewDecoder(resp.Body).Decode(post)
	check.IfError(err)

	if len(post.Alt) > 0 {
		return post.Result + " " + strings.Join(post.Alt, " ")
	}

	return post.Result
}
