import React, { useState } from 'react';
import {
    HiOutlineShoppingBag,
    HiOutlineEye,
    HiOutlineStar,
    HiOutlineCalendar,
    HiOutlineCurrencyDollar
} from 'react-icons/hi';
import {
    GiCookingPot,
    GiFullPizza,
    GiHamburger,
    GiFrenchFries,
    GiDrinkMe,
    GiSushis,
    GiHotMeal,
    GiChickenLeg
} from 'react-icons/gi';
import {
    MdDeliveryDining,
    MdOutlineRestaurantMenu
} from 'react-icons/md';
import {
    BsCupHot,
    BsTruck,
    BsThreeDotsVertical
} from 'react-icons/bs';
import { FaRegClock, FaRegCheckCircle } from 'react-icons/fa';

const MyOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    // Sample orders data
    const orders = [
        {
            id: '#12345',
            date: '15 Jan 2024',
            time: '10:30 AM',
            foods: [
                { name: 'Classic Burger', quantity: 2, price: 250, icon: GiHamburger },
                { name: 'Pepperoni Pizza', quantity: 1, price: 300, icon: GiFullPizza }
            ],
            total: 800,
            status: 'Cooking',
            restaurant: 'Burger House',
            items: 3
        },
        {
            id: '#12344',
            date: '14 Jan 2024',
            time: '7:45 PM',
            foods: [
                { name: 'Spicy Ramen', quantity: 1, price: 180, icon: GiHotMeal },
                { name: 'Gyoza', quantity: 2, price: 120, icon: GiSushis },
                { name: 'Green Tea', quantity: 2, price: 60, icon: BsCupHot }
            ],
            total: 420,
            status: 'Delivered',
            restaurant: 'Sushi Master',
            items: 5
        },
        {
            id: '#12343',
            date: '14 Jan 2024',
            time: '12:15 PM',
            foods: [
                { name: 'Chicken Burger', quantity: 1, price: 220, icon: GiHamburger },
                { name: 'French Fries', quantity: 2, price: 150, icon: GiFrenchFries },
                { name: 'Coca Cola', quantity: 2, price: 80, icon: GiDrinkMe }
            ],
            total: 530,
            status: 'Pending',
            restaurant: 'Fast Food Express',
            items: 5
        },
        {
            id: '#12342',
            date: '13 Jan 2024',
            time: '8:00 PM',
            foods: [
                { name: 'Margherita Pizza', quantity: 1, price: 280, icon: GiFullPizza },
                { name: 'Garlic Bread', quantity: 1, price: 80, icon: GiFrenchFries },
                { name: 'Tiramisu', quantity: 1, price: 120, icon: BsCupHot }
            ],
            total: 520,
            status: 'Completed',
            restaurant: 'Pizza Heaven',
            items: 3
        },
        {
            id: '#12341',
            date: '12 Jan 2024',
            time: '6:30 PM',
            foods: [
                { name: 'California Roll', quantity: 2, price: 240, icon: GiSushis },
                { name: 'Miso Soup', quantity: 1, price: 60, icon: GiHotMeal },
                { name: 'Edamame', quantity: 1, price: 80, icon: GiFrenchFries }
            ],
            total: 620,
            status: 'Cancelled',
            restaurant: 'Sushi Master',
            items: 4
        },
        {
            id: '#12340',
            date: '11 Jan 2024',
            time: '11:00 AM',
            foods: [
                { name: 'Club Sandwich', quantity: 2, price: 180, icon: GiHamburger },
                { name: 'Caesar Salad', quantity: 1, price: 140, icon: GiHotMeal },
                { name: 'Iced Coffee', quantity: 2, price: 100, icon: BsCupHot }
            ],
            total: 600,
            status: 'Delivered',
            restaurant: 'Cafe Delight',
            items: 5
        },
        {
            id: '#12339',
            date: '10 Jan 2024',
            time: '7:30 PM',
            foods: [
                { name: 'Grilled Chicken', quantity: 1, price: 320, icon: GiChickenLeg },
                { name: 'Mashed Potatoes', quantity: 1, price: 120, icon: GiFrenchFries },
                { name: 'Lemonade', quantity: 2, price: 90, icon: GiDrinkMe }
            ],
            total: 620,
            status: 'Delivered',
            restaurant: 'Grill House',
            items: 4
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'Cooking':
                return 'bg-orange-100 text-orange-700 border border-orange-200';
            case 'Delivered':
                return 'bg-green-100 text-green-700 border border-green-200';
            case 'Completed':
                return 'bg-blue-100 text-blue-700 border border-blue-200';
            case 'Cancelled':
                return 'bg-red-100 text-red-700 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <FaRegClock className="w-3.5 h-3.5" />;
            case 'Cooking':
                return <GiCookingPot className="w-3.5 h-3.5" />;
            case 'Delivered':
                return <MdDeliveryDining className="w-3.5 h-3.5" />;
            case 'Completed':
                return <FaRegCheckCircle className="w-3.5 h-3.5" />;
            case 'Cancelled':
                return <HiOutlineShoppingBag className="w-3.5 h-3.5" />;
            default:
                return <HiOutlineClock className="w-3.5 h-3.5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30">
                            <HiOutlineShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            My Orders
                        </h1>
                    </div>
                    <p className="text-gray-500 ml-16">
                        View and track all your food orders
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Total Orders</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <p className="text-2xl font-bold text-orange-600">{orders.filter(o => o.status === 'Cooking').length}</p>
                        <p className="text-sm text-gray-500 mt-1">Cooking</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'Delivered').length}</p>
                        <p className="text-sm text-gray-500 mt-1">Delivered</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <p className="text-2xl font-bold text-purple-600">${orders.reduce((acc, o) => acc + o.total, 0)}</p>
                        <p className="text-sm text-gray-500 mt-1">Total Spent</p>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Restaurant</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order, index) => (
                                    <tr key={order.id} className="hover:bg-orange-50/30 transition-colors group">
                                        {/* Order ID */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <HiOutlineShoppingBag className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <span className="font-medium text-gray-900">{order.id}</span>
                                            </div>
                                        </td>

                                        {/* Items */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {order.foods.slice(0, 2).map((food, idx) => (
                                                    <div key={idx} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg text-xs">
                                                        <food.icon className="w-3 h-3 text-gray-600" />
                                                        <span className="text-gray-700">{food.quantity}</span>
                                                    </div>
                                                ))}
                                                {order.foods.length > 2 && (
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                                                        +{order.foods.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Restaurant */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <MdOutlineRestaurantMenu className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-700">{order.restaurant}</span>
                                            </div>
                                        </td>

                                        {/* Total */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <HiOutlineCurrencyDollar className="w-4 h-4 text-gray-400" />
                                                <span className="font-semibold text-gray-900">{order.total}</span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <HiOutlineCalendar className="w-4 h-4" />
                                                <span>{order.date}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-xs">{order.time}</span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors group">
                                                    <HiOutlineEye className="w-4 h-4 text-gray-500 group-hover:text-orange-600" />
                                                </button>
                                                {order.status === 'Delivered' && (
                                                    <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors group">
                                                        <HiOutlineStar className="w-4 h-4 text-gray-500 group-hover:text-orange-600" />
                                                    </button>
                                                )}
                                                <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors group">
                                                    <BsThreeDotsVertical className="w-4 h-4 text-gray-500 group-hover:text-orange-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-700">{orders.length}</span> orders
                            </p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm hover:bg-orange-700 transition-all">
                                    1
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                                    2
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                                    3
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;