import { useEffect, useState } from "react";
import { IModel, IStateProps } from "./model";
import { DashboardView } from "./DashboardView";
import { useAppState } from "../../shared/hooks";
import { ActionType } from "../../shared/constants";
import { ITask } from "../../shared/interfaces";

export const Dashboard: React.FC<IModel> = (props) => {
  const { state, dispatch } = useAppState();
  const { columns, tasks } = state;
  const [tasksList, setTasksList] = useState(tasks);

  const handleAddNewColumn = () => {
    dispatch({
      type: ActionType.ADD_COLUMN,
      columns: [
        {
          id: `id-${Math.random()}`,
          title: "New",
          taskStatus: `new-${Math.random()}`,
        },
      ],
    });
  };

  const handleCardChange = (
    cardInfo: ITask,
    newStatus: string,
    targetCardId: string
  ) => {
    const { id, taskStatus: oldStatus } = cardInfo;

    let dropCard = tasksList[oldStatus].find((task) => task.id === id);
    let targetCard =
      targetCardId !== ""
        ? tasksList[newStatus].find((task) => task.id === targetCardId)
        : null;

    let newListOrderValueMax =
      tasksList &&
      tasksList[newStatus] &&
      tasksList[newStatus]
        .map((item) => item.order)
        .reduce((maxValue, acc) => Math.max(maxValue, acc), 0);

    if (oldStatus === newStatus) {
      let temp = tasksList[oldStatus]
        .map((item) => {
          if (item.id === dropCard!.id)
            return {
              ...dropCard,
              order: targetCard
                ? targetCard.order - 1
                : newListOrderValueMax + 1,
            };
          return item;
        })
        .sort((a, b) => a.order - b.order)
        .map((item: any, i) => {
          return { ...item, order: i + 1 };
        });

        const tasksMoved = {
          ...tasksList,
          [oldStatus]: temp,
        }
        dispatch({
          type: ActionType.DROP_CARD,
          tasks: tasksMoved
        });
      return;
    }

    let tempGaveList = tasksList[oldStatus]
      .filter((item) => item.id !== id)
      .sort((a, b) => a.order - b.order)
      .map((item: any, i) => {
        return { ...item, order: i + 1 };
      });

    let tempRecievedList = [
      ...((tasksList && tasksList[newStatus]) || []),
      {
        ...dropCard,
        order: targetCard ? targetCard.order - 1 : newListOrderValueMax + 1,
      },
    ]
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

      const tasksMoved = {
        ...tasksList,
        [oldStatus]: tempGaveList, [newStatus]: tempRecievedList
      }
      dispatch({
        type: ActionType.DROP_CARD,
        tasks: tasksMoved
      });
  };

  useEffect(() => {
    setTasksList(tasks);
  }, [tasks]);

  const stateProps: IStateProps = {
    ...props,
    columns,
    tasksList,
    handleAddNewColumn,
    handleCardChange,
  };
  return DashboardView(stateProps);
};
