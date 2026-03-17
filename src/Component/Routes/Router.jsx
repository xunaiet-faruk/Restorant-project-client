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
import AdminRote from "../../Authentication/RolebaseAccess/AdminRote";
import UserRoute from "../../Authentication/RolebaseAccess/UseRoute";
import Paysuccess from "../../Dasboard/UserDashboard/Paysuccess";
import Payfail from "../../Dasboard/UserDashboard/Payfail";


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
        path: '/dashboard',
        element: <Dashboard />,
        children: [

            // admin dashboard
            {
                path: '',
                element: <AdminRote><AdminOverview /></AdminRote>
            },

            {
                path: 'addfood',
                element: <AdminRote><Addfood /></AdminRote>
            },

            {
                path: 'manageFood',
                element: <AdminRote><ManageFood /></AdminRote>
            },

            {
                path: 'manageorders',
                element: <AdminRote><ManageOrder /></AdminRote>
            },

            {
                path: 'manageusers',
                element: <AdminRote><ManageUsers /></AdminRote>
            },

            // user dashboard
            {
                path: 'userHome',
                element: <UserRoute><UserHome /></UserRoute>
            },

            {
                path: 'userProfile',
                element: <UserRoute><UserProfile /></UserRoute>
            },

            {
                path: 'myorders',
                element: <UserRoute><MyOrders /></UserRoute>
            },

            {
                path: 'payment-history',
                element: <UserRoute><PaymentHistory /></UserRoute>
            },

            {
                path: 'payment',
                element: <UserRoute><Pay /></UserRoute>
            },
            {
                path: 'payment/success/:tranID',
                element: <UserRoute><Paysuccess/></UserRoute>
            },
            {
                path: 'payment/fail/:tranID',
                element: <UserRoute><Payfail/></UserRoute>
            }

        ]
    }
]);

export default router;