export interface IModel {
    id:string;
    taskStatus: string;
    title: string;
}

export interface IStateProps extends IModel {
    dragStartHandler: (e: any) => void,
    onDragOverHandler: (e: any) => void,
    handleEditCard: (cardTitle: string) => void,
}
