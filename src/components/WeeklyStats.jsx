import { endOfWeek, format, startOfWeek } from 'date-fns';
import React from 'react';

const WeeklyStats = ({ tasks }) => {
  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);

  // 过滤本周任务
  const weekTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= weekStart && taskDate <= weekEnd;
  });

  // 按用户统计完成任务数
  const userStats = weekTasks.reduce((stats, task) => {
    if (!stats[task.user]) {
      stats[task.user] = {
        total: 0,
        completed: 0
      };
    }
    stats[task.user].total += 1;
    if (task.completed) {
      stats[task.user].completed += 1;
    }
    return stats;
  }, {});

  return (
    <div className="weekly-stats">
      <h2>本周统计 ({format(weekStart, 'MM/dd')} - {format(weekEnd, 'MM/dd')})</h2>
      {Object.entries(userStats).map(([user, stats]) => (
        <div key={user} className="user-stats">
          <h3>{user}</h3>
          <p>总任务数: {stats.total}</p>
          <p>已完成: {stats.completed}</p>
          <p>完成率: {((stats.completed / stats.total) * 100).toFixed(1)}%</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyStats; 