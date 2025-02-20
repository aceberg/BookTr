package translate

import (
	tr "github.com/snakesel/libretranslate"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/models"
)

// Libre - translate with LibreTranslate
func Libre(text string, conf models.Conf) string {

	trans := tr.New(tr.Config{
		Url: conf.LtrPath,
		Key: conf.LtrKey,
	})

	result, err := trans.Translate(text, conf.LangFrom, conf.LangTo)
	check.IfError(err)

	return result
}
