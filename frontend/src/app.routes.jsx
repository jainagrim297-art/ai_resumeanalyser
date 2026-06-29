import {createBrowserRouter} from "react-router-dom" ;
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Protected from "./features/auth/componenets/Projected";
import Home from "./features/interview/pages/services/Home";
import History from "./features/interview/pages/services/History";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <div>Not Found</div>
    },
    {
        path : "/",
        element: <Protected><Home /></Protected>
    },
    {
        path : "/my-resumes",
        element: <Protected><History /></Protected>
    }





    
    
])