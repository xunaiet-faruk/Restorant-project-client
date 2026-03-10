import React, { useState } from 'react';
import { FiEye, FiTrash2, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ManageOrder = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            user: 'Faruk Hossain',
            foods: [
                { name: 'Burger', quantity: 2, price: 450 },
                { name: 'Pizza', quantity: 1, price: 650 }
            ],
            totalPrice: 800,
            payment: 'Paid',
            status: 'Pending',
            date: '2024-03-11',
            time: '7:30 PM'
        },
        {
            id: 2,
            user: 'Rima Akter',
            foods: [
                { name: 'Chicken Fry', quantity: 1, price: 320 },
                { name: 'Fried Rice', quantity: 1, price: 280 },
                { name: 'Cold Drinks', quantity: 2, price: 120 }
            ],
            totalPrice: 720,
            payment: 'Unpaid',
            status: 'Processing',
            date: '2024-03-11',
            time: '8:15 PM'
        },
        {
            id: 3,
            user: 'Shahin Alam',
            foods: [
                { name: 'Beef Steak', quantity: 1, price: 1200 },
                { name: 'Soup', quantity: 1, price: 180 }
            ],
            totalPrice: 1380,
            payment: 'Paid',
            status: 'Delivered',
            date: '2024-03-11',
            time: '6:45 PM'
        },
        {
            id: 4,
            user: 'Nusrat Jahan',
            foods: [
                { name: 'Chicken Burger', quantity: 3, price: 450 },
                { name: 'French Fries', quantity: 2, price: 150 }
            ],
            totalPrice: 1650,
            payment: 'Paid',
            status: 'Cancelled',
            date: '2024-03-11',
            time: '5:20 PM'
        },
        {
            id: 5,
            user: 'Rafiq Islam',
            foods: [
                { name: 'Kacchi Biryani', quantity: 2, price: 550 }
            ],
            totalPrice: 1100,
            payment: 'Unpaid',
            status: 'Pending',
            date: '2024-03-11',
            time: '9:00 PM'
        }
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const statusOptions = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
    const paymentOptions = ['Paid', 'Unpaid'];

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesSearch = order.user.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Handle status update
    const handleStatusUpdate = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    // Handle delete
    const handleDelete = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            setOrders(orders.filter(order => order.id !== orderId));
        }
    };

    // Handle view
    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-600 border-yellow-200';
            case 'Processing':
                return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'Delivered':
                return 'bg-green-100 text-green-600 border-green-200';
            case 'Cancelled':
                return 'bg-red-100 text-red-600 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    // Get payment badge color
    const getPaymentBadge = (payment) => {
        return payment === 'Paid'
            ? 'bg-green-100 text-green-600 border-green-200'
            : 'bg-orange-100 text-orange-600 border-orange-200';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Orders</h1>
                <p className="text-sm text-gray-500 mt-1">Total Orders: {orders.length}</p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by customer name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                    <option value="all">All Status</option>
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Foods</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Payment</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{order.user}</p>
                                            <p className="text-xs text-gray-500">{order.date} | {order.time}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            {order.foods.map((food, index) => (
                                                <p key={index} className="text-sm text-gray-600">
                                                    {food.name} x{food.quantity}
                                                </p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-800">৳{order.totalPrice}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentBadge(order.payment)}`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.status)} focus:outline-none cursor-pointer`}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleView(order)}
                                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View Order"
                                            >
                                                <FiEye className="w-4 h-4 text-blue-500" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Order"
                                            >
                                                <FiTrash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiClock className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter</p>
                    </div>
                )}
            </div>

            {/* View Order Modal */}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <FiXCircle className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Customer Info */}
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Customer</p>
                                    <p className="font-semibold text-gray-800">{selectedOrder.user}</p>
                                    <p className="text-xs text-gray-500 mt-1">{selectedOrder.date} | {selectedOrder.time}</p>
                                </div>

                                {/* Foods List */}
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500 mb-2">Order Items</p>
                                    <div className="space-y-2">
                                        {selectedOrder.foods.map((food, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <span className="text-gray-700">
                                                    {food.name} x{food.quantity}
                                                </span>
                                                <span className="font-medium">৳{food.price * food.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-2">Payment</p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentBadge(selectedOrder.payment)}`}>
                                            {selectedOrder.payment}
                                        </span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-2">Status</p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedOrder.status)}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-amber-50 p-4 rounded-xl flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">Total Amount</p>
                                    <p className="text-xl font-bold text-amber-600">৳{selectedOrder.totalPrice}</p>
                                </div>

                                {/* Update Status */}
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Update Status</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {statusOptions.map(status => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    handleStatusUpdate(selectedOrder.id, status);
                                                    setSelectedOrder({ ...selectedOrder, status });
                                                }}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                                                    ${selectedOrder.status === status
                                                        ? 'bg-amber-500 text-white'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrder;