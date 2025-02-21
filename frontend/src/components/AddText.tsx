import { useState } from "react";
import BootstrapModal from "./Modal";
import { observer } from "mobx-react-lite";
import { splitAndTranslate } from "../functions/translate";

const AddText:React.FC = observer(() => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [postContent, setPostContent] = useState('');

  const handleOpen = () => setModalOpen(true);

  const handleCloseModal = async () => {
    // console.log("SAVED", postContent);
    setModalOpen(false);
    await splitAndTranslate(postContent);
  }

  return (
    <>
      <i className="bi bi-window-plus shade-hover text-primary fs-3" onClick={handleOpen} title="Add text"></i>
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
