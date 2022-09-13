import { IColumn, ITasks } from "../../shared/interfaces";

export interface IModel {}

export interface IStateProps extends IModel {
    columns: Array<IColumn>;
    tasksList: ITasks;
    handleAddNewColumn: () => void;
}
