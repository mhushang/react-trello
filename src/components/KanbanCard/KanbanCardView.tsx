import { useState } from "react";
import { IStateProps } from "./model";
import "./KanbanCard.css";

export const KanbanCardView: React.FC<IStateProps> = ({
    dragStartHandler,
    onDragOverHandler,
    handleEditCard,
    id,
    title,
}) => {
  const [isEditTitle, setEditTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  const handleEditCardTitle = () => {
    handleEditCard(cardTitle);
    setEditTitle(false);
  }

  return (
    <div
      id={id}
      className="card"
      draggable="true"
      onDragStart={dragStartHandler}
      onDragOver={onDragOverHandler}
    >
      <div className="card-title">
        {isEditTitle ? (
          <div className="cards-textarea-field">
            <textarea
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              placeholder="title"
            />
            <button onClick={handleEditCardTitle}>V</button>
            <button onClick={() => setEditTitle(false)}>X</button>
          </div>
        ) : (
          <div onClick={() => setEditTitle(true)}>{title}</div>
        )}
      </div>
    </div>
  );
};
