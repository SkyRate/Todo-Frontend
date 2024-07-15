export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}
export type TaskAreaProps = {
  todo: Todo[];
  isLoading: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
};
export type FooterBarProps = {
  count: number;
  deleteAllTodos: () => void;
};

export type AddTaskProps = {
  addTodo: (todoText: string) => void;
};
