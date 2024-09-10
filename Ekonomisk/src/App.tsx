import Expenses from "./Componenets/expenses/Expenses";
import HomePage from "./Componenets/homepage/HomePage";
import LoginForm from "./Componenets/Loginpage/Login";
 const handleLogin = (email: string, password: string) => {
   console.log(email, password);
 };

function App() {
 return (
   <>
     <HomePage />
   </>
 );
}
 
export default App;
