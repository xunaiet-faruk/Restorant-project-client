import React from 'react';
import {
    HiOutlineCreditCard,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineReceiptRefund,
    HiOutlineDownload,
    HiOutlineMail,
    HiOutlinePrinter,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineClock
} from 'react-icons/hi';
import {
    BsWallet2,
    BsPaypal,
    BsApple,
    BsGoogle,
    BsBank2
} from 'react-icons/bs';
import {
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcDiscover
} from 'react-icons/fa';
import { SiStripe, SiRazorpay } from 'react-icons/si';

const PaymentHistory = () => {
    // Sample payment data
    const payments = [
        {
            id: '#PAY-12345',
            date: '15 Jan 2024',
            time: '10:30 AM',
            orderId: '#12345',
            restaurant: 'Burger House',
            amount: 800,
            paymentMethod: 'Visa',
            paymentIcon: FaCcVisa,
            status: 'Success',
            transactionId: 'TXN789012345',
            cardLast4: '4242'
        },
        {
            id: '#PAY-12344',
            date: '14 Jan 2024',
            time: '7:45 PM',
            orderId: '#12344',
            restaurant: 'Sushi Master',
            amount: 420,
            paymentMethod: 'PayPal',
            paymentIcon: BsPaypal,
            status: 'Success',
            transactionId: 'TXN789012346',
            email: 'user@example.com'
        },
        {
            id: '#PAY-12343',
            date: '14 Jan 2024',
            time: '12:15 PM',
            orderId: '#12343',
            restaurant: 'Fast Food Express',
            amount: 530,
            paymentMethod: 'Mastercard',
            paymentIcon: FaCcMastercard,
            status: 'Success',
            transactionId: 'TXN789012347',
            cardLast4: '5678'
        },
        {
            id: '#PAY-12342',
            date: '13 Jan 2024',
            time: '8:00 PM',
            orderId: '#12342',
            restaurant: 'Pizza Heaven',
            amount: 520,
            paymentMethod: 'Google Pay',
            paymentIcon: BsGoogle,
            status: 'Pending',
            transactionId: 'TXN789012348'
        },
        {
            id: '#PAY-12341',
            date: '12 Jan 2024',
            time: '6:30 PM',
            orderId: '#12341',
            restaurant: 'Sushi Master',
            amount: 620,
            paymentMethod: 'Apple Pay',
            paymentIcon: BsApple,
            status: 'Success',
            transactionId: 'TXN789012349'
        },
        {
            id: '#PAY-12340',
            date: '11 Jan 2024',
            time: '11:00 AM',
            orderId: '#12340',
            restaurant: 'Cafe Delight',
            amount: 600,
            paymentMethod: 'Stripe',
            paymentIcon: SiStripe,
            status: 'Failed',
            transactionId: 'TXN789012350',
            errorMessage: 'Insufficient funds'
        },
        {
            id: '#PAY-12339',
            date: '10 Jan 2024',
            time: '7:30 PM',
            orderId: '#12339',
            restaurant: 'Grill House',
            amount: 620,
            paymentMethod: 'American Express',
            paymentIcon: FaCcAmex,
            status: 'Refunded',
            transactionId: 'TXN789012351',
            cardLast4: '9012',
            refundDate: '11 Jan 2024'
        },
        {
            id: '#PAY-12338',
            date: '09 Jan 2024',
            time: '1:15 PM',
            orderId: '#12338',
            restaurant: 'Taco Fiesta',
            amount: 380,
            paymentMethod: 'Discover',
            paymentIcon: FaCcDiscover,
            status: 'Success',
            transactionId: 'TXN789012352',
            cardLast4: '3456'
        },
        {
            id: '#PAY-12337',
            date: '08 Jan 2024',
            time: '6:45 PM',
            orderId: '#12337',
            restaurant: 'Pasta Paradise',
            amount: 750,
            paymentMethod: 'Bank Transfer',
            paymentIcon: BsBank2,
            status: 'Success',
            transactionId: 'TXN789012353'
        },
        {
            id: '#PAY-12336',
            date: '07 Jan 2024',
            time: '9:20 AM',
            orderId: '#12336',
            restaurant: 'Breakfast Club',
            amount: 280,
            paymentMethod: 'Razorpay',
            paymentIcon: SiRazorpay,
            status: 'Success',
            transactionId: 'TXN789012354'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Success':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    border: 'border-green-200',
                    icon: HiOutlineCheckCircle
                };
            case 'Pending':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-700',
                    border: 'border-yellow-200',
                    icon: HiOutlineClock
                };
            case 'Failed':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-700',
                    border: 'border-red-200',
                    icon: HiOutlineXCircle
                };
            case 'Refunded':
                return {
                    bg: 'bg-purple-100',
                    text: 'text-purple-700',
                    border: 'border-purple-200',
                    icon: HiOutlineReceiptRefund
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    border: 'border-gray-200',
                    icon: HiOutlineClock
                };
        }
    };

    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/30">
                            <HiOutlineCreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Payment History
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Track all your transactions and payment details
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <HiOutlineCreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Transactions</p>
                                <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <HiOutlineCurrencyDollar className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${formatAmount(payments.reduce((acc, p) => acc + (p.status === 'Success' ? p.amount : 0), 0))}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <HiOutlineCheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Successful</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {payments.filter(p => p.status === 'Success').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <HiOutlineReceiptRefund className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Refunded</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {payments.filter(p => p.status === 'Refunded').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                    {[
                        { icon: FaCcVisa, name: 'Visa', count: 3, color: 'text-blue-600' },
                        { icon: FaCcMastercard, name: 'Mastercard', count: 2, color: 'text-orange-600' },
                        { icon: BsPaypal, name: 'PayPal', count: 1, color: 'text-blue-700' },
                        { icon: BsGoogle, name: 'Google Pay', count: 1, color: 'text-green-600' },
                        { icon: BsApple, name: 'Apple Pay', count: 1, color: 'text-gray-800' },
                        { icon: SiStripe, name: 'Stripe', count: 1, color: 'text-purple-600' }
                    ].map((method, index) => (
                        <div key={index} className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group">
                            <method.icon className={`w-6 h-6 ${method.color} mx-auto mb-1 group-hover:scale-110 transition-transform`} />
                            <p className="text-xs text-gray-500">{method.name}</p>
                            <p className="text-sm font-semibold text-gray-900">{method.count} used</p>
                        </div>
                    ))}
                </div>

                {/* Payment History Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm text-gray-600 hover:bg-purple-600 hover:text-white transition-all">
                                    <HiOutlineDownload className="w-4 h-4" />
                                    Export
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm text-gray-600 hover:bg-purple-600 hover:text-white transition-all">
                                    <HiOutlinePrinter className="w-4 h-4" />
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Restaurant</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Method</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments.map((payment) => {
                                    const statusStyle = getStatusColor(payment.status);
                                    const StatusIcon = statusStyle.icon;
                                    const PaymentIcon = payment.paymentIcon;

                                    return (
                                        <tr key={payment.id} className="hover:bg-purple-50/30 transition-colors group">
                                            {/* Payment ID */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <HiOutlineCreditCard className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{payment.id}</span>
                                                </div>
                                            </td>

                                            {/* Date & Time */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{payment.date}</p>
                                                        <p className="text-xs text-gray-500">{payment.time}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Order ID */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg">
                                                    {payment.orderId}
                                                </span>
                                            </td>

                                            {/* Restaurant */}
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-700">{payment.restaurant}</p>
                                            </td>

                                            {/* Payment Method */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <PaymentIcon className="w-5 h-5 text-gray-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{payment.paymentMethod}</p>
                                                        {payment.cardLast4 && (
                                                            <p className="text-xs text-gray-500">•••• {payment.cardLast4}</p>
                                                        )}
                                                        {payment.email && (
                                                            <p className="text-xs text-gray-500">{payment.email}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <HiOutlineCurrencyDollar className="w-4 h-4 text-gray-400" />
                                                    <span className="font-semibold text-gray-900">
                                                        ${formatAmount(payment.amount)}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {payment.status}
                                                </span>
                                                {payment.refundDate && (
                                                    <p className="text-xs text-gray-500 mt-1">Refunded: {payment.refundDate}</p>
                                                )}
                                                {payment.errorMessage && (
                                                    <p className="text-xs text-red-500 mt-1">{payment.errorMessage}</p>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors group" title="View Details">
                                                        <HiOutlineCreditCard className="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                                                    </button>
                                                    <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors group" title="Download Receipt">
                                                        <HiOutlineDownload className="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                                                    </button>
                                                    <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors group" title="Email Receipt">
                                                        <HiOutlineMail className="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-700">1-{payments.length}</span> of <span className="font-medium text-gray-700">{payments.length}</span> transactions
                            </p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-700 transition-all">
                                    1
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                                    2
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                                    3
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Summary */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FaCcVisa className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">Visa ending in 4242</p>
                                        <p className="text-xs text-gray-500">Expires 12/25</p>
                                    </div>
                                </div>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Default</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <BsPaypal className="w-8 h-8 text-blue-700" />
                                    <div>
                                        <p className="font-medium text-gray-900">PayPal</p>
                                        <p className="text-xs text-gray-500">user@example.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Refunds</h3>
                        <div className="space-y-3">
                            {payments.filter(p => p.status === 'Refunded').map((payment, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{payment.orderId}</p>
                                        <p className="text-xs text-gray-500">{payment.restaurant}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-purple-600">${formatAmount(payment.amount)}</p>
                                        <p className="text-xs text-gray-500">{payment.refundDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;