import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import './dashboard.css'
import { AuthContext } from "../Authentication/Provider/AuthProbider";
import { FiUser, FiHome, FiLogOut, FiPhone, FiMail } from "react-icons/fi";
import { FaRegEnvelope, FaPhone } from "react-icons/fa";
import UseRole from "../Authentication/RolebaseAccess/UseRole";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const [role, roleLoading] = UseRole();
    const navigate = useNavigate();

    // Redirect logic
    useEffect(() => {
        if (!roleLoading && role && window.location.pathname === '/dashboard') {
            if (role === "Admin") {
                navigate('/dashboard/admin', { replace: true });
            } else {
                navigate('/dashboard/userHome', { replace: true });
            }
        }
    }, [role, roleLoading, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    const userMenu = [
        { path: '/dashboard/userHome', name: 'User-Home', icon: '🏠', end: true },
        { path: '/dashboard/userProfile', name: 'Your-Profile', icon: '👤', end: true },
        { path: '/dashboard/myorders', name: 'My-Orders', icon: '📦', end: true },
        { path: '/dashboard/payment', name: 'Payment', icon: '💳', end: true },
        { path: '/dashboard/payment-history', name: 'Payment-History', icon: '📜', end: true },
    ];

    const adminMenu = [
        { path: '/dashboard/admin', name: 'Overview', icon: '📊', end: true },
        { path: '/dashboard/addfood', name: 'Add-Food', icon: '➕', end: true },
        { path: '/dashboard/manageFood', name: 'Manage-Food', icon: '📋', end: true },
        { path: '/dashboard/manageorders', name: 'Manage-Orders', icon: '📦', end: true },
        { path: '/dashboard/manageusers', name: 'Manage-Users', icon: '👥', end: true },
    ];

    const navigationItems = role === "Admin" ? adminMenu : userMenu;

    // 🔥 Bottom menu items with underline
    const bottomMenuItems = [
        { path: '/', name: 'Home', icon: FiHome, onClick: () => navigate('/') },
        { name: 'Email', icon: FiMail, onClick: () => window.location.href = 'xunaiet28@gmail.com' },
        { name: 'Logout', icon: FiLogOut, onClick: handleLogout, isLogout: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Mobile & Desktop */}
            <header className="bg-white shadow-sm lg:hidden fixed top-0 left-0 right-0 z-20">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-amber-600">TasteTribe</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                        {user?.displayName?.charAt(0) || 'A'}
                    </div>
                </div>
            </header>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-40 h-full transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:w-72 w-64
                bg-gradient-to-b from-amber-50 to-white
                shadow-xl border-r border-amber-100
                overflow-y-auto sidebar-scrollbar
                flex flex-col
            `}>
                {/* Restaurant Logo/Brand - Fixed at top */}
                <div className="p-6 border-b border-amber-100 bg-gradient-to-b from-amber-50 to-white z-10 flex-shrink-0">
                    <Link to={'/'}>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🍽️</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-amber-800">TasteTribe</h1>
                                <p className="text-xs text-amber-600">Restaurant Dashboard</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links - Scrollable area */}
                <nav className="p-4 flex-1 overflow-y-auto">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={({ isActive }) => {
                                        return `
                                        flex items-center space-x-3 px-4 py-3 rounded-xl
                                        transition-all duration-200 group
                                        ${isActive
                                                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                                                : 'text-gray-600 hover:bg-amber-100 hover:text-amber-700'
                                            }
                                    `}}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                    {item.name === 'Orders' && (
                                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            12
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 🔥 Divider with underline */}
                <div className="relative px-4 my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-amber-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-gradient-to-b from-amber-50 to-white px-4 text-xs font-medium text-amber-600 uppercase tracking-wider">
                            Quick Links
                        </span>
                    </div>
                </div>

                {/* 🔥 Bottom Menu Items - Home, Contact, Email, Logout */}
                <div className="p-4 space-y-1">
                    {bottomMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    item.onClick();
                                    setIsSidebarOpen(false);
                                }}
                                className={`
                                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                                    transition-all duration-200 group
                                    ${item.isLogout
                                        ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                        : 'text-gray-600 hover:bg-amber-100 hover:text-amber-700'
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 ${item.isLogout ? 'text-red-500' : 'text-gray-500 group-hover:text-amber-600'}`} />
                                <span className="font-medium">{item.name}</span>
                                {item.name === 'Email' && (
                                    <span className="ml-auto text-xs text-gray-400 group-hover:text-amber-600">
                                        support
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* User Profile Section - Fixed at bottom */}
                <div className="flex-shrink-0 p-4 border-t border-amber-100 bg-white/90 backdrop-blur-sm sticky bottom-0 left-0 right-0">
                    <div className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold overflow-hidden">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="user"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png";
                                }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-700 truncate">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || 'email@example.com'}</p>
                        </div>
                        <button className="p-2 hover:bg-amber-200 rounded-lg transition-colors flex-shrink-0">
                            <FiUser className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`
                transition-all duration-300
                lg:ml-72
                min-h-screen bg-gray-50
                pt-16 lg:pt-0
                overflow-y-auto main-scrollbar
                ${isSidebarOpen ? 'overflow-hidden h-screen' : ''}
            `}>
                {/* Top Bar - Desktop Only */}
                <div className="hidden lg:block bg-white shadow-sm sticky top-0 z-10">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Welcome {user?.displayName || 'Guest'} 👋
                            </h2>
                            {/* Role Badge */}
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                {role === "Admin" ? "Administrator" : "Customer"}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-700">TasteTribe</p>
                                    <p className="text-xs text-gray-500">Main Branch</p>
                                </div>
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                        alt="user"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outlet - Dynamic Content */}
                <div className="p-4 lg:p-8">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;