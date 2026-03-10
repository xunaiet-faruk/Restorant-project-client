import React, { useState } from 'react';
import {
    AreaChart, Area,
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie,
    Cell,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart, Radar,
    PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const AdminOverviewChart = () => {
    const [timeRange, setTimeRange] = useState('weekly');
    const [chartType, setChartType] = useState('revenue');

    // Sample data - Weekly revenue and orders
    const weeklyData = [
        { name: 'Mon', revenue: 4500, orders: 45, customers: 38, foodItems: 28 },
        { name: 'Tue', revenue: 5200, orders: 52, customers: 44, foodItems: 32 },
        { name: 'Wed', revenue: 6800, orders: 68, customers: 58, foodItems: 35 },
        { name: 'Thu', revenue: 5900, orders: 59, customers: 51, foodItems: 30 },
        { name: 'Fri', revenue: 8200, orders: 82, customers: 72, foodItems: 42 },
        { name: 'Sat', revenue: 9800, orders: 98, customers: 85, foodItems: 48 },
        { name: 'Sun', revenue: 7200, orders: 72, customers: 63, foodItems: 38 },
    ];

    // Monthly data
    const monthlyData = [
        { name: 'Jan', revenue: 45000, orders: 450, customers: 380, foodItems: 120 },
        { name: 'Feb', revenue: 52000, orders: 520, customers: 440, foodItems: 135 },
        { name: 'Mar', revenue: 68000, orders: 680, customers: 580, foodItems: 148 },
        { name: 'Apr', revenue: 59000, orders: 590, customers: 510, foodItems: 142 },
        { name: 'May', revenue: 82000, orders: 820, customers: 720, foodItems: 156 },
        { name: 'Jun', revenue: 98000, orders: 980, customers: 850, foodItems: 168 },
        { name: 'Jul', revenue: 72000, orders: 720, customers: 630, foodItems: 158 },
    ];

    // Category distribution data
    const categoryData = [
        { name: 'Appetizers', value: 25, color: '#F59E0B' },
        { name: 'Main Course', value: 40, color: '#10B981' },
        { name: 'Desserts', value: 15, color: '#EF4444' },
        { name: 'Beverages', value: 20, color: '#3B82F6' },
    ];

    // Top selling items
    const topItemsData = [
        { name: 'Chicken Burger', sales: 145, revenue: 2175, color: '#F59E0B' },
        { name: 'Beef Steak', sales: 98, revenue: 2940, color: '#10B981' },
        { name: 'Caesar Salad', sales: 87, revenue: 1305, color: '#EF4444' },
        { name: 'Pasta Carbonara', sales: 76, revenue: 1520, color: '#3B82F6' },
        { name: 'Margherita Pizza', sales: 65, revenue: 1625, color: '#8B5CF6' },
    ];

    // Hourly traffic data
    const hourlyData = [
        { hour: '9AM', customers: 12 },
        { hour: '10AM', customers: 18 },
        { hour: '11AM', customers: 25 },
        { hour: '12PM', customers: 45 },
        { hour: '1PM', customers: 58 },
        { hour: '2PM', customers: 42 },
        { hour: '3PM', customers: 28 },
        { hour: '4PM', customers: 22 },
        { hour: '5PM', customers: 35 },
        { hour: '6PM', customers: 52 },
        { hour: '7PM', customers: 68 },
        { hour: '8PM', customers: 55 },
        { hour: '9PM', customers: 32 },
    ];

    // Performance metrics
    const performanceData = [
        { metric: 'Sales', value: 85, fullMark: 100 },
        { metric: 'Service', value: 92, fullMark: 100 },
        { metric: 'Quality', value: 88, fullMark: 100 },
        { metric: 'Ambiance', value: 78, fullMark: 100 },
        { metric: 'Value', value: 82, fullMark: 100 },
    ];

    const currentData = timeRange === 'weekly' ? weeklyData : monthlyData;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-gray-600">{entry.name}:</span>
                            <span className="font-medium text-gray-800">
                                {entry.name === 'revenue' ? `৳${entry.value.toLocaleString()}` : entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header with Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Analytics & Insights</h2>
                    <p className="text-sm text-gray-500">Track your restaurant performance</p>
                </div>

                <div className="flex gap-2">
                    {/* Time Range Selector */}
                    <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setTimeRange('weekly')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === 'weekly'
                                    ? 'bg-amber-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setTimeRange('monthly')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === 'monthly'
                                    ? 'bg-amber-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Monthly
                        </button>
                    </div>

                    {/* Chart Type Selector */}
                    <select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="revenue">Revenue</option>
                        <option value="orders">Orders</option>
                        <option value="customers">Customers</option>
                    </select>
                </div>
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue/Orders Area Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#F59E0B"
                                fill="url(#revenueGradient)"
                                name="Revenue"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="orders"
                                stroke="#10B981"
                                fill="url(#ordersGradient)"
                                name="Orders"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution Pie Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Selling Items Bar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Items</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topItemsData} layout="vertical" margin={{ left: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis type="number" stroke="#6B7280" />
                            <YAxis type="category" dataKey="name" stroke="#6B7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="sales" fill="#F59E0B" radius={[0, 4, 4, 0]}>
                                {topItemsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Hourly Traffic Line Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Customer Traffic</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="hour" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="customers"
                                stroke="#8B5CF6"
                                strokeWidth={3}
                                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Performance Radar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                            <PolarGrid stroke="#E5E7EB" />
                            <PolarAngleAxis dataKey="metric" stroke="#6B7280" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6B7280" />
                            <Radar
                                name="Performance"
                                dataKey="value"
                                stroke="#F59E0B"
                                fill="#F59E0B"
                                fillOpacity={0.6}
                            />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Comparison Bar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="revenue" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4">
                    <p className="text-sm text-amber-600 font-medium">Avg. Daily Revenue</p>
                    <p className="text-2xl font-bold text-amber-800">৳6,800</p>
                    <p className="text-xs text-amber-600 mt-1">↑ 12% from last week</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-medium">Avg. Daily Orders</p>
                    <p className="text-2xl font-bold text-green-800">68</p>
                    <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-medium">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-blue-800">৳1,250</p>
                    <p className="text-xs text-blue-600 mt-1">↑ 5% from last week</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
                    <p className="text-sm text-purple-600 font-medium">Peak Hours</p>
                    <p className="text-2xl font-bold text-purple-800">7-8 PM</p>
                    <p className="text-xs text-purple-600 mt-1">98 customers avg</p>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewChart;