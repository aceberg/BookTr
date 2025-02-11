import { useEffect } from "react";
import { apiTranslate } from "../functions/api";
import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";

const Body: React.FC = observer(() => {

  const getResult = async () => {
    await apiTranslate(mobxStore.trText);
    console.log("RESULT", mobxStore.trResult);
  }

  useEffect(() => {
    mobxStore.setUpdTr(false);
    getResult();
  }, [mobxStore.updTr]);

  return (
    <div className="row">
      <div className="col-md">
        <div className="tr-text">{mobxStore.trText}</div>
      </div>
      <div className="col-md">
        <div className="tr-text">{mobxStore.trResult}</div>
      </div>
    </div>
  )
});

export default Body
