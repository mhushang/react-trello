import { createContext, useReducer, FC, ReactNode, useMemo } from "react";
import { IAppContext, IInitialState } from "../interfaces";
import { dashboardReducer } from "./reducers";

const AppContext = createContext<IAppContext>({
  state: {
    columns: [],
  },
  dispatch: () => {},
});

const initialState: IInitialState = {
    columns: [],
};

const ContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    initialState
  );
  // We need to memoize array value. Else all context consumers update on every render
  const store = useMemo(() => ({state, dispatch}), [state]);
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export { AppContext, ContextProvider, initialState };
