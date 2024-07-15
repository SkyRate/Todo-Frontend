
 import React, { useState } from "react";
 import { Checkbox, Dropdown, Space, Modal, Button, Input } from "antd";
 import {
   DeleteOutlined,
   EditOutlined,
   EllipsisOutlined,
 } from "@ant-design/icons";
 import styles from "./TaskArea.module.scss";
 import { TaskAreaProps, Todo } from "../../types/todo.interface";
 import EditTodoModal from "../editTodoModal/EditTodoModal";
 
 export const TaskArea: React.FC<TaskAreaProps> = ({
   todo,
   isLoading,
   toggleTodo,
   deleteTodo,
   editTodo,
 }) => {
   const [editText, setEditText] = useState("");
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [currentItem, setCurrentItem] = useState<Todo | null>(null);
 
   const showModal = (item: Todo) => {
     setCurrentItem(item);
     setIsModalVisible(true);
     setEditText(item.text);
   };
 
   const handleOk = () => {
     setIsModalVisible(false);
   };
 
   const handleCancel = () => {
     setIsModalVisible(false);
   };
 
   const getMenuItems = (item: Todo) => [
     {
       label: (
         <div className={styles.dropMenuItem} onClick={() => showModal(item)}>
           <EditOutlined /> Edit
         </div>
       ),
       key: "0",
     },
     {
       label: (
         <div
           className={styles.dropMenuItem}
           onClick={() => deleteTodo(item._id)}
         >
           <DeleteOutlined /> Delete
         </div>
       ),
       key: "1",
     },
   ];
 
   return (
     <>
       {isLoading ? (
         "Loading..."
       ) : (
         <div className={styles.wrapper}>
           {todo.map((item) => (
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
               <Dropdown
                 menu={{ items: getMenuItems(item) }}
                 trigger={["click"]}
               >
                 <a onClick={(e) => e.preventDefault()}>
                   <Space>
                     <EllipsisOutlined className={styles.openMenu} />
                   </Space>
                 </a>
               </Dropdown>
             </div>
           ))}
         </div>
       )}
       <EditTodoModal
         isModalVisible={isModalVisible}
         handleOk={handleOk}
         handleCancel={handleCancel}
         editText={editText}
         setEditText={setEditText}
         currentItem={currentItem}
         editTodo={editTodo}
       />
     </>
   );
 };