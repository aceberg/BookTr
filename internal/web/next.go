package web

import (
	"encoding/json"
	// "log"
	"net/http"
	"strconv"

	"github.com/aceberg/booktr/internal/check"
)

func nextHandler(w http.ResponseWriter, r *http.Request) {

	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	check.IfError(err)

	resp := make(map[string]string)

	for _, tr := range AllTr {
		if tr.ID == id {
			resp["id"] = strconv.Itoa(tr.ID)
			resp["left"] = tr.Left
			resp["right"] = tr.Right
		}
	}

	jsonResp, err := json.Marshal(resp)
	check.IfError(err)

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonResp)
	check.IfError(err)
}
