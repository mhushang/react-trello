import { ActionType } from "../../constants";
import { IAction, IInitialState } from "../../interfaces";

export const dashboardReducer = (state: IInitialState, action: IAction) => {
  switch (action.type) {
    case ActionType.ADD_COLUMN: {
      return {
        ...state,
        columns: [...action.columns],
      };
    }
    default:
      throw new Error();
  }
};
