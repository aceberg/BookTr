package web

import (
	"net/http"

	"github.com/aceberg/booktr/internal/conf"
	"github.com/aceberg/booktr/internal/models"
)

func configHandler(w http.ResponseWriter, r *http.Request) {
	var guiData models.GuiData

	guiData.Config = AppConfig

	// file, err := TemplHTML.ReadFile(TemplPath + "version")
	// check.IfError(err)
	// version := string(file)
	// guiData.Version = version[8:]

	guiData.Themes = []string{"cerulean", "cosmo", "cyborg", "darkly", "flatly", "journal", "litera", "lumen", "lux", "materia", "minty", "morph", "pulse", "quartz", "sandstone", "simplex", "sketchy", "slate", "solar", "spacelab", "superhero", "united", "vapor", "yeti", "zephyr"}

	execTemplate(w, "config", guiData)
}

func saveConfigHandler(w http.ResponseWriter, r *http.Request) {

	AppConfig.Host = r.FormValue("host")
	AppConfig.Port = r.FormValue("port")
	AppConfig.Theme = r.FormValue("theme")
	AppConfig.Color = r.FormValue("color")
	AppConfig.HoverCol = r.FormValue("hover_col")
	AppConfig.HoverTr = r.FormValue("hover_tr")

	conf.Write(AppConfig)

	http.Redirect(w, r, r.Header.Get("Referer"), 302)
}
