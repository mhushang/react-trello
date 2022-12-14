import { IModel, IStateProps } from "./model";
import { KanbanBoardView } from "./KanbanBoardView";
import { useAppState } from "../../shared/hooks";
import { ActionType } from "../../shared/constants";

export const KanbanBoard: React.FC<IModel> = (props) => {
  const { state, dispatch } = useAppState();
  const { columns } = state;

  const findAndEditColumnTitle = (title: string) => {
    return columns.map((column) => {
      if (column.id === props.id) {
        column.title = title;
      }

      return column;
    });
  };

  const handleChangeColumn = (title: string) => {
    dispatch({
      type: ActionType.EDIT_COLUMN,
      columns: findAndEditColumnTitle(title),
    });
  };

  const handleAddCard = (title: string, columnStatus: string) => {
    dispatch({
      type: ActionType.ADD_CARD,
      tasks: {
        [columnStatus]: [
          {
            id: `id-${Math.random()}`,
            title,
            taskStatus: columnStatus,
            order: 99,
            description: "",
          },
        ],
      },
      columnStatus,
    });
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    if (e.target.className === "drag-and-drop-zone") {
      setTimeout(() => {
        e.target.className = "drag-and-drop-zone hovered";
      }, 0);
    }
  };

  const onDrop = (e: any) => {
    let cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    let targetCardId = e.target.id;
    props.onCardChange(cardInfo, props.taskStatus, targetCardId);
  };


  const stateProps: IStateProps = {
    ...props,
    handleChangeColumn,
    handleAddCard,
    onDragOver,
    onDrop,
  };
  return KanbanBoardView(stateProps);
};
