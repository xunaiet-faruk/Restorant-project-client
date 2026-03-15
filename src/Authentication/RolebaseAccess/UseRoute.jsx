import { Navigate } from "react-router-dom";
import UseRole from "./UseRole";


const UserRoute = ({ children }) => {

    const [role, roleLoading] = UseRole();

    if (roleLoading) {
        return <span className="loading loading-spinner"></span>
    }

    if (role !== "user") {
        return <Navigate to="/dashboard" replace />
    }

    return children;
};

export default UserRoute;