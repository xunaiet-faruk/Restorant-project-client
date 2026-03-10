import React from 'react';
import AdminOverviewChart from './AdminDashboard/AdminOverviwChart';

const AdminOverview = () => {
    const statsData = [
        {
            id: 1,
            title: 'Total Users',
            value: '120',
            icon: '👥',
            change: '+12',
            changeType: 'increase',
            bgColor: 'from-blue-500 to-blue-600',
            lightBg: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            borderColor: 'border-blue-200'
        },
        {
            id: 2,
            title: 'Total Orders',
            value: '350',
            icon: '🍽️',
            change: '+23',
            changeType: 'increase',
            bgColor: 'from-amber-500 to-amber-600',
            lightBg: 'bg-amber-50',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            borderColor: 'border-amber-200'
        },
        {
            id: 3,
            title: 'Total Foods',
            value: '40',
            icon: '🍲',
            change: '+5',
            changeType: 'increase',
            bgColor: 'from-green-500 to-green-600',
            lightBg: 'bg-green-50',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            borderColor: 'border-green-200'
        },
        {
            id: 4,
            title: 'Total Revenue',
            value: '৳85,000',
            icon: '💰',
            change: '+15.5%',
            changeType: 'increase',
            bgColor: 'from-purple-500 to-purple-600',
            lightBg: 'bg-purple-50',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            borderColor: 'border-purple-200'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header with responsive design */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back! Here's your restaurant summary
                    </p>
                </div>

                {/* Date selector - responsive */}
                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 hover:border-amber-300 transition-colors cursor-pointer w-full sm:w-auto">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Last 30 days</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Stats Cards Grid - Fully Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {statsData.map((stat) => (
                    <div
                        key={stat.id}
                        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                        {/* Card Content */}
                        <div className="relative p-5 lg:p-6">
                            {/* Icon and Change Badge Row */}
                            <div className="flex items-start justify-between mb-3">
                                <div className={`${stat.iconBg} p-2.5 lg:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-xl lg:text-2xl">{stat.icon}</span>
                                </div>

                                {/* Change Badge */}
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                                    ${stat.changeType === 'increase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {stat.changeType === 'increase' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        )}
                                    </svg>
                                    <span>{stat.change}</span>
                                </div>
                            </div>

                            {/* Value and Title */}
                            <div className="space-y-1">
                                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">
                                    {stat.value}
                                </h3>
                                <p className="text-xs lg:text-sm font-medium text-gray-500">
                                    {stat.title}
                                </p>
                            </div>

                            {/* Progress Indicator */}
                            <div className="mt-3 lg:mt-4 flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${stat.bgColor} w-3/4 group-hover:w-full transition-all duration-700`}
                                    />
                                </div>
                                <span className="text-xs text-gray-400">75%</span>
                            </div>
                        </div>

                        {/* Hover Border Effect */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.bgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                    </div>
                ))}
            </div>

            {/* Bottom Section - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
                {/* Today's Summary Card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 lg:p-6 border border-amber-100">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg shadow-amber-200">
                            📊
                        </div>
                        <div>
                            <p className="text-xs lg:text-sm text-amber-600 font-medium">Today's Summary</p>
                            <p className="text-lg lg:text-xl font-bold text-amber-800">12 New Orders</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs text-gray-500">Pending</p>
                            <p className="text-lg lg:text-xl font-bold text-gray-700">5</p>
                            <p className="text-xs text-gray-400 mt-1">+2 today</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs text-gray-500">Completed</p>
                            <p className="text-lg lg:text-xl font-bold text-gray-700">7</p>
                            <p className="text-xs text-gray-400 mt-1">+5 today</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white rounded-2xl p-5 lg:p-6 border border-gray-200 hover:border-amber-200 transition-colors">
                    <h3 className="text-sm font-medium text-gray-500 mb-3 lg:mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-3 gap-2 lg:gap-3">
                        <button className="p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all group">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 mx-auto text-gray-400 group-hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-xs lg:text-sm mt-1 lg:mt-2 block font-medium">Add Food</span>
                        </button>
                        <button className="p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all group">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 mx-auto text-gray-400 group-hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="text-xs lg:text-sm mt-1 lg:mt-2 block font-medium">Orders</span>
                        </button>
                        <button className="p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all group">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 mx-auto text-gray-400 group-hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-xs lg:text-sm mt-1 lg:mt-2 block font-medium">Users</span>
                        </button>
                    </div>
                </div>
            </div>
            <AdminOverviewChart/>
        </div>
    );
};

export default AdminOverview;