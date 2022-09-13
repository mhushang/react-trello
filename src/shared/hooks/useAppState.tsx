import { useContext } from "react";
import { AppContext } from "../store";

export const useAppState = () => {
  return useContext(AppContext);
};
