import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div className="w-[400px] min-h-full bg-gray-400" >
                <ul className="text-yellow-300 font-bold">
                    <li><NavLink to={'/dashboard/card'}>Card</NavLink></li>
                    <li><NavLink>Menu</NavLink></li>
                    
                </ul>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;