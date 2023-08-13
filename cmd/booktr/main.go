package main

import (
	"flag"

	_ "time/tzdata"

	"github.com/aceberg/booktr/internal/check"
	"github.com/aceberg/booktr/internal/web"
)

const confPath = "/data/booktr/config.yaml"
const nodePath = ""

func main() {
	confPtr := flag.String("c", confPath, "Path to config yaml file")
	nodePtr := flag.String("n", nodePath, "Path to node modules")
	flag.Parse()

	check.Path(*confPtr)

	web.Gui(*confPtr, *nodePtr) // webgui.go
}
