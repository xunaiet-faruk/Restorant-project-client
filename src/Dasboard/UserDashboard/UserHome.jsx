import React, { useContext } from 'react';
import {
    HiOutlineShoppingBag,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
    HiOutlineArrowRight,
    HiOutlineTruck,
    HiOutlineFire,
    HiOutlineStar,
    HiOutlineTrendingUp
} from 'react-icons/hi';
import {
    GiCookingPot,
    GiHotMeal,
    GiSushis
} from 'react-icons/gi';
import {
    MdDeliveryDining,
    MdOutlineRestaurantMenu,
    MdOutlinePayment
} from 'react-icons/md';
import {
    BsBasket,
    BsCupHot
} from 'react-icons/bs';
import { FaRegClock, FaRegCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';

const UserHome = () => {
    const {user} =useContext(AuthContext)
    // Sample data
    const stats = {
        totalOrders: {
            count: 156,
            growth: '+12%',
            icon: HiOutlineShoppingBag,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        pendingOrders: {
            count: 23,
            timeEstimate: '~45 mins',
            icon: HiOutlineClock,
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600'
        },
        completedOrders: {
            count: 133,
            rating: '4.8',
            icon: HiOutlineCheckCircle,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        totalSpending: {
            amount: 2845.75,
            saved: 156.30,
            icon: HiOutlineCurrencyDollar,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        }
    };

    const recentOrders = [
        {
            id: '#1234',
            total: 800,
            status: 'Cooking',
            items: 3,
            time: '10:30 AM',
            restaurant: 'Pizza Heaven',
            icon: GiCookingPot
        },
        {
            id: '#1233',
            total: 450,
            status: 'Delivered',
            items: 2,
            time: '9:15 AM',
            restaurant: 'Sushi Master',
            icon: GiSushis
        },
        {
            id: '#1232',
            total: 1250,
            status: 'Pending',
            items: 5,
            time: '8:45 AM',
            restaurant: 'Burger House',
            icon: GiHotMeal
        },
        {
            id: '#1231',
            total: 320,
            status: 'Completed',
            items: 1,
            time: 'Yesterday',
            restaurant: 'Coffee Shop',
            icon: BsCupHot
        },
        {
            id: '#1230',
            total: 680,
            status: 'Cooking',
            items: 4,
            time: 'Yesterday',
            restaurant: 'Taco Bell',
            icon: GiHotMeal
        },
    ];

    const TotalOrdersCard = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stats.totalOrders.bgColor} group-hover:scale-110 transition-transform`}>
                    <stats.totalOrders.icon className={`w-7 h-7 ${stats.totalOrders.textColor}`} />
                </div>
                <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <HiOutlineTrendingUp className="mr-1" />
                    {stats.totalOrders.growth}
                </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
            <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders.count}</p>
                <p className="text-sm text-gray-500">lifetime</p>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
        </div>
    );

    const PendingOrdersCard = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stats.pendingOrders.bgColor} group-hover:scale-110 transition-transform`}>
                    <stats.pendingOrders.icon className={`w-7 h-7 ${stats.pendingOrders.textColor}`} />
                </div>
                <span className="flex items-center text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    <FaRegClock className="mr-1" />
                    {stats.pendingOrders.timeEstimate}
                </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Orders</h3>
            <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders.count}</p>
                <p className="text-sm text-gray-500">in progress</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">Preparing: 12</span>
                <span className="text-gray-500">On way: 11</span>
            </div>
        </div>
    );

    const CompletedOrdersCard = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stats.completedOrders.bgColor} group-hover:scale-110 transition-transform`}>
                    <stats.completedOrders.icon className={`w-7 h-7 ${stats.completedOrders.textColor}`} />
                </div>
                <span className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                    <HiOutlineStar className="mr-1" />
                    {stats.completedOrders.rating} rating
                </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Completed Orders</h3>
            <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stats.completedOrders.count}</p>
                <p className="text-sm text-gray-500">total done</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-green-50 p-2 rounded-lg">
                    <p className="font-semibold text-green-600">85%</p>
                    <p className="text-gray-500 text-xs">On time</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="font-semibold text-blue-600">45</p>
                    <p className="text-gray-500 text-xs">This month</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg">
                    <p className="font-semibold text-purple-600">12</p>
                    <p className="text-gray-500 text-xs">Favorites</p>
                </div>
            </div>
        </div>
    );

    const TotalSpendingCard = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stats.totalSpending.bgColor} group-hover:scale-110 transition-transform`}>
                    <stats.totalSpending.icon className={`w-7 h-7 ${stats.totalSpending.textColor}`} />
                </div>
                <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <HiOutlineFire className="mr-1" />
                    Saved ${stats.totalSpending.saved}
                </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Spending</h3>
            <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">${stats.totalSpending.amount}</p>
                <p className="text-sm text-gray-500">all time</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">Avg. order: $42.50</span>
                <span className="text-purple-600 font-medium">View details</span>
            </div>
        </div>
    );

    const RecentOrdersTable = () => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-xl">
                            <HiOutlineShoppingBag className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                            <p className="text-sm text-gray-500">Your latest orders from favorite restaurants</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
                        View All
                        <HiOutlineArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform
                                    ${order.status === 'Cooking' ? 'bg-orange-50 text-orange-600' :
                                        order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                            order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-blue-50 text-blue-600'}`}>
                                    <order.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                                        <span className="text-sm text-gray-500">• {order.restaurant}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-sm text-gray-600">{order.items} items</p>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <p className="text-sm font-medium text-gray-900">${order.total}</p>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <p className="text-sm text-gray-500">{order.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-2 rounded-xl text-sm font-medium
                                    ${order.status === 'Cooking' ? 'bg-orange-100 text-orange-700' :
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                    {order.status === 'Cooking' && <GiCookingPot className="inline mr-2" />}
                                    {order.status === 'Delivered' && <MdDeliveryDining className="inline mr-2" />}
                                    {order.status === 'Pending' && <FaRegClock className="inline mr-2" />}
                                    {order.status === 'Completed' && <FaRegCheckCircle className="inline mr-2" />}
                                    {order.status}
                                </span>
                                <button className="text-gray-400 hover:text-orange-600 transition-colors">
                                    <HiOutlineArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Welcome Section */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{user?.displayName}!</span>
                    </h1>
                    <p className="text-gray-600">Track your orders and manage your deliveries</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {user?.displayName}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Each separate and unique */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <TotalOrdersCard />
                <PendingOrdersCard />
                <CompletedOrdersCard />
                <TotalSpendingCard />
            </div>

            {/* Recent Orders Table */}
            <RecentOrdersTable />

           
        </div>
    );
};

export default UserHome;