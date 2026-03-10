import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/Provider/AuthProbider";
import Swal from "sweetalert2";

const Register = () => {
    const [showName, setShowName] = useState({});
    const { createUser, updateuserProfile } = useContext(AuthContext);
    const navigate =useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const imageFile = form.image.files[0];

        // Upload image to imgbb
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbApiKey = "0b4acf8aaede9367b12de5e29de2e9ad"; 

        try {
            const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: "POST",
                body: formData,
            });

            const imgData = await imgRes.json();
            const imageUrl = imgData?.data?.url;

            if (!imageUrl) {
                throw new Error("Image upload failed");
            }

            // Now create user
            createUser(email, password)
                .then(result => {
                    const Registeruser = result.user;
                    console.log(Registeruser);
                    if (Registeruser) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Registration has been Success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/')
                    }

                    // Now update profile with name and image url
                    updateuserProfile(name, imageUrl)
                        .then(() => {
                            console.log("User profile updated");
                        })
                        .catch(error => console.log(error));
                })
                .catch((error) => {
                    console.error("Login Error:", error.message);
                    Swal.fire({
                        title: "Something Went Wrong",
                        icon: "warning",
                        draggable: true
                    });
                });

        } catch (error) {
            console.error("Image upload or registration failed", error);
            Swal.fire({
                title: "Image Upload Failed",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <div className="pt-[200px]">
                <form onSubmit={handleRegister}>
                    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 ">
                        <h1 className="text-3xl font-semibold tracking-tight">Sign Up</h1>

                        <div className="space-y-6">
                            <div className="space-y-2 text-sm">
                                <label htmlFor="username" className="block font-medium text-zinc-700">
                                    Username
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                                    id="username"
                                    placeholder="Enter username"
                                    name="name"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-sm">
                                <label htmlFor="email" className="block font-medium text-zinc-700">
                                    Email
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                                    id="email"
                                    placeholder="Enter email"
                                    name="email"
                                    type="email"
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-sm">
                                <label htmlFor="password" className="block font-medium text-zinc-700">
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

                            <div>
                                <label htmlFor="type2-1" className="flex max-w-[380px] md:w-[380px]">
                                    <div className="w-fit whitespace-nowrap  bg-[#F4B552]  px-2 py-1 text-sm text-white">Choose File</div>
                                    <div className="flex w-full max-w-[380px] items-center  border-b-[2px] border-[#F4B552]  px-2 text-sm font-medium text-gray-400">
                                        {showName.name ? showName.name : 'No File Chosen'}
                                    </div>
                                </label>
                                <input
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const imageFile = e.target.files[0];
                                            setShowName(imageFile);
                                        }
                                    }}
                                    className="hidden"
                                    type="file"
                                    name="image"
                                    id="type2-1"
                                    accept="image/*"
                                    required
                                />
                            </div>

                            <button className="rounded-md bg-[#F4B552] px-8 py-2 text-white transition-colors hover:bg-black">Submit</button>
                        </div>

                        <p className="text-center text-sm text-zinc-700">
                            Already have an account?
                            <Link className="text-blue-500 font-bold" to={'/login'}>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
