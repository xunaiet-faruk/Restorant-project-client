import React, { useContext, useEffect, useState } from 'react';
import {
    HiOutlineShoppingBag,
    HiOutlineEye,
    HiOutlineTrash,
    HiOutlineCalendar,
    HiOutlineCurrencyDollar,
    HiOutlineClock
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
    MdOutlineRestaurantMenu,
    MdClose
} from 'react-icons/md';
import {
    BsCupHot,
    BsThreeDotsVertical
} from 'react-icons/bs';
import { FaRegClock, FaRegCheckCircle } from 'react-icons/fa';
import UseAxios from '../../Hooks/UseAxios';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const axios = UseAxios();

    // Map food items to icons based on name
    const getFoodIcon = (foodName) => {
        const name = foodName?.toLowerCase() || '';
        if (name.includes('pizza')) return GiFullPizza;
        if (name.includes('burger')) return GiHamburger;
        if (name.includes('fries') || name.includes('fry')) return GiFrenchFries;
        if (name.includes('sushi')) return GiSushis;
        if (name.includes('drink') || name.includes('soda') || name.includes('juice') || name.includes('water')) return GiDrinkMe;
        if (name.includes('coffee') || name.includes('tea')) return BsCupHot;
        if (name.includes('chicken')) return GiChickenLeg;
        if (name.includes('fish') || name.includes('haddock') || name.includes('tuna')) return GiHotMeal;
        return GiHotMeal; // default icon
    };

    useEffect(() => {
        if (user?.email) {
            fetchOrders();
        }
    }, [user?.email]);

    const fetchOrders = () => {
        setLoading(true);
        axios.get(`/buyFood/${user.email}`)
            .then(res => {
              
                const formattedOrders = res.data.map(order => ({
                    _id: order._id,
                    foodId: order.foodId,
                    name: order.name,
                    image: order.image,
                    price: order.price,
                    recipe: order.recipe,
                    quantity: order.quantity,
                    email: order.email,
                    status: order.status,
                    orderDate: order.orderDate,
                    // Format date for display
                    displayDate: new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    displayTime: new Date(order.orderDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    
                }));
                setOrders(formattedOrders);
              
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load orders. Please try again.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteOrder = (orderId, foodName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to cancel order for ${foodName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/buyFood/${orderId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setOrders(orders.filter(order => order._id !== orderId));
                            Swal.fire({
                                icon: 'success',
                                title: 'Cancelled!',
                                text: 'Your order has been cancelled.',
                                timer: 1500,
                                showConfirmButton: false
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting order:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to cancel order. Please try again.',
                        });
                    });
            }
        });
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderDetails(true);
    };

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'cooking':
            case 'preparing':
                return 'bg-orange-100 text-orange-700 border border-orange-200';
            case 'delivered':
                return 'bg-green-100 text-green-700 border border-green-200';
            case 'completed':
                return 'bg-blue-100 text-blue-700 border border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'pending':
                return <FaRegClock className="w-3.5 h-3.5" />;
            case 'cooking':
            case 'preparing':
                return <GiCookingPot className="w-3.5 h-3.5" />;
            case 'delivered':
                return <MdDeliveryDining className="w-3.5 h-3.5" />;
            case 'completed':
                return <FaRegCheckCircle className="w-3.5 h-3.5" />;
            case 'cancelled':
                return <HiOutlineShoppingBag className="w-3.5 h-3.5" />;
            default:
                return <HiOutlineClock className="w-3.5 h-3.5" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

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
                        <p className="text-2xl font-bold text-orange-600">
                            {orders.filter(o => o.status?.toLowerCase() === 'pending').length}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Pending</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <p className="text-2xl font-bold text-green-600">
                            {orders.filter(o => o.status?.toLowerCase() === 'delivered').length}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Delivered</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <p className="text-2xl font-bold text-purple-600">
                            ${orders.reduce((acc, o) => acc + (o.price * o.quantity || 0), 0).toFixed(2)}
                        </p>
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
                    {orders.length === 0 ? (
                        <div className="text-center py-16">
                            <HiOutlineShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
                            <p className="text-gray-500">When you place orders, they will appear here</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Food Item</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order, index) => {
                                        const IconComponent = getFoodIcon(order.name);
                                        const totalPrice = (order.price * order.quantity).toFixed(2);

                                        return (
                                            <tr key={order._id || index} className="hover:bg-orange-50/30 transition-colors group">
                                                {/* Food Item with Image */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                                            <img
                                                                src={order.image}
                                                                alt={order.name}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-gray-900 block">{order.name}</span>
                                                            <span className="text-xs text-gray-400">ID: {order._id?.slice(-8)}</span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Price */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineCurrencyDollar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-700">{order.price.toFixed(2)}</span>
                                                    </div>
                                                </td>

                                                {/* Quantity */}
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-700">x{order.quantity}</span>
                                                </td>

                                             

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        <span className="capitalize">{order.status}</span>
                                                    </span>
                                                </td>

                                                {/* Order Date */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <HiOutlineCalendar className="w-4 h-4" />
                                                        <span>{order.displayDate}</span>
                                                        <span className="text-gray-300">•</span>
                                                        <span className="text-xs">{order.displayTime}</span>
                                                    </div>
                                                </td>

                                                {/* Actions - Only Eye and Delete */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {/* Eye Button - View Details */}
                                                        <button
                                                            onClick={() => handleViewDetails(order)}
                                                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                                                            title="View Details"
                                                        >
                                                            <HiOutlineEye className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                                                        </button>

                                                        {/* Delete Button - Cancel Order */}
                                                        <button
                                                            onClick={() => handleDeleteOrder(order._id, order.name)}
                                                            className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                                                            title="Cancel Order"
                                                        >
                                                            <HiOutlineTrash className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {showOrderDetails && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                                <button
                                    onClick={() => setShowOrderDetails(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <MdClose className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Food Image */}
                            <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
                                <img
                                    src={selectedOrder.image}
                                    alt={selectedOrder.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Order Information */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Food Name</h4>
                                    <p className="text-lg font-semibold text-gray-900">{selectedOrder.name}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-400 mb-1">Price</h4>
                                        <p className="text-lg font-semibold text-orange-600">${selectedOrder.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-400 mb-1">Quantity</h4>
                                        <p className="text-lg font-semibold text-gray-900">{selectedOrder.quantity}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Total Amount</h4>
                                    <p className="text-2xl font-bold text-orange-600">
                                        ${(selectedOrder.price * selectedOrder.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Status</h4>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusIcon(selectedOrder.status)}
                                        <span className="capitalize">{selectedOrder.status}</span>
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Recipe / Description</h4>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">{selectedOrder.recipe}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-400 mb-1">Order Date</h4>
                                        <p className="text-gray-900">{selectedOrder.displayDate}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-400 mb-1">Order Time</h4>
                                        <p className="text-gray-900">{selectedOrder.displayTime}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Order ID</h4>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                                        {selectedOrder._id}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Food ID</h4>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                                        {selectedOrder.foodId}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
                            <button
                                onClick={() => setShowOrderDetails(false)}
                                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;