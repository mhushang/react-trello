import { createContext, useReducer, FC, ReactNode, useMemo } from "react";
import { IAppContext, IInitialState } from "../interfaces";
import { dashboardReducer } from "./reducers";

const initialState: IInitialState = {
  columns: [
    {
      id: "1-a",
      title: "To do",
      taskStatus: "todo",
    },
    {
      id: "1-b",
      title: "In progress",
      taskStatus: "inProgress",
    },
  ],
  tasks: {
    todo: [
      {
        id: "1-c",
        title: "Create Trello Clone",
        taskStatus: "todo",
        order: 1,
        description: "Woo Hoo 1",
      },
      {
        id: "1-d",
        title: "Create Trello Clone 2",
        taskStatus: "todo",
        order: 2,
        description: "Woo Hoo 2",
      },
    ],
    inProgress: [
      {
        id: "1-e",
        title: "Create Trello Clone 3",
        taskStatus: "todo",
        order: 3,
        description: "Woo Hoo 3",
      },
    ]
  },
};

const AppContext = createContext<IAppContext>({
  state: {
    ...initialState,
  },
  dispatch: () => {},
});

const ContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  // We need to memoize array value. Else all context consumers update on every render
  const store = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export { AppContext, ContextProvider, initialState };
