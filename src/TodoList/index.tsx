import { useState } from "react";
import { Todo, TodoStatus } from "./types";
import TodoCard, { TodoCardProps } from "./TodoCard";

const MockTodoList: Todo[] = [
  {
    id: 1,
    name: "Learn React",
    status: TodoStatus.Active,
  },
  {
    id: 2,
    name: "Learn TypeScript",
    status: TodoStatus.Active,
  },
  {
    id: 3,
    name: "Learn GraphQL",
    status: TodoStatus.Active,
  },
];

const TodoList = () => {
  const [items, setItems] = useState<Todo[]>(MockTodoList);

  const itemsWithStartDoing: TodoCardProps[] = items.map((item) => ({
    ...item,
    onStart: (id) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: TodoStatus.InProgress } : item
        )
      );
    },
    onCancel: (id) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: TodoStatus.Active } : item
        )
      );
    },
  }));

  return (
    <div>
      <h1>TodoList</h1>
      {itemsWithStartDoing.map((item) => (
        <TodoCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TodoList;
