import { useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveConf } from "../functions/api";
import mobxStore, { Conf } from "../functions/mobx-store";

function ConfigSettings() {

  const appConfig = mobxStore.appConfig;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Conf>(appConfig);

  const themes: string[] = ["cerulean", "cosmo", "cyborg", "darkly", "emerald", "flatly", "grass", "grayscale", "journal", "litera", "lumen", "lux", "materia", "minty", "morph", "ocean", "pulse", "quartz", "sand", "sandstone", "simplex", "sketchy", "slate", "solar", "spacelab", "superhero", "united", "vapor", "wood", "yeti", "zephyr"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(appConfig);
    setModalOpen(true);
  }

  const saveChanges = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(appConfig)) {
      await apiSaveConf(formData);
      mobxStore.setAppConfig(formData);
      console.log("CONFIG:", formData);
      mobxStore.setUpdHead(true);
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleSave = () => {
    saveChanges();
    setModalOpen(false);
  }

  const handleTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      Theme: event.target.value,
    }));
  };

  const handleColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      Color: event.target.value,
    }));
  };

  return (
    <>
      {/* <a href="#" className="dropdown-item" onClick={handleEdit}>Settings</a> */}
      <i className="bi bi-gear shade-hover fs-3" onClick={handleEdit} title="Settings"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Settings"
        size="modal-xl"
        body={
          <form>
            <div className="row">
              <div className="col-md">
                <label htmlFor="hid" className="form-label text-primary">Host</label>
                <input className="form-control mb-3" defaultValue={appConfig.Host} id="hid" name="Host" onChange={handleChange}></input>
                <label htmlFor="pid" className="form-label text-primary">Port</label>
                <input className="form-control mb-3" defaultValue={appConfig.Port} id="pid" name="Port" onChange={handleChange}></input>
                <label htmlFor="gid" className="form-label text-primary">Theme</label>
                <select name="Theme" className="form-select mb-3" id="gid" onChange={handleTheme} value={formData.Theme}>
                  {themes.map((theme, i) => (
                    <option key={i} value={theme}>{theme}</option>
                  ))}
                </select>
                <label htmlFor="nid" className="form-label text-primary">Color</label>
                <select name="Color" className="form-select mb-3" id="nid" onChange={handleColor} value={formData.Color}>
                  <option value="light">light</option>
                  <option value="dark">dark</option>
                </select>
                <label htmlFor="tid" className="form-label text-primary">NodePath</label>
                <input className="form-control mb-3" defaultValue={appConfig.NodePath} id="tid" name="NodePath" onChange={handleChange} placeholder="Path to local node-bootstrap (optional)"></input>
              </div>
              <div className="col-md">
                <label htmlFor="frid" className="form-label text-primary">Translate From</label>
                <input className="form-control mb-3" defaultValue={appConfig.LangFrom} id="frid" name="LangFrom" onChange={handleChange}></input>
                <label htmlFor="toid" className="form-label text-primary">Translate To</label>
                <input className="form-control mb-3" defaultValue={appConfig.LangTo} id="toid" name="LangTo" onChange={handleChange}></input>
                <label htmlFor="pathid" className="form-label text-primary">LTR Path</label>
                <input className="form-control mb-3" defaultValue={appConfig.LtrPath} id="pathid" name="LtrPath" onChange={handleChange}></input>
                <label htmlFor="keyid" className="form-label text-primary">LTR Key</label>
                <input className="form-control mb-3" defaultValue={appConfig.LtrKey} id="keyid" name="LtrKey" onChange={handleChange}></input>
              </div>
            </div>
            <hr></hr>
            <div className='d-flex justify-content-between'>
              <span></span>
              <button className="btn btn-primary" type="button" onClick={handleSave}>Save</button>
            </div>
          </form>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default ConfigSettings
