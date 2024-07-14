import React from "react";
import { Checkbox } from "antd";

import styles from "./TaskArea.module.scss";

import { DeleteOutlined } from "@ant-design/icons";
import { TaskAreaProps } from "../../types/todo.interface";

export const TaskArea: React.FC<TaskAreaProps> = ({
  todo,
  isLoading,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className={styles.wrapper}>
          {todo.map((item, id) => (
            <div
              className={`${styles.taskArea} ${
                item.completed ? styles.completed : ""
              }`}
              key={item._id}
            >
              <Checkbox
                onClick={() => toggleTodo(item._id, !item.completed)}
                checked={item.completed}
              />
              <div className={`${item.completed ? styles.completed : ""}`}>
                {item.text}
              </div>
              <div
                className={styles.dropDown}
                onClick={() => deleteTodo(item._id)}
              >
                <DeleteOutlined />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
