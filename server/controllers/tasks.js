// 内存存储任务
let tasks = [];

export const getTasks = async (ctx) => {
  ctx.body = tasks;
};

export const createTask = async (ctx) => {
  const { content, user, date } = ctx.request.body;
  
  if (!content || !user) {
    ctx.throw(400, '任务内容和用户名不能为空');
  }

  const task = {
    id: Date.now().toString(),
    content,
    user,
    date: date || new Date().toISOString(),
    completed: false
  };

  tasks.push(task);
  ctx.status = 201;
  ctx.body = task;
};

export const updateTask = async (ctx) => {
  const { id } = ctx.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    ctx.throw(404, '任务未找到');
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...ctx.request.body
  };

  tasks[taskIndex] = updatedTask;
  ctx.body = updatedTask;
};

export const deleteTask = async (ctx) => {
  const { id } = ctx.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    ctx.throw(404, '任务未找到');
  }

  tasks.splice(taskIndex, 1);
  ctx.status = 204;
}; 