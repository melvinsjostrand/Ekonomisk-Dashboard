import HomePage from "./Componenets/homepage/HomePage";
import Login from "./Componenets/Loginpage/Login";
import Expenses from "./Componenets/expenses/Expenses";
import ChangeValue from "./Componenets/expenses/ChangeValue";

 const handleLogin = (email: string, password: string) => {
   console.log(email, password);
 };

function App() {
 return (
   <>
     <Expenses></Expenses>
   </>
 );
}
 
export default App;
