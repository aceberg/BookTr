package web

import (
	"log"
	"net/http"

	"github.com/aceberg/booktr/internal/check"
	"github.com/aceberg/booktr/internal/conf"
)

// Gui - start web server
func Gui(confPath, nodePath string) {

	AppConfig = conf.Get(confPath)
	AppConfig.ConfPath = confPath
	AppConfig.NodePath = ""
	AppConfig.Icon = Icon
	log.Println("INFO: starting web gui with config", AppConfig.ConfPath)

	address := AppConfig.Host + ":" + AppConfig.Port

	log.Println("=================================== ")
	log.Printf("Web GUI at http://%s", address)
	log.Println("=================================== ")

	http.HandleFunc("/", indexHandler)                  // index.go
	http.HandleFunc("/config/", configHandler)          // config.go
	http.HandleFunc("/config_save/", saveConfigHandler) // config.go
	http.HandleFunc("/next/", nextHandler)              // next.go
	http.HandleFunc("/tr/", translateHandler)           // translate.go

	err := http.ListenAndServe(address, nil)
	check.IfError(err)
}
