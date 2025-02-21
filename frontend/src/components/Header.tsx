import { useEffect, useState } from "react";
import AddText from "./AddText";
import { observer } from "mobx-react-lite";
import mobxStore, { Conf } from "../functions/mobx-store";
import { getConfig } from "../functions/api";
import ConfigSettings from "./ConfigSettings";
import SaveToDisk from "./SaveToDisk";

const Header: React.FC = observer(() => {

  const [themePath, setThemePath] = useState('');
  const [iconsPath, setIconsPath] = useState('');
  const [lang, setLang] = useState('');
  
  const setCurrentTheme = (appConfig:Conf) => {
    const theme = appConfig.Theme?appConfig.Theme:"ocean";
    const color = appConfig.Color?appConfig.Color:"light";
    setLang(appConfig.LangFrom + " —> " + appConfig.LangTo);
    
    if (appConfig.NodePath == '') {
      setThemePath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+theme+"/bootstrap.min.css");
      setIconsPath("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
    } else {
      setThemePath(appConfig.NodePath+"/node_modules/bootswatch/dist/"+theme+"/bootstrap.min.css");
      setIconsPath(appConfig.NodePath+"/node_modules/bootstrap-icons/font/bootstrap-icons.css");
    }

    document.documentElement.setAttribute("data-bs-theme", color);
    color === "dark"
      ? document.documentElement.style.setProperty('--transparent-light', '#ffffff15')
      : document.documentElement.style.setProperty('--transparent-light', '#00000015');
  }

  useEffect(() => {
    const fetchData = async () => {
      const appConfig = await getConfig();
      mobxStore.setAppConfig(appConfig);
      setCurrentTheme(appConfig);
    }
    fetchData();
    
    mobxStore.setUpdHead(false);
  }, [mobxStore.updHead]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="row">
      <link rel="stylesheet" href={iconsPath}></link> {/* icons */}
      <link rel="stylesheet" href={themePath}></link> {/* theme */}
      
      <div className='d-flex justify-content-between mt-2'>
        <div className='d-flex justify-content-between'>
          <h3 className="shade-hover rounded-3 text-primary" onClick={handleReload}>BookTr</h3>
          <span className="p-1"></span>
          <div className="opacity-50">{lang}</div>
        </div>
        {mobxStore.totalCounter > 0
          && <div className="opacity-50">Translated {mobxStore.doneCounter} of {mobxStore.totalCounter}</div>
        }
        <div className='d-flex justify-content-between'>
          <AddText></AddText>
          <span className="p-1"></span>
          <SaveToDisk></SaveToDisk>
          <span className="p-1"></span>
          <ConfigSettings></ConfigSettings>
        </div>
      </div>
    </div>
  )
});

export default Header
