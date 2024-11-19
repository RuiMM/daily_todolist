import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import TodoPage from "../pages/TodoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TodoPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
