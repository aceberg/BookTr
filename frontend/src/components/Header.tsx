import { useEffect, useState } from "react";

const Header: React.FC = () => {

  const [themePath, setThemePath] = useState('');
  const [iconsPath, setIconsPath] = useState('');
  
  const setCurrentTheme = () => {
    const theme = "ocean";
    const color = "light";
    
    setThemePath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+theme+"/bootstrap.min.css");
    setIconsPath("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");

    document.documentElement.setAttribute("data-bs-theme", color);
    // color === "dark"
    //   ? document.documentElement.style.setProperty('--transparent-light', '#ffffff15')
    //   : document.documentElement.style.setProperty('--transparent-light', '#00000015');
  }

  useEffect(() => {
    setCurrentTheme();
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="row">
      <link rel="stylesheet" href={iconsPath}></link> {/* icons */}
      <link rel="stylesheet" href={themePath}></link> {/* theme */}
      
      <div className='d-flex justify-content-between mt-2'>
        <h3 className="shade-hover rounded-3" onClick={handleReload}>BookTr</h3>
        <div className='d-flex justify-content-between'>
          {/* <TypesDropdown></TypesDropdown>
          <span className="p-3"></span>
          <ConfigDropdown></ConfigDropdown> */}
        </div>
      </div>
    </div>
  )
};

export default Header
