package yaml

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"

	"github.com/aceberg/BookTr/internal/check"
	"github.com/aceberg/BookTr/internal/models"
)

// Read - read .yaml file to struct
func Read(path string) models.ToSave {

	file, err := os.ReadFile(path)
	check.IfError(err)

	var items models.ToSave
	err = yaml.Unmarshal(file, &items)
	check.IfError(err)

	return items
}

// Write - write struct to  .yaml file
func Write(path string, items models.ToSave) {

	yamlData, err := yaml.Marshal(&items)
	check.IfError(err)

	err = os.WriteFile(path, yamlData, 0644)
	check.IfError(err)

	log.Println("INFO: writing new file to", path)
}
