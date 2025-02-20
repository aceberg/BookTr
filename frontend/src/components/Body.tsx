import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";
import { apiTranslate } from "../functions/api";
import { useState } from "react";

const Body: React.FC = observer(() => {

  const [tooltipText, setTooltipText] = useState('');

  const handleMouseOver = (id: string) => {
    const elements = document.getElementsByClassName(id);
    Array.from(elements).forEach((el) => el.classList.add("tr-mouse-hover"));
  };

  const handleMouseLeave = (id: string) => {
    const elements = document.getElementsByClassName(id);
    Array.from(elements).forEach((el) => el.classList.remove("tr-mouse-hover"));
  };

  const handleTextClick = async () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const str = selection.toString();
      const res = await apiTranslate(str);
      setTooltipText(res);
      setTimeout(() => {
        setTooltipText('');
    }, 3000); // 3 seconds
    }
};

  return (
    <>
      {mobxStore.trBlock?.map((block, k) => (
      <div key={k} className="row">
        <div className="col-md">
          <div className="tr-text">{block?.map((item, i) => (
            <span key={i} className={item.ID} onMouseOver={() => handleMouseOver(item.ID)} onMouseLeave={() => handleMouseLeave(item.ID)} onMouseUp={handleTextClick}>{item.Text}</span>
          ))}</div>
        </div>
        <div className="col-md">
          <div className="tr-text">{block?.map((item, j) => (
            <span key={j} className={item.ID} onMouseOver={() => handleMouseOver(item.ID)} onMouseLeave={() => handleMouseLeave(item.ID)}>{item.Result}</span>
          ))}</div>
        </div>
      </div>
      ))}
      <div style={{ textAlign: "center", marginTop: "200px" }}>
      {tooltipText !== '' && (
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "black",
        color: "white",
        padding: "10px 15px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        zIndex: 1000,
      }}>
          {tooltipText}
      </div>
      )}
      </div>
    </>
  )
});

export default Body
