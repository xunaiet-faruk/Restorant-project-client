import React, { useState, useEffect } from 'react';
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
import UseAxios from '../../Hooks/UseAxios';

const AdminOverviewChart = () => {
    const axios = UseAxios();
    const [timeRange, setTimeRange] = useState('weekly');
    const [chartType, setChartType] = useState('revenue');
    const [loading, setLoading] = useState(true);
    const [weeklyData, setWeeklyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [topItemsData, setTopItemsData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [summaryData, setSummaryData] = useState({
        avgDailyRevenue: 0,
        avgDailyOrders: 0,
        avgOrderValue: 0,
        peakHours: '7-8 PM',
        peakCustomers: 0,
        growth: {
            revenue: '+0%',
            orders: '+0%',
            value: '+0%'
        }
    });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);

              
                const [ordersRes, foodsRes, usersRes] = await Promise.all([
                    axios.get('/manageProuct'),  
                    axios.get('/Allfood'),      
                    axios.get('/register')       
                ]);

                const orders = ordersRes.data || [];
                const foods = foodsRes.data || [];
                const users = usersRes.data || [];
                processChartData(orders, foods, users);

            } catch (error) {
                console.error("Error fetching chart data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [axios]);

 
    const processChartData = (orders, foods, users) => {

      
        const weekly = generateWeeklyData(orders);
        setWeeklyData(weekly);


        const monthly = generateMonthlyData(orders);
        setMonthlyData(monthly);


        const categories = generateCategoryData(foods, orders);
        setCategoryData(categories);

        const topItems = generateTopItems(orders, foods);
        setTopItemsData(topItems);

    
        const hourly = generateHourlyData(orders);
        setHourlyData(hourly);

       
        const performance = generatePerformanceData(orders, users);
        setPerformanceData(performance);

        const summary = calculateSummary(orders);
        setSummaryData(summary);
    };

   
    const generateWeeklyData = (orders) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weeklyStats = days.map(day => ({
            name: day,
            revenue: 0,
            orders: 0,
            customers: 0,
            foodItems: 0
        }));

        orders.forEach(order => {
            const orderDate = new Date(order.orderDate);
            const dayIndex = orderDate.getDay(); 
            const dayData = weeklyStats[dayIndex];

            dayData.revenue += order.price * order.quantity;
            dayData.orders += 1;
            dayData.customers += 1;
            dayData.foodItems += order.quantity;
        });

        return weeklyStats;
    };

    const generateMonthlyData = (orders) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyStats = months.map(month => ({
            name: month,
            revenue: 0,
            orders: 0,
            customers: 0,
            foodItems: 0
        }));

        orders.forEach(order => {
            const orderDate = new Date(order.orderDate);
            const monthIndex = orderDate.getMonth();
            const monthData = monthlyStats[monthIndex];

            monthData.revenue += order.price * order.quantity;
            monthData.orders += 1;
            monthData.customers += 1;
            monthData.foodItems += order.quantity;
        });

        return monthlyStats.filter(month => month.orders > 0);
    };

    const generateCategoryData = (foods, orders) => {
        const categoryMap = {};
        const colors = ['#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

      
        foods.forEach(food => {
            const cat = food.category || 'Other';
            if (!categoryMap[cat]) {
                categoryMap[cat] = {
                    name: cat,
                    value: 0,
                    count: 0
                };
            }
        });

        orders.forEach(order => {
            const food = foods.find(f => f._id === order.foodId);
            if (food) {
                const cat = food.category || 'Other';
                if (categoryMap[cat]) {
                    categoryMap[cat].value += order.quantity;
                    categoryMap[cat].count += 1;
                }
            }
        });

        
        return Object.values(categoryMap).map((item, index) => ({
            ...item,
            color: colors[index % colors.length]
        }));
    };

   
    const generateTopItems = (orders, foods) => {
        const itemSales = {};

        orders.forEach(order => {
            const food = foods.find(f => f._id === order.foodId);
            if (food) {
                if (!itemSales[order.name]) {
                    itemSales[order.name] = {
                        name: order.name,
                        sales: 0,
                        revenue: 0,
                        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    };
                }
                itemSales[order.name].sales += order.quantity;
                itemSales[order.name].revenue += order.price * order.quantity;
            }
        });

     
        return Object.values(itemSales)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);
    };

    
    const generateHourlyData = (orders) => {
        const hours = [
            '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'
        ];

        const hourlyStats = hours.map(hour => ({
            hour,
            customers: 0
        }));

        orders.forEach(order => {
            const orderDate = new Date(order.orderDate);
            const hour = orderDate.getHours();

            let hourIndex;
            if (hour >= 9 && hour < 10) hourIndex = 0;
            else if (hour >= 10 && hour < 11) hourIndex = 1;
            else if (hour >= 11 && hour < 12) hourIndex = 2;
            else if (hour >= 12 && hour < 13) hourIndex = 3;
            else if (hour >= 13 && hour < 14) hourIndex = 4;
            else if (hour >= 14 && hour < 15) hourIndex = 5;
            else if (hour >= 15 && hour < 16) hourIndex = 6;
            else if (hour >= 16 && hour < 17) hourIndex = 7;
            else if (hour >= 17 && hour < 18) hourIndex = 8;
            else if (hour >= 18 && hour < 19) hourIndex = 9;
            else if (hour >= 19 && hour < 20) hourIndex = 10;
            else if (hour >= 20 && hour < 21) hourIndex = 11;
            else if (hour >= 21 && hour < 22) hourIndex = 12;

            if (hourIndex !== undefined) {
                hourlyStats[hourIndex].customers += 1;
            }
        });

        return hourlyStats;
    };

    const generatePerformanceData = (orders, users) => {
        const totalOrders = orders.length;
        const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
        const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

        const avgOrderValue = totalOrders > 0
            ? orders.reduce((sum, o) => sum + (o.price * o.quantity), 0) / totalOrders
            : 0;

        return [
            { metric: 'Sales', value: Math.min(100, Math.round((totalOrders / 1000) * 100)) },
            { metric: 'Service', value: Math.min(100, Math.round((deliveredOrders / (totalOrders || 1)) * 100)) },
            { metric: 'Quality', value: 88 },
            { metric: 'Ambiance', value: 78 },
            { metric: 'Value', value: Math.min(100, Math.round((avgOrderValue / 1000) * 100)) },
        ];
    };

    
    const calculateSummary = (orders) => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + (o.price * o.quantity), 0);

        const today = new Date();
        const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
        const lastWeekOrders = orders.filter(o => new Date(o.orderDate) >= oneWeekAgo);

        const lastWeekRevenue = lastWeekOrders.reduce((sum, o) => sum + (o.price * o.quantity), 0);
        const avgDailyRevenue = lastWeekRevenue / 7;
        const avgDailyOrders = lastWeekOrders.length / 7;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        const hourlyData = generateHourlyData(orders);
        const peakHour = hourlyData.reduce((max, item) =>
            item.customers > max.customers ? item : max, hourlyData[0]
        );

        return {
            avgDailyRevenue: avgDailyRevenue.toFixed(0),
            avgDailyOrders: avgDailyOrders.toFixed(0),
            avgOrderValue: avgOrderValue.toFixed(0),
            peakHours: peakHour.hour,
            peakCustomers: peakHour.customers,
            growth: {
                revenue: `+${Math.round((lastWeekRevenue / (totalRevenue || 1)) * 100)}%`,
                orders: `+${Math.round((lastWeekOrders.length / (totalOrders || 1)) * 100)}%`,
                value: `+${Math.round((avgOrderValue / 100) * 10)}%`
            }
        };
    };

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

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

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
                    <p className="text-2xl font-bold text-amber-800">৳{summaryData.avgDailyRevenue}</p>
                    <p className="text-xs text-amber-600 mt-1">{summaryData.growth.revenue} from last week</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-medium">Avg. Daily Orders</p>
                    <p className="text-2xl font-bold text-green-800">{summaryData.avgDailyOrders}</p>
                    <p className="text-xs text-green-600 mt-1">{summaryData.growth.orders} from last week</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-medium">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-blue-800">৳{summaryData.avgOrderValue}</p>
                    <p className="text-xs text-blue-600 mt-1">{summaryData.growth.value} from last week</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
                    <p className="text-sm text-purple-600 font-medium">Peak Hours</p>
                    <p className="text-2xl font-bold text-purple-800">{summaryData.peakHours}</p>
                    <p className="text-xs text-purple-600 mt-1">{summaryData.peakCustomers} customers avg</p>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewChart;