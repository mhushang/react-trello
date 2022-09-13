import { ActionType } from "../constants";

export interface ITask {
  id: number;
  title: string;
  status: string;
  order: number;
  description: string;
}
export interface ITasks {
  [k: string]: Array<ITask>;
}

export interface IColumn {
  id: number;
  title: string;
  status: string;
}

export interface IInitialState {
  columns: Array<IColumn>;
  tasks: ITasks;
}

export interface IAction {
  type: ActionType;
  columns: Array<IColumn>;
}

export interface IAppContext {
  state: IInitialState;
  dispatch: React.Dispatch<IAction>;
}
