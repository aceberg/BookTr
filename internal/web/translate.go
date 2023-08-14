package web

import (
	// "log"
	"net/http"

	"github.com/aceberg/booktr/internal/models"
)

func translateHandler(w http.ResponseWriter, r *http.Request) {
	var guiData models.GuiData
	guiData.Config = AppConfig

	tr := r.FormValue("tr")

	if tr != "" {
		// log.Println("TR:", tr)

		guiData.Tr.Left = tr
		guiData.Tr.Right = tr
	}

	execTemplate(w, "translate", guiData)
}
