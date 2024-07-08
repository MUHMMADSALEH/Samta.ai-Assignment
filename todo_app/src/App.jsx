import React, { useState } from "react";
import "./App.css";
import { Task } from "./component/Task.jsx";

const DeleteAWorkAndUpdate = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };
  const AddTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };

    setTodoList([...todoList, task]);
  };
  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };
  const completedTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: true,
          };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="DeleteAWorkAndUpdate">
      <div>
        <input onChange={handleChange} />
        <button onClick={AddTask}>Add Task</button>
      </div>
      <div className="list">
        {todoList.map((task) => {
          return (
            <Task
              taskName={task.taskName}
              id={task.id}
              completed={task.completed}
              completedTask={completedTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DeleteAWorkAndUpdate;
