import React, { useState } from "react";
import { ActionType } from "../../shared/constants";
import { useAppState } from "../../shared/hooks";

export const KanbanCard = ({ id, taskStatus, title, label }: any) => {
  const [onHold, setOnHold] = useState(false);
  const [isEditTitle, setEditTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const { state, dispatch } = useAppState();

  const dragStartHandler = (e: any) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify({ id, taskStatus }));
    e.target.className += " ohhold";
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };
  const dragEndHandler = () => {
    setOnHold(false);
  };
  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "card") {
      setTimeout(() => {
        e.target.className = "card anotherCardOnTop";
      }, 0);
    }
  };
  const onDragLeaveHandler = (e: any) => {
    resetClassName(e);
  };
  const onDropHandler = (e: any) => {
    resetClassName(e);
  };

  const resetClassName = (e: any) => {
    e.preventDefault();
    let isCard =
      e.target.className === "card" ||
      e.target.className === "card anotherCardOnTop";
    if (isCard) {
      setTimeout(() => {
        e.target.className = "card";
      }, 0);
    }
  };

  const handleEditCard = () => {
    let taskStaged = state.tasks[taskStatus].map((task) => {
      if (task.id === id) {
        task.title = cardTitle
      } 
      return task;
    });

    dispatch({
      type: ActionType.EDIT_CARD,
      tasks: {
        ...state.tasks,
        [taskStatus]: [
          ...state.tasks[taskStatus],
          ...taskStaged,
        ]
      }
    })
    setEditTitle(false);
  };

  return (
    <div
      id={id}
      className={`card ${onHold ? "hidden" : ""}`}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <div className="cardTitle">
        {isEditTitle ? (
          <div>
            <textarea
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              placeholder="title"
            />
            <button onClick={handleEditCard}>V</button>
            <button onClick={() => setEditTitle(false)}>X</button>
          </div>
        ) : (
          <div onClick={() => setEditTitle(true)}>{title}</div>
        )}
      </div>
      <div className="cardFooter">
        {label ? <div className={`label`}>{label}</div> : <div></div>}

        <div className="collab">
          <a href="" className="collabPerson">
            <i className="fas fa-user"></i>
          </a>
          <a href="" className="collabPerson">
            <i className="fas fa-user"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
