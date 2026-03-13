import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import FoodList from "../../Pages/Menuroute/FoodList";
import Food from "../../Pages/OurFood/Food";
import Login from "../Identification/Login";
import Register from "../Identification/Register";
import Secret from "../Secret";
import Privateroute from "./Privateroute";
import Dashboard from "../../Dasboard/Dashboard";
import AdminOverview from "../../Dasboard/AdminOverview";
import Addfood from "../../Dasboard/AdminDashboard/Addfood";
import ManageFood from "../../Dasboard/AdminDashboard/ManageFood";
import ManageOrder from "../../Dasboard/AdminDashboard/ManageOrder";
import ManageUsers from "../../Dasboard/AdminDashboard/ManageUsers";
import UserHome from "../../Dasboard/UserDashboard/UserHome";
import UserProfile from "../../Dasboard/UserDashboard/UserProfile";
import MyOrders from "../../Dasboard/UserDashboard/MyOrders";
import PaymentHistory from "../../Dasboard/UserDashboard/PaymentHistory";
import Pay from "../../Dasboard/UserDashboard/Pay";


const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/menu',
                element : <FoodList/>
            },
            {
                path : '/food',
                element :<Food/>
            },
            {
                path : '/login',
                element :<Login/>
            },
            {
                path: '/signup',
                element :<Register/>
            },
            {
                path: '/secret',
                element: <Privateroute><Secret /></Privateroute>
            }
        ]
       
    },
    {
        path : '/dashboard',
        element : <Dashboard/>,
        children : [
            {
                path:'',
                element : <AdminOverview/>
            },
            {
                path:'addfood',
                element : <Addfood/>
            },
            {
                path:'manageFood',
                element : <ManageFood/>
            },
            {
                path:'manageorders',
                element : <ManageOrder/>
            },
            {
                path:'manageusers',
                element : <ManageUsers/>
            },
            {
                path:'userHome',
                element : <UserHome/>
            },
            {
                path:'userProfile',
                element : <UserProfile/>
            },
            {
                path:'myorders',
                element : <MyOrders/>
            },
            {
                path:'payment-history',
                element : <PaymentHistory/>
            },
            {
                path:'payment',
                element : <Pay/>
            }
        ]
    }
]);

export default router;