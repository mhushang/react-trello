import React, { useState } from "react";
import { IStateProps } from "./model";

import "./KanbanBoard.css";
import { KanbanCard } from "../KanbanCard";

export const KanbanBoardView: React.FC<IStateProps> = ({
  title,
  handleChangeColumn,
  onCardChange,
  taskStatus,
  tasksList,
  handleAddCard,
}) => {
  const [isEditLabel, setEditLabel] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const [isAddCard, setAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  let sorted = tasksList && tasksList.sort((a, b) => a.order - b.order);

  const handleEditColumn = () => {
    handleChangeColumn(columnTitle);
    setEditLabel(false);
  };

  const handleAddNewCard = () => {
    handleAddCard(cardTitle, taskStatus);
    setAddCard(false);
    setCardTitle("");
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

  const cancelAddNewCard = () => {
    setAddCard(false);
    setCardTitle("");
  }

  const renderCards = () => {
    return (
      sorted &&
      sorted.map((item) => (
        <KanbanCard
          key={`taskStatus-${item.id}`}
          id={item.id}
          taskStatus={taskStatus}
          title={item.title}
          label={item.description}
        />
      ))
    );
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
                  placeholder="title"
                />
                <button onClick={handleEditColumn}>V</button>
                <button onClick={() => setEditLabel(false)}>X</button>
              </div>
            ) : (
              <div onClick={() => setEditLabel(true)}>{title}</div>
            )}
          </div>

          <div className="cards-list">{renderCards()}</div>
          {isAddCard ? (
            <div>
              <textarea
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <button onClick={handleAddNewCard}>V</button>
              <button onClick={cancelAddNewCard}>X</button>
            </div>
          ) : (
            <div className="cards-list" onClick={() => setAddCard(true)}>
              + Add a card
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
