package translate

import (
	tr "github.com/snakesel/libretranslate"

	"github.com/aceberg/BookTr/internal/check"
)

// Libre - translate with LibreTranslate
func Libre(text, from, to string) string {

	trans := tr.New(tr.Config{
		Url: "http://192.168.2.3:5000",
		Key: "",
	})

	result, err := trans.Translate(text, from, to)
	check.IfError(err)

	return result
}
