import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/Provider/AuthProbider";
import Swal from "sweetalert2";


const Login = () => {
    const { signIn } = useContext(AuthContext)
    const location =useLocation();
    const navigate =useNavigate();
    const from =location.state?.form?.pathname || "/"
    const hadlesubmit = e => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((res) => {
                console.log(res.user,"login here");
                if(res.user){
                    Swal.fire({
                        title: "Login ",
                        icon: "success",
                        draggable: true
                    });
                }
                navigate(from,{replace : true})
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                Swal.fire({
                    title: "Something Wrong ",
                    icon: "warning",
                    draggable: true
                });
            });

    }
    return (
        <div className="pt-[200px]">
            <form onSubmit={hadlesubmit}>

                <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 ">
                    <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>

                    <div className="space-y-6">
                        <div className="space-y-2 text-sm">
                            <label htmlFor="email" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                                Email
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                type="text"
                                required
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                                Password
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                                id="password"
                                placeholder="Enter password"
                                name="password"
                                type="password"
                                required
                            />

                        </div>
                        <button className="rounded-md bg-[#F4B552] px-4 py-2 text-white transition-colors hover:bg-black ">Submit</button>
                    </div>
                    <p className="text-center text-sm text-zinc-700">
                        Don&apos;t have an account?
                        <a href="#" className="font-semibold underline">
                            <Link type="Submit" className="text-blue-500 font-bold" to={'/signup'}>
                                Signup</Link>
                        </a>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default Login;