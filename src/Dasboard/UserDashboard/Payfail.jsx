import React from 'react';
import { motion } from 'framer-motion';
import {
    FaTimesCircle, FaExclamationTriangle,
    FaHome, FaRedo, FaCreditCard, FaHeadset,
    FaArrowLeft
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Payfail = () => {
    const navigate = useNavigate();

    const { tranID } = useParams();

    const failReasons = [
        "Insufficient balance",
        "Transaction timeout",
        "Invalid card details",
        "Network error",
        "Payment gateway issue"
    ];

    return (
        <div className="min-h-screen   flex items-center justify-center p-4">
            {/* Main Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
                {/* Red Top Bar */}
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>

                <div className="p-8">
                    {/* Animated Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative"
                    >
                        <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                            >
                                <FaTimesCircle className="text-6xl text-red-500" />
                            </motion.div>
                        </div>

                        {/* Warning Badge */}
                        <motion.div
                            initial={{ scale: 0, x: 20, y: -20 }}
                            animate={{ scale: 1, x: 20, y: -20 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="absolute top-0 right-1/2 transform translate-x-16"
                        >
                            <div className="bg-yellow-400 rounded-full p-2 shadow-lg">
                                <FaExclamationTriangle className="text-white text-sm" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="text-center mb-8">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                        >
                            Payment <span className="text-red-500">Failed!</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 mb-4"
                        >
                            We couldn't process your payment. Please try again.
                        </motion.p>

                        {/* Transaction ID Placeholder */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-red-50 rounded-xl p-3 inline-block"
                        >
                            <p className="text-sm text-gray-600">
                                Transaction ID: <span className="font-mono text-red-500 font-semibold">TXN : {tranID}</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Possible Reasons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-50 rounded-xl p-5 mb-6"
                    >
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <FaExclamationTriangle className="text-yellow-500" />
                            Possible Reasons:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {failReasons.map((reason, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 + (index * 0.1) }}
                                    className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                    {reason}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-3"
                    >
                        {/* Try Again Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/dashboard/payment')}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-200"
                        >
                            <FaRedo className="animate-spin-slow" />
                            <Link to={'/payment'}> Try Again</Link>
                        </motion.button>

                        {/* Other Options */}
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/')}
                                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                            >
                                <FaHome />
                                Home
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/dashboard/myorders')}
                                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                            >
                                <FaCreditCard />
                                Orders
                            </motion.button>
                        </div>

                        {/* Support Link */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => navigate('/support')}
                            className="w-full mt-2 text-gray-500 text-sm flex items-center justify-center gap-2 hover:text-red-500 transition-colors"
                        >
                            <FaHeadset />
                            Need help? Contact Support
                            <FaArrowLeft className="rotate-180 text-xs" />
                        </motion.button>
                    </motion.div>

                    {/* Security Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-xs text-gray-400">
                            🔒 No money has been deducted from your account
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Payfail;