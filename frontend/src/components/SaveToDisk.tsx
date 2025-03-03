import { useEffect, useRef, useState } from "react";
import BootstrapModal from "./Modal";
import { observer } from "mobx-react-lite";
import { apiDelFile, apiGetFile, apiGetList, apiSaveTr } from "../functions/api";
import mobxStore from "../functions/mobx-store";

const SaveToDisk:React.FC = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [updList, setUpdList] = useState<boolean>(false);
  const [fileList, setFileList] = useState<string[]>([]);

  const handleOpen = () => setModalOpen(true);

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = async () => {
    const name:string = inputRef.current?.value ?? "";
    if (name != '') {
      const note:string = noteRef.current?.value ?? "";
      await apiSaveTr(name, note);
      setUpdList(true);
    }
  }

  const handleDel = async (name: string) => {
    await apiDelFile(name);
    setUpdList(true);
  }

  const handleLoad = async (name: string) => {
    setModalOpen(false);
    const file = await apiGetFile(name);
    mobxStore.setTopInfoBlock(file.Name, file.Note);
    mobxStore.setTrBlock(file.Blocks);
  }

  useEffect(() => {
    const fetchFileList = async () => {
      const list = await apiGetList();
      setFileList(list);
    };
    setUpdList(false);
    fetchFileList();
  }, [updList]);

  return (
    <>
      <i className="bi bi-inboxes shade-hover text-primary fs-3" onClick={handleOpen} title="Saved"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Saved translations"}
        size="modal"
        body={<>
          {fileList?.map((item, i) => (
            <div key={i} className='d-flex flex-wrap shade-hover rounded-0'>
              <div className="flex-grow-1" onClick={() => handleLoad(item)}>{item}</div>
              <i className="bi bi-x shade-hover" title='Delete' onClick={() => handleDel(item)}></i>
            </div>
          ))}
          <hr></hr>
          <label htmlFor="savetrid" className="form-label text-primary">Save current translation:</label>
          <form className="form" id="savetrid">
            <input type="text" className="form-control" ref={inputRef} placeholder="Filename"></input>
            <div className="input-group mt-2">
              <input type="text" className="form-control" ref={noteRef} placeholder="Note (optional)"></input>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </form>
        </>}
        onClose={handleCloseModal}
      />
    </>
  )
});

export default SaveToDisk
