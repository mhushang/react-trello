import { ActionType } from "../constants";

export interface ITask {
  id: string;
  title: string;
  taskStatus: string;
  order: number;
  description: string;
}
export interface ITasks {
  [k: string]: Array<ITask>;
}

export interface IColumn {
  id: string;
  title: string;
  taskStatus: string;
}

export interface IInitialState {
  columns: Array<IColumn>;
  tasks: ITasks;
}

export interface IAction {
  type: ActionType;
  columns?: Array<IColumn>;
  tasks?: ITasks;
  columnStatus?: string;
}

export interface IAppContext {
  state: IInitialState;
  dispatch: React.Dispatch<IAction>;
}
