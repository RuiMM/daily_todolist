import Router from '@koa/router';
import * as tasksController from '../controllers/tasks.js';

const router = new Router();

router.prefix('/api');

router
  .get('/tasks', tasksController.getTasks)
  .post('/tasks', tasksController.createTask)
  .put('/tasks/:id', tasksController.updateTask)
  .delete('/tasks/:id', tasksController.deleteTask);

export default router; 