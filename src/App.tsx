import { useEffect } from "react";
import { useAppState } from "./shared/hooks";
import { ActionType } from "./shared/constants";
import "./App.css";

function App() {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  return (
    <div className="App">
      Hi,
      <button
        onClick={() =>
          dispatch({
            type: ActionType.ADD_COLUMN,
            columns: [{ id: 1, label: "Hi", tasks: [] }],
          })
        }
      >
        Add
      </button>
      <button>Remove</button>
    </div>
  );
}

export default App;
