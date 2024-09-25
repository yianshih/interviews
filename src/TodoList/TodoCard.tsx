import React from "react";
import { Todo, TodoStatus } from "./types";

export interface TodoCardProps extends Todo {
  onStart: (id: number) => void;
  onCancel: (id: number) => void;
}

const StatusButton: Record<
  TodoStatus,
  (data: TodoCardProps) => React.ReactNode
> = {
  [TodoStatus.Active]: ({ id, onStart }) => (
    <button onClick={() => onStart(id)}>Start</button>
  ),
  [TodoStatus.Completed]: ({ id }) => null,
  [TodoStatus.InProgress]: ({ id, onCancel }) => (
    <button onClick={() => onCancel(id)}>Cancel</button>
  ),
  [TodoStatus.Deleted]: ({ id, onStart }) => (
    <button onClick={() => onStart(id)}>Restart</button>
  ),
};

const TodoCard = (props: TodoCardProps) => {
  const { name, status } = props;

  const button = StatusButton[status](props);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div>{name}</div>
      <div style={{ color: "red" }}>{status}</div>
      {button}
    </div>
  );
};

export default React.memo(
  TodoCard
  //   (prev, next) => prev.status === next.status
);
