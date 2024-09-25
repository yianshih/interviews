export enum TodoStatus {
  Active = "Active",
  InProgress = "InProgress",
  Completed = "Completed",
  Deleted = "Deleted",
}

export interface Todo {
  name: string;
  id: number;
  status: TodoStatus;
}
