import HomePage from "./Componenets/homepage/HomePage";
import Login from "./Componenets/Loginpage/Login";

 const handleLogin = (email: string, password: string) => {
   console.log(email, password);
 };

function App() {
 return (
   <>
     <Login onSubmit={handleLogin} />
   </>
 );
}
 
export default App;
