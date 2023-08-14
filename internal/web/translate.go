package web

import (
	// "log"
	"net/http"

	"github.com/aceberg/booktr/internal/models"
	"github.com/aceberg/booktr/internal/translate"
)

func translateHandler(w http.ResponseWriter, r *http.Request) {
	var guiData models.GuiData
	guiData.Config = AppConfig

	tr := r.FormValue("tr")

	if tr != "" {
		// log.Println("TR:", tr)

		guiData.Tr.Left = tr
		guiData.Tr.Right = translate.Libre(tr, "en", "ru")
	}

	execTemplate(w, "translate", guiData)
}
