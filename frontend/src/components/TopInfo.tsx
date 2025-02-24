import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";

const TopInfo: React.FC = observer(() => {

  return (
    <div className="opacity-50" style={{
      position: "absolute",
      top: "30px",
      left: "50%",
      textAlign: "center",
      transform: "translate(-50%, -50%)",
    }}>
      <div>{mobxStore.topInfoBlock.Text}</div>
      <div>{mobxStore.topInfoBlock.Note}</div>
    </div>
  );
});

export default TopInfo;
