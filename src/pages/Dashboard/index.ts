import { useState } from "react";
import { IModel, IStateProps } from "./model";
import { DashboardView } from "./DashboardView";
import { useAppState } from "../../shared/hooks";
import { ActionType } from "../../shared/constants";

export const Dashboard: React.FC<IModel> = (props) => {
  const { state, dispatch } = useAppState();
  const { columns, tasks } = state;
  const [tasksList, setTasksList] = useState(tasks);

  const handleAddNewColumn = () => {
    dispatch({
      type: ActionType.ADD_COLUMN,
      columns: [{
        id: Math.random(),
        title: 'New',
        status: `new-${Math.random()}`,
      }]
    })
  }

  const stateProps: IStateProps = {
    ...props,
    columns,
    tasksList,
    handleAddNewColumn,
  };
  return DashboardView(stateProps);
};
