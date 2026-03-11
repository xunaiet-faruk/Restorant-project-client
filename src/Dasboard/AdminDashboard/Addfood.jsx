import React, { useState } from 'react';
import {
    FiUpload,
    FiDollarSign,
    FiPercent,
    FiTag,
    FiBook,
    FiImage,
    FiPlus,
    FiX
} from 'react-icons/fi';
import UseAxios from '../../Hooks/UseAxios';
import axios from 'axios';
import Swal from 'sweetalert2';

const Addfood = () => {
    const axiosInstance = UseAxios();

    const [formData, setFormData] = useState({
        name: '',
        recipe: '',
        image: '',
        category: '',
        price: '',
        discount: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const categories = ['soup', 'salad', 'pizza', 'drinks'];

    const imgbbApiKey = "0b4acf8aaede9367b12de5e29de2e9ad";

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Upload image to imgBB
    const uploadImageToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
            return response.data.data.url; // Return the image URL
        } catch (error) {
            console.error('Error uploading to imgBB:', error);
            throw new Error('Image upload failed');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            let imageUrl = '';

            if (imageFile) {
                imageUrl = await uploadImageToImgBB(imageFile);
                console.log('Image uploaded to imgBB:', imageUrl);
            }

            const foodData = {
                name: formData.name,
                recipe: formData.recipe,
                category: formData.category,
                price: parseFloat(formData.price),
                discount: formData.discount ? parseFloat(formData.discount) : 0,
                image: imageUrl, 
                createdAt: new Date()
            };

            console.log('Sending to backend:', foodData);

            const response = await axiosInstance.post('/Addfood', foodData);

            console.log('Food added:', response.data);
            if (response.data.insertedId){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your New Food has been Post",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            // Reset form
            setFormData({
                name: '',
                recipe: '',
                image: '',
                category: '',
                price: '',
                discount: ''
            });
            setImagePreview(null);
            setImageFile(null);

        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Failed to add food item');
        } finally {
            setIsUploading(false);
        }
    };

    // Remove image
    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/30">
                            <FiPlus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Add New Food Item
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Fill in the details below to add a new delicious item to your menu
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                        <h2 className="text-white font-semibold text-lg">Food Details</h2>
                        <p className="text-amber-100 text-sm">Complete all required fields</p>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 space-y-6">
                        {/* Food Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FiBook className="text-amber-500" />
                                Food Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Grilled Chicken Burger"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-all"
                                required
                            />
                        </div>

                        {/* Recipe/Description */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FiBook className="text-amber-500" />
                                Recipe / Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="recipe"
                                value={formData.recipe}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe the ingredients, preparation method, and special features..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-all resize-none"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FiImage className="text-amber-500" />
                                Food Image <span className="text-red-500">*</span>
                            </label>

                            {!imagePreview ? (
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        required
                                    />
                                    <label
                                        htmlFor="image"
                                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer group"
                                    >
                                        <FiUpload className="w-8 h-8 text-gray-400 group-hover:text-amber-500 mb-2" />
                                        <p className="text-sm text-gray-500 group-hover:text-amber-600">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 group">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110"
                                        >
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Category and Price Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <FiTag className="text-amber-500" />
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-all appearance-none bg-white"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <FiDollarSign className="text-amber-500" />
                                    Price (BDT) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Discount */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FiPercent className="text-amber-500" />
                                Discount (%)
                            </label>
                            <div className="relative">
                                <FiPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-all"
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isUploading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiPlus className="w-5 h-5" />
                                        <span>Add Food Item</span>
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        name: '',
                                        recipe: '',
                                        image: '',
                                        category: '',
                                        price: '',
                                        discount: ''
                                    });
                                    setImagePreview(null);
                                    setImageFile(null);
                                }}
                                className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                            >
                                Reset Form
                            </button>
                        </div>
                    </div>
                </form>

                {/* Preview Card */}
                {(formData.name || formData.price || imagePreview) && (
                    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FiImage className="text-amber-500" />
                            Quick Preview
                        </h3>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt={formData.name}
                                    className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center border-2 border-white shadow-md">
                                    <FiImage className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">
                                    {formData.name || 'Food Name'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {formData.category || 'Category not selected'}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg font-bold text-amber-600">
                                        ৳{formData.price || '0'}
                                    </span>
                                    {formData.discount > 0 && (
                                        <>
                                            <span className="text-sm text-gray-400 line-through">
                                                ৳{parseFloat(formData.price || 0).toFixed(2)}
                                            </span>
                                            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                                {formData.discount}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Addfood;