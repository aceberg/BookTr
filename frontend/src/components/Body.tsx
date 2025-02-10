import { useEffect, useState } from "react";
import { apiTranslate } from "../functions/api";
import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";

const Body: React.FC = observer(() => {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const getResult = async () => {
    await apiTranslate(text);
    setResult(mobxStore.trResult);
  }

  useEffect(() => {
    setText("React components receive data and return what should appear on the screen. You can pass them new data in response to an interaction, like when the user types into an input. React will then update the screen to match the new data.");
    
    getResult();
  }, []);

  return (
    <div className="row">
      <div className="col-md">
        <span>{text}</span>
      </div>
      <div className="col-md">
        <span>{result}</span>
      </div>
    </div>
  )
});

export default Body
