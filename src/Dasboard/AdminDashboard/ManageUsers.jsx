import React, { useState } from 'react';
import { FiUser, FiMail, FiShield, FiTrash2, FiEye, FiStar, FiSearch, FiFilter, FiMoreVertical } from 'react-icons/fi';

const ManageUsers = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Faruk Hossain',
            email: 'faruk.hossain@example.com',
            role: 'Admin',
            status: 'Active',
            joinDate: '2024-01-15',
            avatar: 'https://i.pravatar.cc/150?img=1',
            orders: 45,
            totalSpent: 24500
        },
        {
            id: 2,
            name: 'Rima Akter',
            email: 'rima.akter@example.com',
            role: 'User',
            status: 'Active',
            joinDate: '2024-02-20',
            avatar: 'https://i.pravatar.cc/150?img=2',
            orders: 12,
            totalSpent: 5600
        },
        {
            id: 3,
            name: 'Shahin Alam',
            email: 'shahin.alam@example.com',
            role: 'User',
            status: 'Active',
            joinDate: '2024-02-10',
            avatar: 'https://i.pravatar.cc/150?img=3',
            orders: 8,
            totalSpent: 3200
        },
        {
            id: 4,
            name: 'Nusrat Jahan',
            email: 'nusrat.jahan@example.com',
            role: 'Moderator',
            status: 'Active',
            joinDate: '2024-01-05',
            avatar: 'https://i.pravatar.cc/150?img=4',
            orders: 23,
            totalSpent: 12800
        },
        {
            id: 5,
            name: 'Rafiq Islam',
            email: 'rafiq.islam@example.com',
            role: 'User',
            status: 'Blocked',
            joinDate: '2024-02-28',
            avatar: 'https://i.pravatar.cc/150?img=5',
            orders: 3,
            totalSpent: 950
        },
        {
            id: 6,
            name: 'Salma Begum',
            email: 'salma.begum@example.com',
            role: 'User',
            status: 'Active',
            joinDate: '2024-03-01',
            avatar: 'https://i.pravatar.cc/150?img=6',
            orders: 5,
            totalSpent: 2100
        },
        {
            id: 7,
            name: 'Kamal Hossain',
            email: 'kamal.hossain@example.com',
            role: 'Moderator',
            status: 'Active',
            joinDate: '2024-01-20',
            avatar: 'https://i.pravatar.cc/150?img=7',
            orders: 31,
            totalSpent: 15600
        },
        {
            id: 8,
            name: 'Jhorna Akter',
            email: 'jhorna.akter@example.com',
            role: 'User',
            status: 'Blocked',
            joinDate: '2024-02-15',
            avatar: 'https://i.pravatar.cc/150?img=8',
            orders: 2,
            totalSpent: 650
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Handle make admin
    const handleMakeAdmin = (userId) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, role: 'Admin' } : user
        ));
    };

    // Handle remove user
    const handleRemoveUser = (userId) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    // Handle view profile
    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setShowProfileModal(true);
    };

    // Get role badge color
    const getRoleBadge = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-purple-100 text-purple-600 border-purple-200';
            case 'Moderator':
                return 'bg-blue-100 text-blue-600 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-600 border-green-200'
            : 'bg-red-100 text-red-600 border-red-200';
    };

    // Stats
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const adminUsers = users.filter(u => u.role === 'Admin').length;
    const blockedUsers = users.filter(u => u.status === 'Blocked').length;

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Users</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and control user access</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FiUser className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Total Users</p>
                            <p className="text-xl font-bold text-gray-800">{totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <FiUser className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Active</p>
                            <p className="text-xl font-bold text-gray-800">{activeUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <FiShield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Admins</p>
                            <p className="text-xl font-bold text-gray-800">{adminUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <FiUser className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Blocked</p>
                            <p className="text-xl font-bold text-gray-800">{blockedUsers}</p>
                        </div>
                    </div>
                </div>
            </div>

         

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Join Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Orders</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">ID: #{user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FiMail className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{user.joinDate}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-800">{user.orders}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* View Profile */}
                                            <button
                                                onClick={() => handleViewProfile(user)}
                                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                                                title="View Profile"
                                            >
                                                <FiEye className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
                                            </button>

                                            {/* Make Admin - Show only if not already admin */}
                                            {user.role !== 'Admin' && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user.id)}
                                                    className="p-2 hover:bg-purple-50 rounded-lg transition-colors group"
                                                    title="Make Admin"
                                                >
                                                    <FiShield className="w-4 h-4 text-purple-500 group-hover:text-purple-600" />
                                                </button>
                                            )}

                                            {/* Remove User */}
                                            <button
                                                onClick={() => handleRemoveUser(user.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                title="Remove User"
                                            >
                                                <FiTrash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

               
            </div>

            {/* View Profile Modal */}
            {showProfileModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">User Profile</h2>
                                <button
                                    onClick={() => setShowProfileModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <FiMoreVertical className="w-5 h-5 text-gray-500 rotate-45" />
                                </button>
                            </div>

                            {/* Profile Header */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                                <img
                                    src={selectedUser.avatar}
                                    alt={selectedUser.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-200"
                                />
                                <div className="text-center sm:text-left">
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
                                    <p className="text-gray-500">{selectedUser.email}</p>
                                    <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(selectedUser.role)}`}>
                                            {selectedUser.role}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedUser.status)}`}>
                                            {selectedUser.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* User Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-gray-800">{selectedUser.orders}</p>
                                    <p className="text-xs text-gray-500">Total Orders</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-gray-800">৳{selectedUser.totalSpent}</p>
                                    <p className="text-xs text-gray-500">Total Spent</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-gray-800">{selectedUser.joinDate}</p>
                                    <p className="text-xs text-gray-500">Join Date</p>
                                </div>
                            </div>

                            {/* Recent Activity (Sample) */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-semibold text-gray-700 mb-3">Recent Activity</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">Order #1234 placed - 2 hours ago</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-gray-600">Profile updated - 1 day ago</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                        <span className="text-gray-600">Logged in - 2 days ago</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                {selectedUser.role !== 'Admin' && (
                                    <button
                                        onClick={() => {
                                            handleMakeAdmin(selectedUser.id);
                                            setShowProfileModal(false);
                                        }}
                                        className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FiShield className="w-4 h-4" />
                                        Make Admin
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        handleRemoveUser(selectedUser.id);
                                        setShowProfileModal(false);
                                    }}
                                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    Remove User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;