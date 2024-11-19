import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import TodoPage from '../pages/TodoPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TodoPage />,
      }
    ]
  }
], {
  basename: '/daily_todolist'
}); 