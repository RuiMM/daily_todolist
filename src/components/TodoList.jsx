import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import './TodoList.css';
import WeeklyStats from './WeeklyStats';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const task = {
      content: newTask,
      date: new Date(),
      user: currentUser,
      completed: false
    };

    await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });

    setNewTask('');
    fetchTasks();
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };

  // 按日期分组任务
  const groupedTasks = tasks.reduce((groups, task) => {
    const date = format(new Date(task.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});

  return (
    <div className="todo-container">
      <h1>Daily TodoList</h1>
      
      <div className="user-input">
        <input
          type="text"
          placeholder="输入用户名"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
        />
      </div>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="添加新任务"
        />
        <button type="submit">添加</button>
      </form>

      <WeeklyStats tasks={tasks} />

      <div className="tasks-list">
        {Object.entries(groupedTasks).map(([date, dayTasks]) => (
          <div key={date} className="day-group">
            <h2>{date}</h2>
            {dayTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? 'completed' : ''}>
                    {task.content}
                  </span>
                </div>
                <div className="task-actions">
                  <span className="task-user">- {task.user}</span>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList; 