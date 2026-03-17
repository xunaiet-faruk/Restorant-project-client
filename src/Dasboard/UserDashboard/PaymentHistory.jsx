import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaHistory, FaShoppingBag, FaCalendarAlt,
    FaMoneyBillWave, FaCheckCircle, FaEye,
    FaDownload, FaPrint, FaArrowRight,
    FaWallet, FaClock
} from 'react-icons/fa';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
import UseAxios from '../../Hooks/UseAxios';
import { useNavigate } from 'react-router-dom';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axios = UseAxios();
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, lastMonth, last3Months

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // Fetch delivered orders from BuyCollection
                const ordersRes = await axios.get(`/buyFood/${user.email}`);
                const deliveredOrders = ordersRes.data.filter(order => order.status === 'Delivered');

                // Group orders by transaction ID
                const groupedPayments = deliveredOrders.reduce((acc, order) => {
                    const transId = order.transactionId || 'N/A';
                    if (!acc[transId]) {
                        acc[transId] = {
                            transactionId: transId,
                            date: order.paymentDate || order.orderDate,
                            items: [],
                            total: 0,
                            status: order.status
                        };
                    }
                    acc[transId].items.push({
                        name: order.name,
                        quantity: order.quantity,
                        price: order.price,
                        foodId: order.foodId
                    });
                    acc[transId].total += order.price * order.quantity;
                    return acc;
                }, {});

                const formattedPayments = Object.values(groupedPayments).sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                );

                setPayments(formattedPayments);

            } catch (error) {
                console.error("Error fetching payment history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [user?.email, axios]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filterPayments = () => {
        const now = new Date();
        const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
        const last3Months = new Date(now.setMonth(now.getMonth() - 2));

        switch (filter) {
            case 'lastMonth':
                return payments.filter(p => new Date(p.date) >= lastMonth);
            case 'last3Months':
                return payments.filter(p => new Date(p.date) >= last3Months);
            default:
                return payments;
        }
    };

    const filteredPayments = filterPayments();
    const totalSpent = filteredPayments.reduce((sum, payment) => sum + payment.total, 0);
    const totalOrders = filteredPayments.reduce((sum, payment) => sum + payment.items.length, 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 p-4 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-8"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                            <FaHistory className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Payment <span className="text-amber-500">History</span>
                            </h1>
                            <p className="text-gray-500">
                                View all your completed payments and orders
                            </p>
                        </div>
                    </div>

                    {/* Filter Dropdown */}
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="all">All Time</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="last3Months">Last 3 Months</option>
                    </select>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Payments</p>
                            <p className="text-3xl font-bold text-gray-800">{filteredPayments.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <FaWallet className="text-2xl text-amber-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Items</p>
                            <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <FaShoppingBag className="text-2xl text-amber-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Spent</p>
                            <p className="text-3xl font-bold text-amber-500">৳{totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <FaMoneyBillWave className="text-2xl text-amber-500" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Payment History Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-7xl mx-auto"
            >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                                <tr>
                                    <th className="p-4 text-left">#</th>
                                    <th className="p-4 text-left">Transaction ID</th>
                                    <th className="p-4 text-left">Date & Time</th>
                                    <th className="p-4 text-left">Items</th>
                                    <th className="p-4 text-left">Quantity</th>
                                    <th className="p-4 text-left">Total</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.length > 0 ? (
                                    filteredPayments.map((payment, index) => (
                                        <motion.tr
                                            key={payment.transactionId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-t hover:bg-amber-50 transition-colors"
                                        >
                                            <td className="p-4 font-medium text-gray-600">{index + 1}</td>
                                            <td className="p-4">
                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                    {payment.transactionId.slice(-10)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <FaCalendarAlt className="text-amber-400" />
                                                    <span className="text-sm">{formatDate(payment.date)}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    {payment.items.map((item, i) => (
                                                        <div key={i} className="text-sm font-medium text-gray-800">
                                                            {item.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    {payment.items.map((item, i) => (
                                                        <div key={i} className="text-sm text-gray-600">
                                                            x{item.quantity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-bold text-amber-600">
                                                    ৳{payment.total}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                                                    <FaCheckCircle className="text-xs" />
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => navigate(`/payment/success/${payment.transactionId}`)}
                                                        className="p-2 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors group"
                                                        title="View Details"
                                                    >
                                                        <FaEye className="text-amber-600 group-hover:scale-110 transition-transform" />
                                                    </button>
                                                    <button
                                                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group"
                                                        title="Download Receipt"
                                                    >
                                                        <FaDownload className="text-gray-600 group-hover:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="p-12 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaHistory className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 text-lg font-medium">No payment history found</p>
                                                    <p className="text-gray-400 text-sm mt-1">You haven't made any payments yet</p>
                                                </div>
                                                <button
                                                    onClick={() => navigate('/menu')}
                                                    className="mt-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-medium flex items-center gap-2 hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-200"
                                                >
                                                    Browse Menu
                                                    <FaArrowRight className="text-sm" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Summary */}
                    {filteredPayments.length > 0 && (
                        <div className="p-6 bg-gray-50 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Average Order Value</p>
                                    <p className="text-xl font-bold text-gray-800">
                                        ৳{(totalSpent / filteredPayments.length).toFixed(2)}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Most Ordered</p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {(() => {
                                            const items = filteredPayments.flatMap(p => p.items);
                                            const counts = items.reduce((acc, item) => {
                                                acc[item.name] = (acc[item.name] || 0) + 1;
                                                return acc;
                                            }, {});
                                            const mostOrdered = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                                            return mostOrdered ? mostOrdered[0].slice(0, 15) + '...' : 'N/A';
                                        })()}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Last Payment</p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {filteredPayments.length > 0 ? formatDate(filteredPayments[0].date).split(',')[0] : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Payment Methods</p>
                                    <p className="text-xl font-bold text-gray-800">SSLCommerz</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentHistory;