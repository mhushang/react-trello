import React, { useState } from "react";
import { IStateProps } from "./model";
import { KanbanCard } from "../KanbanCard";

import "./KanbanBoard.css";

export const KanbanBoardView: React.FC<IStateProps> = ({
  title,
  handleChangeColumn,
  taskStatus,
  tasksList,
  handleAddCard,
  onDragOver,
  onDrop,
}) => {
  const [isEditLabel, setEditLabel] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const [isAddCard, setAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  let tasksSorted = tasksList && tasksList.sort((a, b) => a.order - b.order);

  const handleEditColumn = () => {
    handleChangeColumn(columnTitle);
    setEditLabel(false);
  };

  const handleAddNewCard = () => {
    handleAddCard(cardTitle, taskStatus);
    setAddCard(false);
    setCardTitle("");
  };

  const cancelAddNewCard = () => {
    setAddCard(false);
    setCardTitle("");
  };

  return (
    <main className="kanban-board">
      <div className="kanban-board-body">
        <div
          className="drag-and-drop-zone"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <div className="kanban-board-item">
            {isEditLabel ? (
              <div className="cards-titlearea-field">
                <input
                  value={columnTitle}
                  onChange={(e) => setColumnTitle(e.target.value)}
                  placeholder="title"
                />
                <button onClick={handleEditColumn}>V</button>
                <button onClick={() => setEditLabel(false)}>X</button>
              </div>
            ) : (
              <div className="column-title" onClick={() => setEditLabel(true)}>
                {title}
              </div>
            )}
          </div>

          <div className="cards-list">
            {tasksSorted &&
              tasksSorted.map((task) => (
                <KanbanCard
                  key={`taskStatus-${task.id}`}
                  id={task.id}
                  taskStatus={taskStatus}
                  title={task.title}
                />
              ))}
          </div>
          {isAddCard ? (
            <div className="cards-textarea-field">
              <textarea
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <button onClick={handleAddNewCard}>V</button>
              <button onClick={cancelAddNewCard}>X</button>
            </div>
          ) : (
            <div className="cards-action-btn" onClick={() => setAddCard(true)}>
              + Add a card
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
