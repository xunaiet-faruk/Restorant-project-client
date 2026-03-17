import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaLock, FaShieldAlt, FaCreditCard,
    FaMobileAlt, FaWallet, FaArrowRight,
    FaCheckCircle, FaLockOpen,
    FaMoneyBillAlt, FaUser, FaMapMarkerAlt,
    FaPhone, FaEnvelope
} from 'react-icons/fa';
import { MdPayment, MdSecurity } from 'react-icons/md';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
import UseAxios from '../../Hooks/UseAxios';

const Pay = () => {
    const { user } = useContext(AuthContext);
    const axios = UseAxios();
    const [userOrders, setUserOrders] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });
    useEffect(() => {
        const fetchUserData = async () => {
            // যদি user না থাকে, তাহলে লোডিং false করে return
            if (!user?.email) {
                setLoading(false);  // ✅ FIX: user না থাকলেও লোডিং বন্ধ করো
                return;
            }

            try {
                setLoading(true);  // লোডিং শুরু

                // ইউজারের প্রোফাইল এবং অর্ডার একসাথে ফেচ করুন
                const [profileRes, ordersRes] = await Promise.all([
                    axios.get(`/user/${user.email}`),
                    axios.get(`/buyFood/${user.email}`)
                ]);

                setUserProfile(profileRes.data);

                // শুধু পেন্ডিং অর্ডারগুলো নিন
                const pendingOrders = ordersRes.data.filter(order => order.status === 'pending');
                setUserOrders(pendingOrders);

                // ইউজারের প্রোফাইল থেকে ফোন এবং অ্যাড্রেস সেট করুন (যদি থাকে)
                if (profileRes.data) {
                    setFormData({
                        phone: profileRes.data.phone || '',
                        address: profileRes.data.address || '',
                        city: profileRes.data.city || '',
                        postalCode: profileRes.data.postalCode || ''
                    });
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);  // ✅ সবসময় false হবে
            }
        };

        fetchUserData();
    }, [user?.email, axios]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const paymentSummary = {
        items: userOrders.map(order => ({
            _id: order._id,
            name: order.name,
            quantity: order.quantity,
            price: order.price,
            image: order.image
        })),
        deliveryCharge: 60,
        discount: userOrders.length > 0 ? 100 : 0,
        vat: 125
    };

    const paymentMethods = [
        { id: 'bkash', name: 'bKash', icon: FaMobileAlt, color: 'pink' },
        { id: 'nagad', name: 'Nagad', icon: FaMobileAlt, color: 'orange' },
        { id: 'card', name: 'Credit Card', icon: FaCreditCard, color: 'blue' },
        { id: 'wallet', name: 'Wallet', icon: FaWallet, color: 'amber' }
    ];

    const calculateSubtotal = () => {
        return paymentSummary.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + paymentSummary.deliveryCharge - paymentSummary.discount + paymentSummary.vat;
    };
    const handlePay = async () => {
        try {
            const productIds = paymentSummary.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                foodId: item._id,
            }));

            const paymentInfo = {
                email: user?.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                price: calculateTotal(),
                cus_name: user?.displayName || user?.email?.split('@')[0] || 'Customer',
                transactionId: "",
                date: new Date(),
                products: productIds,
                status: "pending"
            };
            const response = await axios.post('/create-ssl-payment', paymentInfo);

            console.log("📥 Response:", response.data);

            if (response.data?.url) {
                console.log("✅ Redirecting to:", response.data.url);
                window.location.href = response.data.url;
            } else {
                console.error("❌ No URL:", response.data);
                alert("Payment failed: " + (response.data?.error || 'Unknown error'));
            }

        } catch (error) {
            console.error("❌ Error:", error);
            alert("Payment error: " + error.message);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 p-4 md:p-8">
            {/* হেডার */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-8"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                        <MdPayment className="text-2xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Secure <span className="text-amber-500">Checkout</span>
                        </h1>
                        <p className="text-gray-500 flex items-center gap-2 mt-1">
                            <FaLock className="text-amber-500" />
                            Powered by SSLCommerz - 256-bit Secure Payment
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* SSLCommerz ব্যাজ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-7xl mx-auto mb-6"
            >
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaShieldAlt className="text-3xl text-white" />
                        <div>
                            <p className="text-white font-semibold">SSLCommerz Secure Payment</p>
                            <p className="text-amber-100 text-sm">Your payment is encrypted and secure</p>
                        </div>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-xl">
                        <FaLockOpen className="text-white text-xl" />
                    </div>
                </div>
            </motion.div>

            {/* মূল কন্টেন্ট */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* বাম সাইড - পেমেন্ট ফর্ম */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* ফর্ম হেডার */}
                        <div className="bg-amber-500 p-4">
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <FaWallet />
                                Payment Details
                            </h3>
                        </div>

                        {/* পেমেন্ট ফর্ম */}
                        <div className="p-6 space-y-4">
                            {/* ইউজারের ইমেইল */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaEnvelope className="inline mr-2 text-amber-500" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    readOnly
                                />
                            </div>

                            {/* ফোন নাম্বার */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaPhone className="inline mr-2 text-amber-500" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            {/* অ্যাড্রেস */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaMapMarkerAlt className="inline mr-2 text-amber-500" />
                                    Delivery Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Enter your full address"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            {/* সিটি এবং পোস্টাল কোড */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="Postal Code"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>
                            </div>

                            {/* পেমেন্ট মেথড সিলেক্ট */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Payment Method
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <button
                                                key={method.id}
                                                className={`p-4 border-2 rounded-xl hover:border-amber-500 transition-all group
                                                    ${method.id === 'bkash' ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                                            >
                                                <Icon className={`w-6 h-6 mx-auto mb-2 text-${method.color}-600`} />
                                                <span className="text-xs font-medium">{method.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* SSLCommerz লোগো */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaMoneyBillAlt className="text-amber-500 text-xl" />
                                        <span className="text-sm text-gray-600">Secured by SSLCommerz</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <img src="https://www.sslcommerz.com/images/logo.png" alt="SSLCommerz" className="h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* পেমেন্ট বাটন */}
                            <button
                                onClick={handlePay}
                                disabled={userOrders.length === 0}
                                className={`w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${userOrders.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Pay ৳{calculateTotal().toLocaleString()} via SSLCommerz
                                <FaArrowRight />
                            </button>

                            {userOrders.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">No pending orders to pay</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* ডান সাইড - অর্ডার সামারি */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
                        {/* সামারি হেডার */}
                        <div className="bg-amber-500 p-4">
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <FaCheckCircle />
                                Order Summary
                            </h3>
                        </div>

                        {/* আইটেম লিস্ট */}
                        <div className="p-6">
                            {paymentSummary.items.length > 0 ? (
                                <>
                                    <div className="space-y-3 mb-4">
                                        {paymentSummary.items.map((item, index) => (
                                            <div key={item._id} className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-gray-800">{item.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">৳{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* প্রাইস ব্রেকডাউন */}
                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>৳{calculateSubtotal()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery Charge</span>
                                            <span>+ ৳{paymentSummary.deliveryCharge}</span>
                                        </div>
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>- ৳{paymentSummary.discount}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>VAT (10%)</span>
                                            <span>+ ৳{paymentSummary.vat}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span className="text-amber-500">৳{calculateTotal().toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* কাস্টমার ইনফো প্রিভিউ */}
                                    {(formData.phone || formData.address) && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Delivery Info:</p>
                                            {formData.phone && (
                                                <p className="text-xs text-gray-600 flex items-center gap-2">
                                                    <FaPhone className="text-amber-500" /> {formData.phone}
                                                </p>
                                            )}
                                            {formData.address && (
                                                <p className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                                                    <FaMapMarkerAlt className="text-amber-500" /> {formData.address}
                                                    {formData.city && `, ${formData.city}`}
                                                    {formData.postalCode && ` - ${formData.postalCode}`}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <FaMoneyBillAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No items to checkout</p>
                                </div>
                            )}

                            {/* পেমেন্ট ইনফো */}
                            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                                <p className="text-xs text-gray-600 flex items-center gap-2">
                                    <FaLock className="text-amber-500" />
                                    Your payment information is encrypted with 256-bit SSL security
                                </p>
                            </div>

                            {/* ট্রাস্ট ব্যাজ */}
                            <div className="mt-4 flex justify-center gap-2">
                                <img src="https://www.sslcommerz.com/images/visa.svg" alt="Visa" className="h-6" />
                                <img src="https://www.sslcommerz.com/images/mastercard.svg" alt="Mastercard" className="h-6" />
                                <img src="https://www.sslcommerz.com/images/amex.svg" alt="Amex" className="h-6" />
                                <img src="https://www.sslcommerz.com/images/bkash.svg" alt="bKash" className="h-6" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ফুটার সিকিউরিটি ব্যাজ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-7xl mx-auto mt-8"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                        <FaShieldAlt className="text-amber-500 text-2xl" />
                        <div>
                            <p className="text-sm font-semibold">256-bit Secure</p>
                            <p className="text-xs text-gray-500">SSL Encryption</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                        <FaCheckCircle className="text-amber-500 text-2xl" />
                        <div>
                            <p className="text-sm font-semibold">PCI DSS</p>
                            <p className="text-xs text-gray-500">Compliant</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                        <FaLock className="text-amber-500 text-2xl" />
                        <div>
                            <p className="text-sm font-semibold">3D Secure</p>
                            <p className="text-xs text-gray-500">Authentication</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                        <FaWallet className="text-amber-500 text-2xl" />
                        <div>
                            <p className="text-sm font-semibold">Multiple Gateway</p>
                            <p className="text-xs text-gray-500">Support</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Pay;