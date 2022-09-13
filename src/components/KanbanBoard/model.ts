import { ITask } from "../../shared/interfaces";

export interface IModel {
    title: string;
    id: string;
    onCardChange: (cardInfo: ITask, newStatus: string, targetCardId: string) => void;
    tasksList: Array<ITask>;
    taskStatus: string;
}

export interface IStateProps extends IModel {
    handleChangeColumnTitle: (title: string) => void;
}
