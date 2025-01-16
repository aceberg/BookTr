package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	Icon     string
	DirPath  string
	ConfPath string
	NodePath string
}

// Translate - text to translate
type Translate struct {
	ID    int
	Left  string
	Right string
}
