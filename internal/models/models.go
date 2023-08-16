package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	Icon     string
	ConfPath string
	NodePath string
}

// Translate - text to translate
type Translate struct {
	ID    int
	Left  string
	Right string
}

// GuiData - web gui data
type GuiData struct {
	Config Conf
	Themes []string
	Tr     Translate
}
