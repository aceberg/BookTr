package web

import (
	// "log"
	"net/http"

	"github.com/aceberg/booktr/internal/models"
)

func translateHandler(w http.ResponseWriter, r *http.Request) {
	var guiData models.GuiData
	guiData.Config = AppConfig

	text := r.FormValue("tr")

	if text != "" {
		go startTr(text, "en", "ru")
	}

	execTemplate(w, "translate", guiData)
}
