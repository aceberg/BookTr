<h1><a href="https://github.com/aceberg/BookTr">
    <img src="https://raw.githubusercontent.com/aceberg/BookTr/main/assets/logo.png" width="20" />
</a>BookTr</h1>

This app translates texts side-by-side, using [LibreTranslate API](https://github.com/LibreTranslate/LibreTranslate). Features:
- For reading long texts in foreign languages
- **Aligns paragraphs** with their translations
- Can **Save** translations in `json` format
- **Select** word to see its translation, **double click** to translate every word in a sentence
- Fully **Self-Hosted**, can work offline


![Screenshot](https://raw.githubusercontent.com/aceberg/BookTr/refs/heads/main/assets/Screenshot_00.png)

## More screenshots
<details>
  <summary>Expand</summary>

![Screenshot](https://raw.githubusercontent.com/aceberg/BookTr/refs/heads/main/assets/Screenshot_05.png)
![Screenshot](https://raw.githubusercontent.com/aceberg/BookTr/refs/heads/main/assets/Screenshot_04.png)
![Screenshot](https://raw.githubusercontent.com/aceberg/BookTr/refs/heads/main/assets/Screenshot_01.png)

</details>

## Quick start (Docker)
<details>
  <summary>Expand</summary>

First, run LibreTranslate container. It will take some time (~20 minutes) and resourses (~1Gb memory, 10+Gb disk). When you see it's web interface at port 5000, move to installing BookTr.

```sh
docker run --name ltr \
    -p 5000:5000 \
  libretranslate/libretranslate
```

```sh
docker run --name BookTr \
    -e "TZ=$YOURTIMEZONE" \                  # your TZ here
    -e "LTRPATH=http://$YOURADDRESS:5000" \  # LibreTranslate URL
    -v ~/.dockerdata/BookTr:/data/BookTr  \ 
    -p 8856:8856 \
  aceberg/BookTr
```  

</details> 

## Install Binary
<details>
  <summary>Expand</summary>

All binaries are available in the [latest](https://github.com/aceberg/BookTr/releases/latest) release.
</details> 

## Auth
<details>
  <summary>Expand</summary>

**BookTr** does not have built-in auth option. But you can use it with SSO tools like Authelia, or my simple auth app [ForAuth](https://github.com/aceberg/ForAuth).   

</details> 

## Config
<details>
  <summary>Expand</summary>

#### App config
| Variable  | Description | Default |
| --------  | ----------- | ------- |
| TZ | Set your timezone for correct time | |
| HOST | Listen address | 0.0.0.0 |
| PORT   | Port for web GUI | 8856 |
| THEME | Any theme name from https://bootswatch.com in lowcase or [additional](https://github.com/aceberg/aceberg-bootswatch-fork) | ocean |
| COLOR | Background color: light or dark | light |
| NODEPATH | Path to local [node modules](https://github.com/aceberg/my-dockerfiles/tree/main/node-bootstrap) |  |

#### Connect to LibreTranslate
| Variable  | Description | Default |
| --------  | ----------- | ------- |
| LANGFROM | Translate from | fr |
| LANGTO | Translate to | en |
| LTRPATH | LibreTranslate URL |  |
| LTRKEY | LibreTranslate API key (optional) | |

All languages available in LibreTranslate: `http://YOUR_LTR_URL/languages`

</details>

## Options
<details>
  <summary>Expand</summary>

| Key  | Description | Default | 
| --------  | ----------- | ------- | 
| -d | Path to config dir | /data/BookTr |
| -n | Path to local [node modules](https://github.com/aceberg/my-dockerfiles/tree/main/node-bootstrap) | 

</details> 

## Thanks
<details>
  <summary>Expand</summary>

- Favicon and logo: [Flaticon](https://www.flaticon.com)
- [Bootstrap](https://getbootstrap.com/)

</details> 