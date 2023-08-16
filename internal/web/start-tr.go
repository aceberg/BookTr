package web

import (
	"log"
	"strings"

	"github.com/aceberg/booktr/internal/models"
	"github.com/aceberg/booktr/internal/translate"
)

// startTr - server translated strings
func startTr(text, from, to string) {
	var tr models.Translate

	allStrings := strings.SplitAfter(text, ".")

	for i := range allStrings {

		tr = models.Translate{}

		tr.ID = i
		tr.Left = allStrings[i]
		tr.Right = translate.Libre(allStrings[i], from, to)

		if strings.Contains(tr.Left, "\n") {
			tr.Right = "\n" + tr.Right
		}

		log.Println("L:", tr.Left)
		log.Println("R:", tr.Right)

		AllTr = append(AllTr, tr)
	}
}
