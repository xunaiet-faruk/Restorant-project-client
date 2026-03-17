// Paysuccess.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Paysuccess = () => {
    const { tranID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("✅ Payment Success for Transaction:", tranID);
        
    }, [tranID]);

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <FaCheckCircle className="text-5xl text-amber-500" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-4">
                    Transaction ID: <span className="font-mono font-bold text-green-600">{tranID}</span>
                </p>
                <p className="text-gray-500 mb-6">
                    Thank you for your payment. Your order has been confirmed.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="w-full  bg-amber-500  text-white py-3 rounded-xl font-semibold "
                >
                    Go to Home
                </button>
            </motion.div>
        </div>
    );
};

export default Paysuccess;