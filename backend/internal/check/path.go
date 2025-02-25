package check

import (
	"os"
	"path/filepath"
)

// Path - create file path if not exists
func Path(path string) bool {

	_, err := os.Stat(path)

	if path != "" && err != nil {

		dir := filepath.Dir(path)

		err = os.MkdirAll(dir, os.ModePerm)
		IfError(err)

		_, err = os.Create(path)
		IfError(err)

		return false
	}

	return true
}

// Dir - create dir path if not exists
func Dir(path string) bool {

	_, err := os.Stat(path)

	if path != "" && err != nil {

		err = os.MkdirAll(path, os.ModePerm)
		IfError(err)

		return false
	}

	return true
}
