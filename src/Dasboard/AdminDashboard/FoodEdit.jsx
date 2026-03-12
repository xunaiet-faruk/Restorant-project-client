import { useState } from "react";
import { FiX } from "react-icons/fi";

const FoodEdit = ({ food, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: food.name || '',
        category: food.category || '',
        price: food.price || 0,
        recipe: food.recipe || '',
        status: food.status || 'available',
        discount: food.discount || 0,
        image: food.image || '',
        rating: food.rating || 0,
        orders: food.orders || 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-xl p-6 w-[550px] relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                    <FiX size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-4">Edit Food Item</h2>

                <form onSubmit={handleSubmit}>
                    {/* Image Preview */}
                    {formData.image && (
                        <div className="mb-4">
                            <img
                                src={formData.image}
                                alt={formData.name}
                                className="w-32 h-32 object-cover rounded-lg border"
                            />
                        </div>
                    )}

                    {/* Food Name */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Food Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Enter food name"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Enter category"
                            required
                        />
                    </div>

                    {/* Price and Discount */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (৳)
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Price"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Discount"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.recipe}
                            onChange={(e) => setFormData({ ...formData, recipe: e.target.value })}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Enter food description"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            <option value="available">Available</option>
                            <option value="out-of-stock">Out of Stock</option>
                        </select>
                    </div>

                    {/* Image URL */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Enter image URL"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodEdit;