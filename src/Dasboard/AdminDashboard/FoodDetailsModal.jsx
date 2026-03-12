import { FiX } from "react-icons/fi";

const FoodDetailsModal = ({ food, onClose }) => {
    console.log("Modal received food:", food);

    if (!food) {
        console.log("No food data received");
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-[500px] p-6 relative max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                    <FiX size={20} />
                </button>

                {/* Food Image */}
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h2 className="text-2xl font-bold mb-4">{food.name}</h2>

                <div className="space-y-4">
                    {/* Category */}
                    <div>
                        <h3 className="font-semibold text-gray-700">Category</h3>
                        <p className="text-amber-600">{food.category}</p>
                    </div>

                    {/* Recipe */}
                    <div>
                        <h3 className="font-semibold text-gray-700">Description</h3>
                        <p className="text-gray-600">{food.recipe}</p>
                    </div>

                    {/* Price */}
                    <div>
                        <h3 className="font-semibold text-gray-700">Price</h3>
                        <p className="text-2xl font-bold text-amber-600">৳{food.price}</p>
                    </div>

                    {/* Status */}
                    <div>
                        <h3 className="font-semibold text-gray-700">Status</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${food.status === 'available'
                                ? 'bg-green-100 text-green-600 border-green-200'
                                : 'bg-red-100 text-red-600 border-red-200'
                            }`}>
                            {food.status === 'available' ? 'Available' : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Rating & Orders */}
                    <div className="flex gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-700">Rating</h3>
                            <p className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span>{food.rating}</span>
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Total Orders</h3>
                            <p>{food.orders}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetailsModal;