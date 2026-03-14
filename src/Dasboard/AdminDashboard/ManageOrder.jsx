import React, { useEffect, useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import UseAxios from "../../Hooks/UseAxios";
import MangaeOrderModal from "./MangaeOrderModal";
import Swal from "sweetalert2";

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const axios = UseAxios();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/manageProuct");
                console.log(res.data);
                setOrders(res.data || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [axios]);

    const statusOptions = ["Pending", "Processing", "Delivered", "Cancelled"];

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = searchTerm === "" ||
            (order.email && order.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === "all" ||
            (order.status && order.status.toLowerCase() === statusFilter.toLowerCase());

        return matchesSearch && matchesStatus;
    });

    // SweetAlert2 Delete Confirmation
    const handleDelete = async (id, orderName) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete "${orderName}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: '#fff',
            backdrop: `
                rgba(0,0,0,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
            `
        });

        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`/manageProuct/${id}`);
                console.log(res.data);
                setOrders(orders.filter((order) => order._id !== id));

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Order has been deleted successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error("Error deleting order:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete order.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const result = await axios.put(`/manageProduct/${id}`, { status: newStatus });
            console.log(result.data);

            setOrders(
                orders.map((order) =>
                    order._id === id ? { ...order, status: newStatus } : order
                )
            );

            Swal.fire({
                title: 'Updated!',
                text: `Order status changed to ${newStatus}`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error updating status:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update status.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Manage Orders
                    </h1>
                    <p className="text-gray-500 mt-1">Total Orders: {orders.length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search by email..."
                        className="w-full border border-gray-300 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <select
                    className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Food</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Payment</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <tr
                                        key={order._id}
                                        className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                            }`}
                                    >
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-800">{order.email}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(order.orderDate).toLocaleString()}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={order.image}
                                                    alt={order.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/48';
                                                    }}
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">{order.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-blue-600">৳{order.price}</p>
                                            <p className="text-xs text-gray-500">Total: ৳{order.price * order.quantity}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.payment === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {order.payment || "Pending"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {statusOptions.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group"
                                                    title="View Details"
                                                >
                                                    <FiEye className="text-blue-600 group-hover:scale-110 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order._id, order.name)}
                                                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors group"
                                                    title="Delete Order"
                                                >
                                                    <FiTrash2 className="text-red-600 group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">No orders found</p>
                                            <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {showModal && selectedOrder && (
                <MangaeOrderModal
                    order={selectedOrder}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ManageOrder;