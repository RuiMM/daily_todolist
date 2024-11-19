import React, { useState } from "react";
import TaskList from "../components/tasks/TaskList";
import WeeklyStats from "../components/tasks/WeeklyStats";
import { useTasks } from "../hooks/useTasks";
import "../styles/pages/TodoPage.css";

const TodoPage = () => {
  const [newTask, setNewTask] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const { tasks, loading, error, addTask, toggleTaskStatus, removeTask } =
    useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim() || !currentUser.trim()) return;

    await addTask({
      content: newTask,
      date: new Date(),
      user: currentUser,
      completed: false,
    });
    setNewTask("");
  };

  // 按用户分组任务
  const groupTasksByUser = (tasks) => {
    return tasks.reduce((groups, task) => {
      if (!groups[task.user]) {
        groups[task.user] = [];
      }
      groups[task.user].push(task);
      return groups;
    }, {});
  };

  const userGroupedTasks = groupTasksByUser(tasks);

  if (loading) return <div className="loading-spinner">加载中...</div>;
  if (error) return <div className="error-message">错误: {error}</div>;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Daily TodoList</h1>
      </div>

      <div className="user-input">
        <input
          type="text"
          placeholder="输入用户名"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="添加新任务"
        />
        <button type="submit">添加</button>
      </form>

      <WeeklyStats tasks={tasks} />

      <div className="users-tasks">
        {Object.entries(userGroupedTasks).map(([user, userTasks]) => (
          <div key={user} className="user-tasks-group">
            <h2 className="user-tasks-header">
              {user} 的任务
              <span className="task-count">
                ({userTasks.filter((t) => !t.completed).length} 待完成 /{" "}
                {userTasks.length} 总数)
              </span>
            </h2>
            <TaskList
              tasks={userTasks}
              onToggleTask={toggleTaskStatus}
              onDeleteTask={removeTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
