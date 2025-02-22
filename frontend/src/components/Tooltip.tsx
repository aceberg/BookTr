import { observer } from "mobx-react-lite";
import mobxStore from "../functions/mobx-store";

const Tooltip:React.FC = observer(() => { 

  return (
    <>
      {mobxStore.tooltipText !== '' && (
      <div style={{
        textAlign: "center", 
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#000000da",
        color: "white",
        padding: "10px 15px",
        borderRadius: "4px",
      }}>
          {mobxStore.tooltipText}
      </div>
      )}
    </>
  )
});

export default Tooltip
