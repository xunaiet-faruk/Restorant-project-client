import React, { useContext, useEffect, useState } from 'react';
import {
    HiOutlineShoppingBag,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
    HiOutlineArrowRight,
    HiOutlineTrendingUp,
    HiOutlineStar,
    HiOutlineFire
} from 'react-icons/hi';
import {
    GiCookingPot,
    GiHotMeal
} from 'react-icons/gi';
import {
    MdDeliveryDining
} from 'react-icons/md';
import { FaRegClock, FaRegCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
import UseAxios from '../../Hooks/UseAxios';
import { motion } from 'framer-motion';
import { FcCancel } from 'react-icons/fc';

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const axios = UseAxios();

    // States for dynamic data
    const [userOrders, setUserOrders] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [stats, setStats] = useState({
        totalOrders: { count: 0, growth: '+0%' },
        pendingOrders: { count: 0, timeEstimate: '0 mins' },
        completedOrders: { count: 0, rating: '0.0' },
        totalSpending: { amount: 0, saved: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                setLoading(true);
                const profileRes = await axios.get(`/user/${user.email}`);
                setUserProfile(profileRes.data);
                const ordersRes = await axios.get(`/buyFood/${user.email}`);

                const mappedOrders = (ordersRes.data || []).map(order => ({
                    ...order,
                    displayStatus: mapStatus(order.status) 
                }));

                setUserOrders(mappedOrders);
                calculateStats(mappedOrders);

            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user?.email]);

    
    
    const mapStatus = (status) => {
        const statusMap = {
        
            'pending': 'Pending',
            'Pending': 'Pending',
            'pend': 'Pending',

      
            'Cooking': 'Processing',
            'cooking': 'Processing',
            'Processing': 'Processing',
            'processing': 'Processing',
            'preparing': 'Processing',
            'in progress': 'Processing',

         
            'Delivered': 'Delivered',
            'delivered': 'Delivered',
            'Completed': 'Delivered',
            'completed': 'Delivered',
            'done': 'Delivered',

            'cancelled': 'Cancelled',
            'Cancelled': 'Cancelled',
            'cancel': 'Cancelled',
            'rejected': 'Cancelled',
            'Rejected': 'Cancelled'
        };

        const mappedStatus = statusMap[status] || statusMap[status?.toLowerCase()] || 'Pending';

        return mappedStatus;
    };

    const calculateStats = (orders) => {
        const total = orders.length;
        const pending = orders.filter(o => o.displayStatus === "Pending").length;
        const processing = orders.filter(o => o.displayStatus === "Processing").length;
        const delivered = orders.filter(o => o.displayStatus === "Delivered").length;
        const cancelled = orders.filter(o => o.displayStatus === "Cancelled").length;

        const totalAmount = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
        const savedAmount = (totalAmount * 0.1).toFixed(2);
        const growth = total > 0 ? '+12%' : '0%';
        const avgRating = orders.reduce((sum, order) => sum + (order.rating || 4.5), 0) / (orders.length || 1);

        setStats({
            totalOrders: {
                count: total,
                growth: growth,
                icon: HiOutlineShoppingBag,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-600'
            },
            pendingOrders: {
                count: pending + processing, // Pending + Processing একসাথে
                timeEstimate: `${Math.round((pending + processing) * 15)} mins`,
                icon: HiOutlineClock,
                color: 'from-yellow-500 to-yellow-600',
                bgColor: 'bg-yellow-50',
                textColor: 'text-yellow-600'
            },
            completedOrders: {
                count: delivered,
                rating: avgRating.toFixed(1),
                icon: HiOutlineCheckCircle,
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-50',
                textColor: 'text-green-600'
            },
            totalSpending: {
                amount: totalAmount.toFixed(2),
                saved: savedAmount,
                icon: HiOutlineCurrencyDollar,
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-50',
                textColor: 'text-purple-600'
            }
        });
    };
    const getOrderIcon = (displayStatus) => {
        switch (displayStatus) {
            case 'Processing': return GiCookingPot;
            case 'Delivered': return MdDeliveryDining;
            case 'Pending': return FaRegClock;
            case 'Cancelled': return FcCancel;
            default: return GiHotMeal;
        }
    };

    const getStatusColor = (displayStatus) => {
        switch (displayStatus) {
            case 'Processing': return 'bg-orange-100 text-orange-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    // StatCard Component
    const StatCard = ({ stat, title, value, subValue, icon: Icon, bgColor, textColor }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${textColor}`} />
                </div>
                {stat.growth && (
                    <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <HiOutlineTrendingUp className="mr-1" />
                        {stat.growth}
                    </span>
                )}
                {stat.timeEstimate && (
                    <span className="flex items-center text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        <FaRegClock className="mr-1" />
                        {stat.timeEstimate}
                    </span>
                )}
                {stat.rating && (
                    <span className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        <HiOutlineStar className="mr-1" />
                        {stat.rating}
                    </span>
                )}
                {stat.saved && (
                    <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <HiOutlineFire className="mr-1" />
                        Saved ${stat.saved}
                    </span>
                )}
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
            <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{subValue}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {userProfile?.name || user?.displayName}!
                        </span>
                    </h1>
                    <p className="text-gray-600">
                        {userProfile?.role ? `You are logged in as ${userProfile.role}` : 'Track your orders and manage your deliveries'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={userProfile?.image || user?.photoURL || 'https://via.placeholder.com/48'}
                            alt={userProfile?.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    stat={stats.totalOrders}
                    title="Total Orders"
                    value={stats.totalOrders.count}
                    subValue="lifetime"
                    icon={stats.totalOrders.icon}
                    bgColor={stats.totalOrders.bgColor}
                    textColor={stats.totalOrders.textColor}
                />
                <StatCard
                    stat={stats.pendingOrders}
                    title="Active Orders"
                    value={stats.pendingOrders.count}
                    subValue="in progress"
                    icon={stats.pendingOrders.icon}
                    bgColor={stats.pendingOrders.bgColor}
                    textColor={stats.pendingOrders.textColor}
                />
                <StatCard
                    stat={stats.completedOrders}
                    title="Delivered Orders"
                    value={stats.completedOrders.count}
                    subValue="total done"
                    icon={stats.completedOrders.icon}
                    bgColor={stats.completedOrders.bgColor}
                    textColor={stats.completedOrders.textColor}
                />
                <StatCard
                    stat={stats.totalSpending}
                    title="Total Spending"
                    value={`$${stats.totalSpending.amount}`}
                    subValue="all time"
                    icon={stats.totalSpending.icon}
                    bgColor={stats.totalSpending.bgColor}
                    textColor={stats.totalSpending.textColor}
                />
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <p className="text-sm text-gray-500">Avg. Order Value</p>
                    <p className="text-xl font-bold text-gray-900">
                        ${userOrders.length > 0
                            ? (stats.totalSpending.amount / userOrders.length).toFixed(2)
                            : '0.00'}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <p className="text-sm text-gray-500">This Month</p>
                    <p className="text-xl font-bold text-gray-900">
                        {userOrders.filter(o => {
                            const orderDate = new Date(o.orderDate);
                            const now = new Date();
                            return orderDate.getMonth() === now.getMonth() &&
                                orderDate.getFullYear() === now.getFullYear();
                        }).length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <p className="text-sm text-gray-500">Favorite Items</p>
                    <p className="text-xl font-bold text-gray-900">
                        {new Set(userOrders.map(o => o.name)).size}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <p className="text-sm text-gray-500">On-time Delivery</p>
                    <p className="text-xl font-bold text-green-600">
                        {userOrders.length > 0
                            ? Math.round((userOrders.filter(o => o.displayStatus === 'Delivered').length / userOrders.length) * 100)
                            : 0}%
                    </p>
                </div>
            </div>

            {/* Recent Orders Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 rounded-xl">
                                <HiOutlineShoppingBag className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                                <p className="text-sm text-gray-500">
                                    You have {userOrders.length} total orders
                                </p>
                            </div>
                        </div>
                        {userOrders.length > 5 && (
                            <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
                                View All
                                <HiOutlineArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {userOrders.slice(0, 5).map((order) => {
                        const OrderIcon = getOrderIcon(order.displayStatus);
                        return (
                            <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors group">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform
                                            ${order.displayStatus === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                                order.displayStatus === 'Processing' ? 'bg-orange-50 text-orange-600' :
                                                    order.displayStatus === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                        'bg-red-50 text-red-600'}`}>
                                            <OrderIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">
                                                    Order #{order._id.slice(-6)}
                                                </h3>
                                                <span className="text-sm text-gray-500">• {order.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <p className="text-sm font-medium text-gray-900">
                                                    ৳{order.price * order.quantity}
                                                </p>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(order.orderDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(order.displayStatus)}`}>
                                            {order.displayStatus}
                                        </span>
                                        <button className="text-gray-400 hover:text-orange-600 transition-colors">
                                            <HiOutlineArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {userOrders.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <HiOutlineShoppingBag className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                            <p className="text-gray-500">Start ordering your favorite food!</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default UserHome;