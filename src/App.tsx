import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
