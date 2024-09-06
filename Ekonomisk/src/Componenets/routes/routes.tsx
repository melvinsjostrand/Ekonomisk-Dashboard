import { createBrowserRouter } from "react-router-dom";
import HomePage from "../homepage/HomePage";

const router = createBrowserRouter([
    {path: '/', element: <HomePage/> },
])

export default router;