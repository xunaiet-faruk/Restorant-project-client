import React, { useEffect, useState } from 'react';
import {
    FiEdit2,
    FiTrash2,
    FiEye,
    FiSearch,
    FiFilter,
    FiDownload,
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiClock,
    FiTrendingUp,
    FiPlus
} from 'react-icons/fi';
import UseAxios from '../../Hooks/UseAxios';
import Swal from 'sweetalert2';
import FoodDetailsModal from './FoodDetailsModal';
import FoodEdit from './FoodEdit';


const ManageFood = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);
    const [editingFood, setEditingFood] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [viewMode, setViewMode] = useState('table');
    const [foods, setFoods] = useState([]);
    const axios = UseAxios();
    const itemsPerPage = 8;

    // Fetch all foods
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const result = await axios.get('/Allfood');
                console.log("Fetched foods:", result.data);
                setFoods(result.data);
            } catch (error) {
                console.error("Error fetching foods:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load food items'
                });
            }
        };
        fetchFoods();
    }, [axios]);

    const categories = ['all', ...new Set(foods.map(food => food.category))];

    // Filter foods based on search and category
    const filteredFoods = foods.filter(food => {
        const matchesSearch = food.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            food.recipe?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sorting function
    const sortedFoods = [...filteredFoods].sort((a, b) => {
        if (sortConfig.key) {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'price' || sortConfig.key === 'rating' || sortConfig.key === 'orders') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                return sortConfig.direction === 'asc'
                    ? String(aValue).localeCompare(String(bValue))
                    : String(bValue).localeCompare(String(aValue));
            }
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);
    const paginatedFoods = sortedFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle sort
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(paginatedFoods.map(food => food._id));
        } else {
            setSelectedItems([]);
        }
    };

    // Handle select single
    const handleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Handle delete
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This food will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`/Allfood/${id}`);
                if (response.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Food has been deleted.", "success");
                    setFoods(prev => prev.filter(food => food._id !== id));
                }
            } catch (error) {
                console.error("Delete error:", error);
                Swal.fire("Error!", "Failed to delete food.", "error");
            }
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return;

        const result = await Swal.fire({
            title: `Delete ${selectedItems.length} items?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete all!"
        });

        if (result.isConfirmed) {
            try {
                // Delete one by one (you can also create a bulk delete API)
                for (const id of selectedItems) {
                    await axios.delete(`/Allfood/${id}`);
                }

                setFoods(prev => prev.filter(food => !selectedItems.includes(food._id)));
                setSelectedItems([]);

                Swal.fire("Deleted!", `${selectedItems.length} items deleted.`, "success");
            } catch (error) {
                console.error("Bulk delete error:", error);
                Swal.fire("Error!", "Failed to delete items.", "error");
            }
        }
    };

    // View food
    const handleViewFood = (food) => {
        console.log("Viewing food:", food);
        setSelectedFood(food);
        setShowViewModal(true);
    };

   
    const handleEditFood = (food) => {
        console.log("Editing food:", food);
        setEditingFood(food);
        setShowEditModal(true);
    };

    // Save edited food
    const handleSaveEdit = async (updatedData) => {
        try {
            console.log("Saving updated data:", updatedData);

            const response = await axios.put(`/Allfood/${editingFood._id}`, updatedData);

            if (response.status === 200 || response.status === 201) {
                setFoods(prev =>
                    prev.map(f => f._id === editingFood._id ? { ...f, ...updatedData } : f)
                );

                setShowEditModal(false);
                setEditingFood(null);

                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Food item updated successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to update food item'
            });
        }
    };

    // Close modals
    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setSelectedFood(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingFood(null);
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-600 border-green-200';
            case 'out-of-stock':
                return 'bg-red-100 text-red-600 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Food Items</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total {foods.length} items • {filteredFoods.length} filtered
                    </p>
                </div>

                {/* View Toggle and Actions */}
                <div className="flex items-center gap-2">
                    {/* Add New Button */}
                    <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2">
                        <FiPlus className="w-4 h-4" />
                        <span>Add New</span>
                    </button>

                    {/* View Mode Toggle */}
                    <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 18h18M3 6h18" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>

                    {/* Export Button */}
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiDownload className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search food items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>

                <div className="flex gap-2">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'All Categories' : cat}
                            </option>
                        ))}
                    </select>

                    {selectedItems.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                            <FiTrash2 className="w-4 h-4" />
                            <span>Delete ({selectedItems.length})</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.length === paginatedFoods.length && paginatedFoods.length > 0}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                                    <th
                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-amber-500"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Name
                                            {sortConfig.key === 'name' && (
                                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-amber-500"
                                        onClick={() => handleSort('category')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Category
                                            {sortConfig.key === 'category' && (
                                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-amber-500"
                                        onClick={() => handleSort('price')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Price
                                            {sortConfig.key === 'price' && (
                                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Orders</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedFoods.map((food) => (
                                    <tr key={food._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(food._id)}
                                                onChange={() => handleSelectItem(food._id)}
                                                className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={food.image}
                                                alt={food.name}
                                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">{food.name}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-xs">{food.recipe}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                                                {food.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-800">৳{food.price}</p>
                                                {food.discount > 0 && (
                                                    <p className="text-xs text-green-500">{food.discount}% off</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(food.status)}`}>
                                                {food.status === 'available' ? 'Available' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium">{food.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <FiTrendingUp className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{food.orders}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewFood(food)}
                                                    className="p-2 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                                                    title="View Details"
                                                >
                                                    <FiEye className="text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditFood(food)}
                                                    className="p-2 bg-amber-100 rounded hover:bg-amber-200 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 className="text-amber-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(food._id)}
                                                    className="p-2 bg-red-100 rounded hover:bg-red-200 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedFoods.length)} of {sortedFoods.length} items
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiChevronLeft className="w-5 h-5" />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-amber-500 text-white'
                                        : 'hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedFoods.map((food) => (
                        <div key={food._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                            <div className="relative">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(food.status)}`}>
                                        {food.status === 'available' ? 'Available' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{food.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{food.category}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(food._id)}
                                        onChange={() => handleSelectItem(food._id)}
                                        className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                                    />
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{food.recipe}</p>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1">
                                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">{food.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiClock className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs text-gray-500">{food.orders} orders</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div>
                                        <p className="text-lg font-bold text-amber-600">৳{food.price}</p>
                                        {food.discount > 0 && (
                                            <p className="text-xs text-green-500">{food.discount}% off</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleViewFood(food)}
                                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <FiEye className="w-4 h-4 text-blue-500" />
                                        </button>
                                        <button
                                            onClick={() => handleEditFood(food)}
                                            className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-4 h-4 text-amber-500" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {filteredFoods.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No food items found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                        }}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedFood && (
                <FoodDetailsModal
                    food={selectedFood}
                    onClose={handleCloseViewModal}
                />
            )}

            
            {showEditModal && editingFood && (
                <FoodEdit
                    food={editingFood}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default ManageFood;