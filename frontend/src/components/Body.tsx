import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";
import Details from "./Details";

const Body: React.FC = observer(() => {

  const handleMouseOver = (id: string) => {
    const elements = document.getElementsByClassName(id);
    Array.from(elements).forEach((el) => el.classList.add("tr-mouse-hover"));
  };

  const handleMouseLeave = (id: string) => {
    const elements = document.getElementsByClassName(id);
    Array.from(elements).forEach((el) => el.classList.remove("tr-mouse-hover"));
  };

  return (
    <>
      {mobxStore.trBlock?.map((block, k) => (
      <div key={k} className="row">
        <div className="col-md">
          <div className="tr-text">{block?.map((item, i) => (
            <span key={i} className={item.ID} onMouseOver={() => handleMouseOver(item.ID)} onMouseLeave={() => handleMouseLeave(item.ID)}>
              <Details text={item.Text}></Details>
            </span>
          ))}</div>
        </div>
        <div className="col-md">
          <div className="tr-text">{block?.map((item, j) => (
            <span key={j} className={item.ID} onMouseOver={() => handleMouseOver(item.ID)} onMouseLeave={() => handleMouseLeave(item.ID)}>{item.Result}</span>
          ))}</div>
        </div>
      </div>
      ))}
    </>
  )
});

export default Body
