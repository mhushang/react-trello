import React, { useState } from "react";
import { IStateProps } from "./model";

import "./KanbanBoard.css";

export const KanbanBoardView: React.FC<IStateProps> = ({
  title,
  handleChangeColumnTitle,
}) => {
  const [isEditLabel, setEditLabel] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const handleEditColumnTitle = () => {
    handleChangeColumnTitle(columnTitle);
    setEditLabel(false);
  }

  return (
    <main className="kanban-board">
      <div className="kanban-board-body">
        <div className="kanban-board-item">
          {isEditLabel ? (
            <div>
              <input
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
              />
              <button onClick={handleEditColumnTitle}>V</button>
              <button onClick={() => setEditLabel(false)}>X</button>
            </div>
          ) : (
            <div onClick={() => setEditLabel(true)}>{title}</div>
          )}
        </div>
      </div>
    </main>
  );
};
