import { useState } from "react";
import BootstrapModal from "./Modal";
import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";

const AddText:React.FC = observer(() => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [postContent, setPostContent] = useState('');

  const handleOpen = async () => setModalOpen(true);

  const handleCloseModal = () => {
    mobxStore.setTrText(postContent);
    console.log("SAVED", postContent);
    mobxStore.setUpdTr(true);
    setModalOpen(false);
  }

  return (
    <>
      <i className="bi bi-window-plus shade-hover fs-3" onClick={handleOpen} title="Add text to translate"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Add text"}
        size="modal-xl"
        body={<textarea
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
          className="form-control"
          rows={10}>
          </textarea>}
        onClose={handleCloseModal}
      />
    </>
  )
});

export default AddText
