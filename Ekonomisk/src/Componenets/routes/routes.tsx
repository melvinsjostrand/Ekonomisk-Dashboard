import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import NavBar from "../Nav/NavBar";
import Expenses from "../expenses/Expenses";
import Login from "../Forms/Login";
import CreateAcc from "../Forms/CreateAcc";
import MakeIncome from "../Forms/MakeIncome";

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <CreateAcc />,
      },
      {
        path: "/AddIncome",
        element: <MakeIncome/>,
      },
    ],
  },
]);

export default router;
