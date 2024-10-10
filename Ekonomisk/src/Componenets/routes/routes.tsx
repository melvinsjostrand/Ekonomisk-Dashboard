import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import NavBar from "../Nav/NavBar";
import Expenses from "../expenses/Expenses";
import Login from "../Forms/Login";
import CreateAcc from "../Forms/CreateAcc";
import MakeIncome from "../Forms/MakeIncome";
import axios from "axios";


const handleLogin = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`/login`, {
      email,
      password,
    });
    const token = data.token;
    localStorage.setItem("authToken", token);
    console.log("Login successful, token stored in localStorage");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const handleCreate = async (
  Name: string,
  email: string,
  password: string,
  PastSaving: number
) => {
  try {
    const { data } = await axios.post(`/register`, {
      Name,
      email,
      password,
      PastSaving,
    });
    console.log(data);
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

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
