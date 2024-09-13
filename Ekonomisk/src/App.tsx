import Expenses from "./Componenets/expenses/Expenses";
import HomePage from "./Componenets/homepage/HomePage";
import LoginForm from "./Componenets/Account/Login";
import CreateForm from "./Componenets/Account/CreateAcc";
 const handleLogin = (email: string, password: string, Name:string) => {
   console.log(email, password, Name);
 };

function App() {
 return (
   <>
     <Expenses/>
   </>
 );
}
 
export default App;
