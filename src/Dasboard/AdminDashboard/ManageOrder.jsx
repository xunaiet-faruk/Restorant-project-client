import React, { useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import OrderDetailsModal from "./FoodDetailsModal";

const ManageOrder = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            user: "Faruk Hossain",
            foods: [
                { name: "Burger", quantity: 2, price: 450 },
                { name: "Pizza", quantity: 1, price: 650 }
            ],
            totalPrice: 1550,
            payment: "Paid",
            status: "Pending",
            date: "2024-03-11",
            time: "7:30 PM",
            address: "Dhaka",
            phone: "+880123456"
        },
        {
            id: 2,
            user: "Rima Akter",
            foods: [
                { name: "Fried Rice", quantity: 1, price: 280 },
                { name: "Cold Drinks", quantity: 2, price: 120 }
            ],
            totalPrice: 520,
            payment: "Unpaid",
            status: "Processing",
            date: "2024-03-11",
            time: "8:15 PM",
            address: "Gulshan",
            phone: "+880999999"
        }
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const statusOptions = ["Pending", "Processing", "Delivered", "Cancelled"];

    // filter
    const filteredOrders = orders.filter((order) => {
        const search = order.user.toLowerCase().includes(searchTerm.toLowerCase());
        const status = statusFilter === "all" || order.status === statusFilter;
        return search && status;
    });

 

    // delete
    const handleDelete = (id) => {
        if (window.confirm("Delete this order?")) {
            setOrders(orders.filter((order) => order.id !== id));
        }
    };

    // status update
    const handleStatusUpdate = (id, status) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Manage Orders</h1>
                <p className="text-gray-500">Total Orders: {orders.length}</p>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Search user..."
                    className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left">Foods</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Payment</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">
                                        <p className="font-semibold">{order.user}</p>
                                        <p className="text-xs text-gray-500">
                                            {order.date} | {order.time}
                                        </p>
                                    </td>
                                    <td className="p-3">
                                        {order.foods.map((food, i) => (
                                            <p key={i} className="text-sm">
                                                {food.name} x{food.quantity}
                                            </p>
                                        ))}
                                    </td>
                                    <td className="p-3 font-semibold">
                                        ৳{order.totalPrice}
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-sm ${order.payment === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusUpdate(order.id, e.target.value)
                                            }
                                            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {statusOptions.map((s) => (
                                                <option key={s}>{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="p-2 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                                                title="View Details"
                                            >
                                                <FiEye className="text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="p-2 bg-red-100 rounded hover:bg-red-200 transition-colors"
                                                title="Delete Order"
                                            >
                                                <FiTrash2 className="text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-6 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

          
        </div>
    );
};

export default ManageOrder;