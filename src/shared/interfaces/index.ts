import { ActionType } from "../constants";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface IColumn {
  id: number;
  tasks: Array<ITask>;
  label: string;
}

export interface IInitialState {
  columns: Array<IColumn>;
}

export interface IAction {
  type: ActionType;
  columns: Array<IColumn>;
}

export interface IAppContext {
  state: IInitialState;
  dispatch: React.Dispatch<IAction>;
}
