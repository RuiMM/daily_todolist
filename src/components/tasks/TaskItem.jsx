import React from "react";
import "../../styles/components/tasks/TaskItem.css";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? "completed" : ""}>
          {task.content}
        </span>
      </div>
      <div className="task-actions">
        <span className="task-user">- {task.user}</span>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          删除
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
