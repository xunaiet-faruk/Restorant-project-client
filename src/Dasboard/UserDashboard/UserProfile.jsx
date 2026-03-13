import React, { useContext, useState } from 'react';
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineCamera,
    HiOutlinePencil,
    HiOutlineSave,
    HiOutlineX,
    HiOutlineCheck
} from 'react-icons/hi';
import { AuthContext } from '../../Authentication/Provider/AuthProbider';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const {user} =useContext(AuthContext)

    const [profileData, setProfileData] = useState({
        name: 'John Anderson',
        email: 'john.anderson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, New York, NY 10001',
        photo: 'https://i.pravatar.cc/300?img=7',
        joinDate: 'January 2023',
        totalOrders: 156,
        memberTier: 'Gold Member'
    });

    const [editForm, setEditForm] = useState({ ...profileData });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        setProfileData(editForm);
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleCancelEdit = () => {
        setEditForm(profileData);
        setIsEditing(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            {/* Success Notification */}
            {showSuccess && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideDown z-50">
                    <HiOutlineCheck className="w-5 h-5" />
                    Profile updated successfully!
                </div>
            )}

            {/* Main Profile Card */}
            <div className="max-w-4xl mx-auto">
                {/* Header with Update Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Profile</h1>
                        <p className="text-gray-500 mt-1">Manage your personal information</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30"
                        >
                            <HiOutlinePencil className="w-5 h-5" />
                            Update Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveProfile}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30"
                            >
                                <HiOutlineSave className="w-5 h-5" />
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all hover:scale-105 active:scale-95"
                            >
                                <HiOutlineX className="w-5 h-5" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Content */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Cover Photo */}
                    <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 relative">
                        {!isEditing && (
                            <div className="absolute -bottom-16 left-8">
                                <div className="relative group">
                                    <img
                                        src={profileData.photo}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <HiOutlineCamera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 p-8">
                        {!isEditing ? (
                            /* View Mode */
                            <div className="space-y-8">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-orange-600">{profileData.totalOrders}</p>
                                        <p className="text-sm text-gray-600">Total Orders</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-blue-600">{profileData.memberTier}</p>
                                        <p className="text-sm text-gray-600">Membership</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-purple-600">{profileData.joinDate}</p>
                                        <p className="text-sm text-gray-600">Joined</p>
                                    </div>
                                </div>

                                {/* Profile Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="p-3 bg-orange-100 rounded-lg">
                                            <HiOutlineUser className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                            <p className="text-lg font-semibold text-gray-900">{user?.displayName}</p>
                                        </div>
                                    </div>

                                    {/* Email (Readonly) */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <HiOutlineMail className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                            <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                                            <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">readonly</span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <HiOutlinePhone className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                            <p className="text-lg font-semibold text-gray-900">{profileData.phone}</p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors md:col-span-2">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <HiOutlineLocationMarker className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                                            <p className="text-lg font-semibold text-gray-900">{profileData.address}</p>
                                        </div>
                                    </div>
                                </div>

                               
                            </div>
                        ) : (
                            /* Edit Mode */
                            <div className="space-y-6">
                                {/* Photo Upload */}
                                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">
                                    <div className="relative group">
                                        <img
                                            src={user.photo}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-2xl border-4 border-orange-200 shadow-xl object-cover"
                                        />
                                        <label className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-full cursor-pointer hover:bg-orange-700 transition-colors shadow-lg">
                                            <HiOutlineCamera className="w-5 h-5 text-white" />
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
                                        <p className="text-sm text-gray-500 mb-3">Upload a new profile picture. Recommended size: 300x300px</p>
                                        <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                                            Remove photo
                                        </button>
                                    </div>
                                </div>

                                {/* Edit Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <HiOutlineUser className="inline mr-2 text-orange-600" />
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
                                            <HiOutlineMail className="inline mr-2 text-blue-600" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email}
                                            readOnly
                                            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <HiOutlinePhone className="inline mr-2 text-green-600" />
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
                                            <HiOutlineLocationMarker className="inline mr-2 text-purple-600" />
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

                                {/* Form Actions */}
                                <div className="flex gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <HiOutlineSave className="w-5 h-5" />
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
                                    >
                                        Cancel
                                    </button>
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