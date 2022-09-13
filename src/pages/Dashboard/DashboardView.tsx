import React from "react";
import { IStateProps } from "./model";
import { KanbanBoard } from "../../components";

import "./Dashboard.css";

export const DashboardView: React.FC<IStateProps> = ({
  columns,
  tasksList,
  handleAddNewColumn,
  handleCardChange,
}) => {
  return (
    <main className="dashboard">
      <div className="dashboard-body">
        <div className="columns">
          {columns.map((column) => (
            <KanbanBoard
              id={column.id}
              key={column.id}
              title={column.title}
              tasksList={tasksList[column.taskStatus]}
              taskStatus={column.taskStatus}
              onCardChange={handleCardChange}
            />
          ))}
          <div>
            <button onClick={handleAddNewColumn}>+ Add nanother list</button>
          </div>
        </div>
      </div>
    </main>
  );
};
