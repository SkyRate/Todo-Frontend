import React, { useState } from "react";
import { Input, Button, message } from "antd";

import { AddTaskProps } from "../../types/todo.interface";

import styles from "./AddTask.module.scss";

export const AddTask: React.FC<AddTaskProps> = ({ addTodo }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTask = () => {
    if (!newTodoText.trim()) {
      message.error("Please enter a task!");
    } else {
      addTodo(newTodoText);
      setNewTodoText("");
    }
  };

  return (
    <div className={styles.row}>
      <Input
        placeholder="Task..."
        className={styles.input}
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <Button className={styles.button} onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};
