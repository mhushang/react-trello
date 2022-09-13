import { ActionType } from "../../constants";
import { IAction, IInitialState } from "../../interfaces";

export const dashboardReducer = (state: IInitialState, action: IAction) => {
  switch (action.type) {
    case ActionType.ADD_COLUMN: {
      return {
        ...state,
        columns: [...state.columns, ...(action.columns || [])],
      };
    }
    case ActionType.EDIT_COLUMN: {
      return {
        ...state,
        columns: [...(action.columns || [])],
      };
    }
    case ActionType.ADD_CARD: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.columnStatus || ""]: [
            ...((state &&
              state.tasks &&
              state.tasks[action.columnStatus || ""]) ||
              []),
            ...((action &&
              action.tasks &&
              action.tasks[action.columnStatus || ""]) ||
              []),
          ],
        },
      };
    }
    case ActionType.DROP_CARD: {
      return {
        ...state,
        tasks: {
          ...action.tasks,
        },
      };
    }
    case ActionType.EDIT_CARD: {
      return {
        ...state,
        ...action.tasks,
      };
    }
    default:
      throw new Error();
  }
};
