package myjson

import (
	"encoding/json"
	"log"
	"os"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/models"
)

// Read - read .json file to struct
func Read(path string) models.ToSave {

	file, err := os.ReadFile(path)
	check.IfError(err)

	var items models.ToSave
	err = json.Unmarshal(file, &items)
	check.IfError(err)

	return items
}

// Write - write struct to  .json file
func Write(path string, items models.ToSave) {

	jsonData, err := json.Marshal(&items)
	check.IfError(err)

	err = os.WriteFile(path, jsonData, 0644)
	check.IfError(err)

	log.Println("INFO: writing new file to", path)
}
