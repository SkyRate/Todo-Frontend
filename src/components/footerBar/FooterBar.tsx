import React from "react";

import { Button } from "antd";
import { FooterBarProps } from "../../types/todo.interface";

import styles from "./FooterBar.module.scss";

export const FooterBar: React.FC<FooterBarProps> = ({
  count,
  deleteAllTodos,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.countTask}>{count}</div>
        <span>Items Left</span>
      </div>
      <Button onClick={deleteAllTodos} danger>
        Delete all tasks
      </Button>
    </div>
  );
};
