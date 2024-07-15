import React from "react";
import { Modal, Button, Input } from "antd";
import { Todo } from "../../types/todo.interface"; // Предполагаемый путь к типу Todo

interface EditTodoModalProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  editText: string;
  setEditText: (text: string) => void;
  currentItem: Todo | null;
  editTodo: (id: string, text: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  editText,
  setEditText,
  currentItem,
  editTodo,
}) => {
  return (
    <Modal
      title="Edit Todo"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            if (currentItem) {
              editTodo(currentItem._id, editText);
              handleOk();
            }
          }}
        >
          Save
        </Button>,
      ]}
    >
      {currentItem && (
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onPressEnter={() => {
            if (currentItem) {
              editTodo(currentItem._id, editText);
              handleOk();
            }
          }}
        />
      )}
    </Modal>
  );
};

export default EditTodoModal;
