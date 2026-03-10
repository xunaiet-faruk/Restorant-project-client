import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import './dashboard.css'
import { AuthContext } from "../Authentication/Provider/AuthProbider";
import { FiUser } from "react-icons/fi";

// Icons (you can replace with your preferred icon library)
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useContext(AuthContext)

    const navigationItems = [
        { path: '/dashboard', name: 'Overview', icon: '📊', end: true }, // end: true added
        { path: '/dashboard/addfood', name: 'Add-Food', icon: '💳', end: true },
        { path: '/dashboard/manageFood', name: 'Manage-Food', icon: '📋', end: true },
        { path: '/dashboard/manageorders', name: 'Manage-Orders', icon: '🍽️', end: true },
        { path: '/dashboard/manageusers', name: 'Manage-Users', icon: '📅', end: true },
        { path: '/dashboard/staff', name: 'Staff', icon: '👥', end: true },
        { path: '/dashboard/inventory', name: 'Inventory', icon: '📦', end: true },
        { path: '/dashboard/reports', name: 'Reports', icon: '📈', end: true },
        { path: '/dashboard/settings', name: 'Settings', icon: '⚙️', end: true },
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
            `}>
                {/* Restaurant Logo/Brand */}
                <div className="p-6 border-b border-amber-100 sticky top-0 bg-gradient-to-b from-amber-50 to-white z-10">
                   <Link to={'/'}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🍽️</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-amber-800">TasteTribe</h1>
                            <p className="text-xs text-amber-600">Restaurant Dashboard</p>
                        </div>
                    </div></Link>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 pb-24">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.end} // end prop added
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={({ isActive }) => {
                                        console.log(`Route ${item.path} isActive:`, isActive); // Debugging
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

                {/* User Profile Section */}
                <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-amber-100 bg-white/90 backdrop-blur-sm">
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
                            <h2 className="text-xl font-semibold text-gray-800">Welcome {user?.displayName || 'Guest'} 👋</h2>
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
                <div className="p-4 lg:p-8 ">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;