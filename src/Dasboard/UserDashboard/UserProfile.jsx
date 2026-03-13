import React, { useContext, useState } from 'react';
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlineCamera,
    HiOutlinePencil,
    HiOutlineSave,
    HiOutlineX,
    HiOutlineCheckCircle,
    HiOutlineShieldCheck,
    HiOutlineClock,
    HiOutlineShoppingBag,
    HiOutlineStar,
    HiOutlineLocationMarker,
    HiOutlinePhone,
    HiOutlineCalendar
} from 'react-icons/hi';
import { MdVerified, MdEmail } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';
import UseAxios from '../../Hooks/UseAxios';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const axios = UseAxios();
    const [userStats, setUserStats] = useState({
        memberSince: 'March 2024',
        totalOrders: 24,
        totalSpent: 356.80,
        memberTier: 'Gold Member',
        points: 1250,
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, New York, NY 10001'
    });

    const [profileData, setProfileData] = useState({
        name: user?.displayName || 'User',
        email: user?.email || '',
        photo: user?.photoURL || 'https://via.placeholder.com/150'
    });

    const [editForm, setEditForm] = useState({
        name: profileData.name,
        photo: profileData.photo,
        phone: userStats.phone,
        address: userStats.address
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

    
        const maxSize = 2 * 1024 * 1024; 

        if (file) {
        
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

            if (file.size > maxSize) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large!',
                    text: `Your image is ${fileSizeMB}MB. Maximum allowed size is 2MB. Please select a smaller image.`,
                    timer: 3000,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#f97316',
                    background: '#fff',
                    iconColor: '#ef4444'
                });
                e.target.value = ''; 
                return;
            }
            Swal.fire({
                icon: 'success',
                title: 'Image Selected!',
                text: `Image size: ${fileSizeMB}MB - Ready to upload`,
                timer: 1500,
                showConfirmButton: false,
                background: '#fff',
                iconColor: '#22c55e'
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({
                    ...prev,
                    photo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.put('/profile/update', {
                email: user.email,
                name: editForm.name,
                photo: editForm.photo,
                phone: editForm.phone,
                address: editForm.address
            });

            if (response.data.success) {
                setProfileData({
                    ...profileData,
                    name: editForm.name,
                    photo: editForm.photo
                });

                setUserStats({
                    ...userStats,
                    phone: editForm.phone,
                    address: editForm.address
                });

                setIsEditing(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Profile updated successfully',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#fff',
                    iconColor: '#22c55e'
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update profile',
                background: '#fff',
                iconColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 md:p-8">
            {/* Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-r from-orange-500/10 to-red-500/10 -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg shadow-orange-500/30">
                            <FaRegUserCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Profile</h1>
                            <p className="text-gray-500 mt-1">Manage your personal information and preferences</p>
                        </div>
                    </div>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30 font-medium"
                        >
                            <HiOutlinePencil className="w-5 h-5" />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveProfile}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30 font-medium disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <HiOutlineSave className="w-5 h-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setEditForm({
                                        name: profileData.name,
                                        photo: profileData.photo,
                                        phone: userStats.phone,
                                        address: userStats.address
                                    });
                                    setIsEditing(false);
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all hover:scale-105 active:scale-95 font-medium"
                            >
                                <HiOutlineX className="w-5 h-5" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

               

                {/* Profile Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Cover Photo with Gradient */}
                    <div className="h-32 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 relative">
                        {!isEditing && (
                            <div className="absolute -bottom-16 left-8">
                                <div className="relative group">
                                    <img
                                        src={profileData.photo}
                                        alt={profileData.name}
                                        className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover ring-4 ring-orange-500/20"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                                        <span className="text-white text-xs font-medium">Profile Picture</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className={!isEditing ? "pt-20 p-8" : "p-8"}>
                        {!isEditing ? (
                            /* View Mode */
                            <div className="space-y-8">
                                {/* Basic Info */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <MdEmail className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-500">{profileData.email}</p>
                                            <MdVerified className="w-4 h-4 text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                                            <HiOutlineCheckCircle className="w-4 h-4" />
                                            Verified Account
                                        </span>
                                    </div>
                                </div>

                                {/* Contact & Address */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl hover:shadow-md transition-all">
                                        <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                                            <HiOutlinePhone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                                            <p className="text-base font-medium text-gray-900">{userStats.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl hover:shadow-md transition-all">
                                        <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
                                            <HiOutlineLocationMarker className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                                            <p className="text-base font-medium text-gray-900">{userStats.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Details */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Account Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <HiOutlineUser className="w-5 h-5 text-orange-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Full Name</p>
                                                <p className="font-medium text-gray-900">{profileData.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <HiOutlineMail className="w-5 h-5 text-orange-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Email Address</p>
                                                <p className="font-medium text-gray-900">{profileData.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <HiOutlineClock className="w-5 h-5 text-orange-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Last Login</p>
                                                <p className="font-medium text-gray-900">Today, 10:30 AM</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <HiOutlineShoppingBag className="w-5 h-5 text-orange-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Total Spent</p>
                                                <p className="font-medium text-gray-900">${userStats.totalSpent}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Edit Mode */
                            <div className="space-y-8">
                                {/* Photo Upload */}
                                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8">
                                    <div className="relative group">
                                        <img
                                            src={editForm.photo}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-2xl border-4 border-orange-200 shadow-xl object-cover ring-4 ring-orange-500/20"
                                        />
                                        <label className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-full cursor-pointer hover:from-orange-600 hover:to-red-600 transition-all shadow-lg group-hover:scale-110">
                                            <HiOutlineCamera className="w-4 h-4 text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handlePhotoChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Photo</h3>
                                        <p className="text-sm text-gray-500 mb-3">Upload a new profile picture. Maximum size: 2MB</p>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                                                JPG, PNG, GIF
                                            </span>
                                            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                                                Max 2MB
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <HiOutlineUser className="inline mr-2 text-orange-500" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email (Readonly) */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <HiOutlineMail className="inline mr-2 text-blue-500" />
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                readOnly
                                                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                                verified
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <HiOutlinePhone className="inline mr-2 text-green-500" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <HiOutlineLocationMarker className="inline mr-2 text-purple-500" />
                                            Delivery Address
                                        </label>
                                        <textarea
                                            name="address"
                                            value={editForm.address}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="Enter your full address"
                                        />
                                    </div>
                                </div>

                                {/* Form Hint */}
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                                    <p className="text-sm text-orange-600 flex items-center gap-2">
                                        <HiOutlineCheckCircle className="w-5 h-5" />
                                        Your information is secure and will only be used for order delivery and communication.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UserProfile;