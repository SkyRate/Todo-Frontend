import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { AddTask } from "./components/addTask/AddTask";
import { TaskArea } from "./components/taskArea/TaskArea";
import { FooterBar } from "./components/footerBar/FooterBar";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { Todo } from "./types/todo.interface";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<Todo[]> = await axios.get(
        "http://localhost:4200/todo"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
      message.error("Не удалось получить задачи. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const response: AxiosResponse<Todo> = await axios.post(
        "http://localhost:4200/todo",
        { text }
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      message.error("Не удалось добавить задачу. Попробуйте снова.");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const response: AxiosResponse<{ completed: boolean }> = await axios.put(
        `http://localhost:4200/todo/${id}`,
        {
          completed,
        }
      );
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: response.data.completed } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      message.error("Не удалось обновить все задачи. Попробуйте снова.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4200/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      message.error("Не удалось удалить задачу. Попробуйте снова.");
    }
  };

  const deleteAllTodos = async () => {
    try {
      await axios.delete("http://localhost:4200/todo");
      setTodos([]);
    } catch (error) {
      console.error("Ошибка при удалении всех задач:", error);
      message.error("Не удалось удалить все задачи. Попробуйте снова.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Todo list</h1>
        <AddTask addTodo={addTodo} />
        <TaskArea
          todo={todos}
          isLoading={isLoading}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
        <FooterBar count={todos.length} deleteAllTodos={deleteAllTodos} />
      </div>
    </div>
  );
}

export default App;
