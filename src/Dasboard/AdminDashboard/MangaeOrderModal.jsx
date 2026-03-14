import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX, FiMail, FiCalendar, FiDollarSign,
    FiPackage, FiCreditCard, FiUser, FiClock,
    FiMapPin, FiPhone
} from 'react-icons/fi';

const MangaeOrderModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
            >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-amber-500 p-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FiPackage className="text-white" />
                            Order Details
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                        >
                            <FiX className="text-2xl" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Order Status Badge */}
                        <div className="flex justify-end">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                order.status === "Processing" ? "bg-blue-100 text-amber-500" :
                                        order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                            "bg-yellow-100 text-yellow-700"
                                }`}>
                                {order.status || "Pending"}
                            </span>
                        </div>

                        {/* Food Item Section */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <FiPackage className="text-amber-500" />
                                Food Item
                            </h3>
                            <div className="flex gap-4">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/96';
                                    }}
                                />
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-gray-800">{order.name}</h4>
                                    <p className="text-gray-600 mt-1 line-clamp-2">{order.recipe}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <FiUser className="text-blue-600" />
                                    Customer Info
                                </h3>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiMail className="text-gray-400" />
                                        {order.email}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiPhone className="text-gray-400" />
                                        {order.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <FiCreditCard className="text-amber-500" />
                                    Payment Info
                                </h3>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiDollarSign className="text-gray-400" />
                                        Price: ৳{order.price}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiPackage className="text-gray-400" />
                                        Quantity: {order.quantity}
                                    </p>
                                    <p className="flex items-center gap-2 font-semibold text-amber-500">
                                        <FiDollarSign className="text-amber-500" />
                                        Total: ৳{order.price * order.quantity}
                                    </p>
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="bg-gray-50 rounded-xl p-4 ">
                                <h3 className="font-semibold text-gray-700 mb-3 flex items-center  gap-2">
                                    <FiClock className="text-amber-500" />
                                    Order Details
                                </h3>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiCalendar className="text-gray-400" />
                                        Order Date: {new Date(order.orderDate).toLocaleDateString()}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FiClock className="text-gray-400" />
                                        Order Time: {new Date(order.orderDate).toLocaleTimeString()}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                                        Food ID: {order.foodId || "N/A"}
                                    </p>
                                </div>
                            </div>

                            
                        </div>

                       
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end border-t">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
                        >
                            Close
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MangaeOrderModal;