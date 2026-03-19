import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaHistory, FaShoppingBag, FaCalendarAlt,
    FaMoneyBillWave, FaCheckCircle, FaEye,
    FaDownload, FaArrowRight,
    FaWallet, FaClock, FaUtensils
} from 'react-icons/fa';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
import UseAxios from '../../Hooks/UseAxios';
import { useNavigate } from 'react-router-dom';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axios = UseAxios();
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState({
        payments: [],
        orders: [],
        totalSpent: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // নতুন API কল
                const response = await axios.get(`/payment/history/${user.email}`);
                console.log("📥 Payment History Data:", response.data);

                setPaymentData(response.data);

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

    // ফিল্টার অনুযায়ী অর্ডার ফিল্টার করুন
    const filterOrders = () => {
        const now = new Date();
        const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
        const last3Months = new Date(now.setMonth(now.getMonth() - 2));

        switch (filter) {
            case 'lastMonth':
                return paymentData.orders.filter(o => new Date(o.paymentDate || o.orderDate) >= lastMonth);
            case 'last3Months':
                return paymentData.orders.filter(o => new Date(o.paymentDate || o.orderDate) >= last3Months);
            default:
                return paymentData.orders;
        }
    };

    const filteredOrders = filterOrders();
    const filteredTotal = filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0);

    // গ্রুপ অর্ডার by transaction ID
    const groupedTransactions = filteredOrders.reduce((acc, order) => {
        const transId = order.transactionId || 'N/A';
        if (!acc[transId]) {
            acc[transId] = {
                transactionId: transId,
                date: order.paymentDate || order.orderDate,
                items: [],
                total: 0
            };
        }
        acc[transId].items.push(order);
        acc[transId].total += order.price * order.quantity;
        return acc;
    }, {});

    const transactions = Object.values(groupedTransactions).sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

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
                                You have made <span className="font-bold text-amber-600">{paymentData.totalOrders}</span> payments totaling{' '}
                                <span className="font-bold text-amber-600">৳{paymentData.totalSpent.toFixed(2)}</span>
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
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Payments</p>
                            <p className="text-3xl font-bold text-gray-800">{paymentData.payments.length}</p>
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
                            <p className="text-3xl font-bold text-gray-800">{paymentData.totalOrders}</p>
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
                            <p className="text-3xl font-bold text-amber-500">৳{paymentData.totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <FaMoneyBillWave className="text-2xl text-amber-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Avg. per Order</p>
                            <p className="text-3xl font-bold text-gray-800">
                                ৳{(paymentData.totalSpent / (paymentData.totalOrders || 1)).toFixed(2)}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <FaClock className="text-2xl text-amber-500" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Transactions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-7xl mx-auto"
            >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <FaUtensils className="text-amber-500" />
                            Transaction History ({transactions.length})
                        </h2>
                    </div>

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
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <motion.tr
                                            key={transaction.transactionId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-t hover:bg-amber-50 transition-colors"
                                        >
                                            <td className="p-4 font-medium text-gray-600">{index + 1}</td>
                                            <td className="p-4">
                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                    {transaction.transactionId.slice(-10)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <FaCalendarAlt className="text-amber-400" />
                                                    <span className="text-sm">{formatDate(transaction.date)}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    {transaction.items.map((item, i) => (
                                                        <div key={i} className="text-sm font-medium text-gray-800">
                                                            {item.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    {transaction.items.map((item, i) => (
                                                        <div key={i} className="text-sm text-gray-600">
                                                            x{item.quantity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-bold text-amber-600">
                                                    ৳{transaction.total}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => navigate(`/payment/success/${transaction.transactionId}`)}
                                                    className="p-2 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors group"
                                                    title="View Details"
                                                >
                                                    <FaEye className="text-amber-600 group-hover:scale-110 transition-transform" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-12 text-center">
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

                    {/* Summary */}
                    {transactions.length > 0 && (
                        <div className="p-6 bg-amber-50 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Payment Summary</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Transactions:</span>
                                            <span className="font-bold">{transactions.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Items:</span>
                                            <span className="font-bold">{filteredOrders.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Amount:</span>
                                            <span className="font-bold text-amber-600">৳{filteredTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Most Popular Items</p>
                                    <div className="space-y-2">
                                        {Object.entries(
                                            filteredOrders.reduce((acc, order) => {
                                                acc[order.name] = (acc[order.name] || 0) + order.quantity;
                                                return acc;
                                            }, {})
                                        )
                                            .sort((a, b) => b[1] - a[1])
                                            .slice(0, 3)
                                            .map(([name, count]) => (
                                                <div key={name} className="flex justify-between">
                                                    <span className="text-gray-600">{name}:</span>
                                                    <span className="font-bold">{count} pcs</span>
                                                </div>
                                            ))}
                                    </div>
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