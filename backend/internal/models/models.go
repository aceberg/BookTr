package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	DirPath  string
	ConfPath string
	NodePath string
	LtrPath  string
	LtrKey   string
	LangFrom string
	LangTo   string
}

// TrStruct - one translated sentence
type TrStruct struct {
	ID     string
	Text   string
	Result string
}

// TrBlock - one block
type TrBlock []TrStruct

// ToSave - save to file
type ToSave struct {
	Name     string
	Bookmark string
	Blocks   []TrBlock
}
