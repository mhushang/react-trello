export interface IModel {
    title: string;
    id: number;
}

export interface IStateProps extends IModel {
    handleChangeColumnTitle: (title: string) => void;
}
