import React, { useState } from "react";
import { IStateProps } from "./model";

import "./KanbanBoard.css";
import { KanbanCard } from "../KanbanCard";

export const KanbanBoardView: React.FC<IStateProps> = ({
  title,
  handleChangeColumnTitle,
  onCardChange,
  taskStatus,
  tasksList
}) => {
  const [isEditLabel, setEditLabel] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  let sorted = tasksList && tasksList.sort((a, b) => a.order - b.order);

  const handleEditColumnTitle = () => {
    handleChangeColumnTitle(columnTitle);
    setEditLabel(false);
  };

  const onDragEnterHandler = (e: any) => {
    e.preventDefault();
  };

  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea") {
      setTimeout(() => {
        e.target.className = "boardContentArea hovered";
      }, 0);
    }
  };

  const onDragLeaveHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  };

  const onDropHandler = (e: any) => {
    let cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    let targetCardId = e.target.id;
    onCardChange(cardInfo, taskStatus, targetCardId);
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  };

  const renderCards = () => {
    return sorted && sorted.map((item) => (
      <KanbanCard
        key={`taskStatus-${item.id}`}
        id={item.id}
        taskStatus={taskStatus}
        title={item.title}
        label={item.description}
      />
    ));
  };

  return (
    <main className="kanban-board">
      <div className="kanban-board-body">

        <div
          className="boardContentArea"
          onDragEnter={onDragEnterHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >

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

          <div className="cards-list">{renderCards()}</div>
        </div>
      </div>
    </main>
  );
};
