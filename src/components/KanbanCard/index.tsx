import { IModel, IStateProps } from "./model";
import { KanbanCardView } from "./KanbanCardView";
import { ActionType } from "../../shared/constants";
import { useAppState } from "../../shared/hooks";
import "./KanbanCard.css";

export const KanbanCard: React.FC<IModel> = (props) => {
  const { id, taskStatus } = props;
  const { state, dispatch } = useAppState();

  const dragStartHandler = (e: any) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify({ id, taskStatus }));
  };

  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "card") {
      setTimeout(() => {
        e.target.className = "card hovered";
      }, 0);
    }
  };

  const handleEditCard = (cardTitle: string) => {
    let taskStaged = state.tasks[taskStatus].map((task) => {
      if (task.id === id) {
        task.title = cardTitle;
      }
      return task;
    });

    dispatch({
      type: ActionType.EDIT_CARD,
      tasks: {
        ...state.tasks,
        [taskStatus]: [...state.tasks[taskStatus], ...taskStaged],
      },
    });
  };

  const stateProps: IStateProps = {
    ...props,
    handleEditCard,
    onDragOverHandler,
    dragStartHandler,
  };

  return KanbanCardView(stateProps);
};
