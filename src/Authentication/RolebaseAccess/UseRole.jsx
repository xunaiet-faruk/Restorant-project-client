import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProbider";
import UseAxios from "../../Hooks/UseAxios";


const UseRole = () => {

    const { user, loading } = useContext(AuthContext);
    const axios = UseAxios();

    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {

        if (user?.email) {

            axios.get(`/register/role/${user.email}`)
                .then(res => {

                    setRole(res.data.role);
                    setRoleLoading(false);

                })
                .catch(err => {
                    console.log(err);
                    setRoleLoading(false);
                });
        }

    }, [user, axios]);

    return [role, roleLoading];
};

export default UseRole;