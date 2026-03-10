import React, { useState } from 'react';
import { FiUpload, FiDollarSign, FiPercent, FiTag, FiBook, FiImage, FiPlus, FiX } from 'react-icons/fi';

const Addfood = () => {
    const [formData, setFormData] = useState({
        name: '',
        recipe: '',
        image: '',
        category: '',
        price: '',
        discount: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const categories = [
        'Appetizers',
        'Main Course',
        'Desserts',
        'Beverages',
        'Fast Food',
        'Seafood',
        'Vegetarian',
        'Vegan',
        'Soup',
        'Salad'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Image size should be less than 5MB'
                }));
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Please upload an image file'
                }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Clear image error
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: ''
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Food name is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Food name must be at least 3 characters';
        }

        if (!formData.recipe.trim()) {
            newErrors.recipe = 'Recipe description is required';
        } else if (formData.recipe.length < 20) {
            newErrors.recipe = 'Recipe must be at least 20 characters';
        }

        if (!formData.image && !imagePreview) {
            newErrors.image = 'Food image is required';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }

        if (formData.discount && (isNaN(formData.discount) || formData.discount < 0 || formData.discount > 100)) {
            newErrors.discount = 'Discount must be between 0 and 100';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Scroll to top to show errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSuccessMessage('Food item added successfully! 🎉');

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

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setErrors({ submit: 'Failed to add food item. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({
            ...prev,
            image: ''
        }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-amber-100 rounded-xl">
                        <FiPlus className="w-6 h-6 text-amber-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Add New Food Item</h1>
                </div>
                <p className="text-gray-500 ml-16">
                    Fill in the details below to add a new delicious item to your menu
                </p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-slideDown">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-green-700 font-medium">{successMessage}</p>
                    </div>
                </div>
            )}

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
                            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-amber-500'
                                } focus:outline-none focus:ring-2 transition-all`}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                        )}
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
                            className={`w-full px-4 py-3 rounded-xl border ${errors.recipe ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-amber-500'
                                } focus:outline-none focus:ring-2 transition-all resize-none`}
                        />
                        <div className="flex justify-between">
                            {errors.recipe && (
                                <p className="text-sm text-red-500">{errors.recipe}</p>
                            )}
                            <p className={`text-xs ${formData.recipe.length >= 20 ? 'text-green-500' : 'text-gray-400'} ml-auto`}>
                                {formData.recipe.length}/20 minimum characters
                            </p>
                        </div>
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
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
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
                            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        {errors.image && (
                            <p className="text-sm text-red-500 mt-1">{errors.image}</p>
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
                                className={`w-full px-4 py-3 rounded-xl border ${errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-amber-500'
                                    } focus:outline-none focus:ring-2 transition-all appearance-none bg-white`}
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-sm text-red-500">{errors.category}</p>
                            )}
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
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-amber-500'
                                        } focus:outline-none focus:ring-2 transition-all`}
                                />
                            </div>
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price}</p>
                            )}
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
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.discount ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-amber-500'
                                    } focus:outline-none focus:ring-2 transition-all`}
                            />
                        </div>
                        {errors.discount && (
                            <p className="text-sm text-red-500">{errors.discount}</p>
                        )}
                        {formData.discount > 0 && (
                            <p className="text-xs text-green-600">
                                Final price: ৳{(parseFloat(formData.price) * (1 - parseFloat(formData.discount) / 100)).toFixed(2)}
                            </p>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Adding Food...</span>
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
                                setErrors({});
                            }}
                            className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                        >
                            Reset Form
                        </button>
                    </div>
                </div>
            </form>

            {/* Preview Card (Optional) */}
            {formData.name && formData.price && (
                <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Preview</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        {imagePreview ? (
                            <img src={imagePreview} alt={formData.name} className="w-20 h-20 rounded-xl object-cover" />
                        ) : (
                            <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center">
                                <FiImage className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{formData.name}</h4>
                            <p className="text-sm text-gray-500">{formData.category || 'Category not selected'}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-lg font-bold text-amber-600">৳{formData.price}</span>
                                {formData.discount > 0 && (
                                    <>
                                        <span className="text-sm text-gray-400 line-through">৳{parseFloat(formData.price).toFixed(2)}</span>
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
    );
};

export default Addfood;