import { IModel, IStateProps } from "./model";
import { KanbanBoardView } from "./KanbanBoardView";
import { useAppState } from "../../shared/hooks";
import { ActionType } from "../../shared/constants";

export const KanbanBoard: React.FC<IModel> = (props) => {
  const { state, dispatch } = useAppState();
  const { columns, tasks } = state;

  const findAndEditColumnTitle = (title: string) => {
    return columns.map(column => {
      if (column.id === props.id) {
        column.title = title; 
      }

      return column;
    });
  }

  const handleChangeColumnTitle = (title: string) => {
    dispatch({
      type: ActionType.EDIT_COLUMN_TITLE,
      columns: findAndEditColumnTitle(title),
    })
  }

  const stateProps: IStateProps = {
    ...props,
    handleChangeColumnTitle,
  };
  return KanbanBoardView(stateProps);
};
