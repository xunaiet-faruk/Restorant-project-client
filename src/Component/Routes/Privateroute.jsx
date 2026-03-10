import { useContext } from "react";
import { AuthContext } from "../../Authentication/Provider/AuthProbider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Custom/Loading";


const Privateroute = ({children}) => {
    const {user,loading} =useContext(AuthContext)
    const location =useLocation();

    if(loading){
        return <Loading/>
    }
    if(user){
        return children
    }
    return <Navigate to={'/login'} state={{form : location}} replace></Navigate>
};

export default Privateroute;