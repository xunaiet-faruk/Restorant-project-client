import { Navigate } from "react-router-dom";
import UseRole from "./UseRole";

const AdminRote = ({ children }) => {

    const [role, roleLoading] = UseRole();

    if (roleLoading) {
        return <span className="loading loading-spinner"></span>
    }

    if (role !== "Admin") {
        return <Navigate to="/" replace />
    }

    return children;

};

export default AdminRote;