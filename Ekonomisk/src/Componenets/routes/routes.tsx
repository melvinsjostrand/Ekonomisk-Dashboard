import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import NavBar from "../Nav/NavBar";
import Expenses from "../expenses/Expenses";
import Login from "../Forms/Login";
import CreateAcc from "../Forms/CreateAcc";
import MakeIncome from "../Forms/MakeIncome";

 const handleLogin = (email: string, password: string) => {
    const data = {
      email,
      password,
    };
   console.log(JSON.stringify(data));
 };
 const handleCreate = (
   Name: string,
   email: string,
   password: string,
   PastSaving: number
 ) => {
   const data = {
     Name,
     email,
     password,
     PastSaving,
   };
   console.log(JSON.stringify(data));
 };

const handleIncome = (
  income: number,
  categoryLimits: Record<string, number>
) => {
  const userId = 1; 

  const data = {
    userId,
    income,
    limits: Object.entries(categoryLimits).map(([category, spendLimit]) => ({
      userId,
      category,
      spendLimit,
    })),
  };

  console.log(JSON.stringify(data, null, 2));
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