import { format } from "date-fns";
import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  const groupedTasks = tasks.reduce((groups, task) => {
    const date = format(new Date(task.date), "yyyy-MM-dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});

  return (
    <div className="tasks-list">
      {Object.entries(groupedTasks).map(([date, dayTasks]) => (
        <div key={date} className="day-group">
          <h2>{date}</h2>
          {dayTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
