import { useState } from "react";
import { IModel, IStateProps } from "./model";
import { DashboardView } from "./DashboardView";
import { useAppState } from "../../shared/hooks";

export const Dashboard: React.FC<IModel> = (props) => {
  const { state, dispatch } = useAppState();
  const { columns, tasks } = state;
  const [tasksList, setTasksList] = useState(tasks);

  const stateProps: IStateProps = {
    ...props,
    columns,
    tasksList,
  };
  return DashboardView(stateProps);
};
