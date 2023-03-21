import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <TablePage />, errorElement: <NotFoundPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
