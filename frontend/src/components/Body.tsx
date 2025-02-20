import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";

const Body: React.FC = observer(() => {

  return (
    <>
      {mobxStore.trBlock?.map((block, k) => (
      <div key={k} className="row">
        <div className="col-md">
          <div className="tr-text">{block?.map((item, i) => (
            <span key={i}>{item.Text}</span>
          ))}</div>
        </div>
        <div className="col-md">
          <div className="tr-text">{block?.map((item, j) => (
            <span key={j}>{item.Result}</span>
          ))}</div>
        </div>
      </div>
      ))}
    </>
  )
});

export default Body
