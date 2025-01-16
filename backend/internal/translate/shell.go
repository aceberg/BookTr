package translate

import (
	"fmt"
	"os/exec"

	"github.com/aceberg/BookTr/internal/check"
)

// Shell - translate with translate-shell
func Shell(text, from, to string) string {

	str := fmt.Sprintf("-s %s -t %s -b %s", from, to, text)

	cmd := exec.Command("trans", str)
	out, err := cmd.CombinedOutput()
	check.IfError(err)

	fmt.Println("OUT:", out)

	return string(out)
}
