import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import NavBar from "../Nav/NavBar";
import Expenses from "../expenses/Expenses";
import Login from "../Forms/Login";
import CreateAcc from "../Forms/CreateAcc";
import MakeIncome from "../Forms/MakeIncome";

 const handleLogin = (email: string, password: string) => {
   console.log(email, password);
 };
 const handleCreate = (
   email: string,
   password: string,
   Name: string,
   PastSaving:number
 ) => {
   console.log(email, password, Name, PastSaving);
 };


  const handleIncome = (
    income: number,
    categoryLimits: Record<string, number>
  ) => {

    console.log("Income:", income);
    console.log("Category Limits:", categoryLimits);
  };

const Layout = () => (
    <>
    <NavBar></NavBar>
    <Outlet />
    </>
)

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
        element: <Login onSubmit={handleLogin} />,
      },
      {
        path: "/register",
        element: <CreateAcc onSubmit={handleCreate}/>,
      },
      {
        path: "AddIncome",
        element: <MakeIncome onSubmit={handleIncome}/>
      }
    ],
  },
]);

export default router;