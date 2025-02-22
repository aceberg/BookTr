import { useState } from "react";
import BootstrapModal from "./Modal";
import { observer } from "mobx-react-lite";
import { trSentence } from "../functions/translate";
import mobxStore from "../functions/mobx-store";
import { apiTranslateAlt } from "../functions/api";

type Props = {text: string};
const Details:React.FC<Props> = observer((_props) => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = async () => {
    setModalOpen(true);
    await trSentence(_props.text);
  }

  const handleCloseModal = () => setModalOpen(false);

  const handleTextClick = async () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const str = selection.toString();
      const res = await apiTranslateAlt(str);
      console.log("TOOLTIP", res);
      mobxStore.setTooltipText(res);
      setTimeout(() => {
        mobxStore.setTooltipText('');
      }, 3000); // 3 seconds
    }
  };

  return (
    <>
      <span onDoubleClick={handleOpen} onMouseUp={handleTextClick} style={{cursor: "pointer",}}>{_props.text}</span>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Details"}
        size="modal-lg"
        body={
          <table className="table">
            <tbody>
              {mobxStore.trDetails?.map((item, i) => (
                <tr key={i}>
                  <td>{item.Text}</td>
                  <td>{item.Result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        onClose={handleCloseModal}
      />
    </>
  )
});

export default Details
