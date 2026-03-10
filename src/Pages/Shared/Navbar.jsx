import { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(erro => console.log(erro))
    }

    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);
    return (
        <div className=' fixed z-10 w-full '>
            <nav className="flex max-w-screen-2xl mx-auto items-center justify-between bg-opacity-10 bg-[#393E46] px-4 py-2 text-white ">
                <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
                    <img className='w-36' src={"https://live.themewild.com/restrou/assets/img/logo/logo.png"} alt="" />
                </div>
                <ul className="hidden items-center justify-between gap-10 md:flex">
                    <li className="group flex  cursor-pointer flex-col">
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-yellow-400" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="group flex  cursor-pointer flex-col">

                        <NavLink
                            to="/menu"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-yellow-400" : ""
                            }
                        >
                            Menu
                        </NavLink>
                    </li>
                    <li className="group flex  cursor-pointer flex-col">
                        <NavLink
                            to="/food"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-yellow-400" : ""
                            }
                        >
                            Food
                        </NavLink>                    </li>
                    {
                        user ?
                            <li className="group flex  cursor-pointer flex-col animate-pulse hover:text-yellow-400">
                                <NavLink 

                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? " uppercase" : ""
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>

                            :

                            <li className="group flex  cursor-pointer flex-col">
                                <NavLink
                                    to="/login"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-yellow-400" : ""
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>



                    }

                </ul>
                <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                    {dropDownState && (
                        <ul className=" z-10  gap-2  bg-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base  p-6">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-yellow-400" : ""
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-yellow-400" : ""
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-yellow-400" : ""
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-yellow-400" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </ul>
                    )}
                </div>
            </nav>

        </div>
    );
};

export default Navbar;