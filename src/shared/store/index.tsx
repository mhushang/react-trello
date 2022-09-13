import { createContext, useReducer, FC, ReactNode, useMemo } from "react";
import { IAppContext, IInitialState } from "../interfaces";
import { dashboardReducer } from "./reducers";

const initialState: IInitialState = {
  columns: [
    {
      id: 1,
      title: "To do",
      status: "todo",
    },
    {
      id: 2,
      title: "In progress",
      status: "inProgress",
    },
  ],
  tasks: {
    todo: [
      {
        id: 1,
        title: "Create Trello Clone",
        status: "todo",
        order: 1,
        description: "Woo Hoo",
      },
    ],
  },
};

const AppContext = createContext<IAppContext>({
  state: {
    ...initialState
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
