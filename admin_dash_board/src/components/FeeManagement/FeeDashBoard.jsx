import React, { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeeDashBoard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');

    // Sample data for charts
    const monthlyCollectionData = [
        { month: 'Jan', collected: 45000, pending: 12000 },
        { month: 'Feb', collected: 52000, pending: 10000 },
        { month: 'Mar', collected: 48000, pending: 15000 },
        { month: 'Apr', collected: 61000, pending: 8000 },
        { month: 'May', collected: 55000, pending: 11000 },
        { month: 'Jun', collected: 58000, pending: 9000 },
    ];

    const paymentModeData = [
        { name: 'Cash', value: 120000, color: '#10b981' },
        { name: 'Online', value: 185000, color: '#3b82f6' },
        { name: 'Cheque', value: 75000, color: '#f59e0b' },
        { name: 'Card', value: 95000, color: '#8b5cf6' },
    ];

    const summaryCards = [
        {
            title: 'Total Students',
            value: '1,245',
            icon: '👥',
            bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
            change: '+12%',
            changeType: 'positive'
        },
        {
            title: 'Fees Collected',
            value: '₹4,75,000',
            icon: '💰',
            bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
            change: '+8.2%',
            changeType: 'positive'
        },
        {
            title: 'Pending Dues',
            value: '₹1,25,000',
            icon: '⚠️',
            bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
            change: '-3.5%',
            changeType: 'negative'
        },
        {
            title: 'Collection Rate',
            value: '79.2%',
            icon: '📈',
            bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
            change: '+5.1%',
            changeType: 'positive'
        },
    ];
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Student Fees Dashboard</h1>
                    <p className="text-slate-600">Track and monitor student fee collection and payments</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {summaryCards.map((card, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className={`${card.bgColor} p-6`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-5xl">{card.icon}</span>
                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${card.changeType === 'positive' ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
                                            }`}>
                                            {card.change}
                                        </span>
                                    </div>
                                    <h3 className="text-white/90 text-sm font-medium mb-1">{card.title}</h3>
                                    <p className="text-3xl font-bold text-white">{card.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Monthly Collection Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Monthly Collection</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedPeriod('monthly')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPeriod === 'monthly'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod('quarterly')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPeriod === 'quarterly'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    Quarterly
                                </button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyCollectionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="collected"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    name="Collected"
                                    dot={{ fill: '#10b981', r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="pending"
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    name="Pending"
                                    dot={{ fill: '#f59e0b', r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Payment Mode Distribution */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Payment Modes</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={paymentModeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {paymentModeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {paymentModeData.map((mode, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: mode.color }}
                                        />
                                        <span className="text-sm text-slate-600">{mode.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-800">₹{mode.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Amount</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Mode</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 'ST001', name: 'Rahul Kumar', amount: '₹12,000', mode: 'Online', date: '07 Oct 2025', status: 'Paid', icon: '💳' },
                                    { id: 'ST002', name: 'Priya Sharma', amount: '₹15,000', mode: 'Cash', date: '06 Oct 2025', status: 'Paid', icon: '💵' },
                                    { id: 'ST003', name: 'Amit Patel', amount: '₹10,000', mode: 'Cheque', date: '05 Oct 2025', status: 'Pending', icon: '🏦' },
                                    { id: 'ST004', name: 'Sneha Reddy', amount: '₹18,000', mode: 'Card', date: '04 Oct 2025', status: 'Paid', icon: '💳' },
                                    { id: 'ST005', name: 'Vikram Singh', amount: '₹12,000', mode: 'Online', date: '03 Oct 2025', status: 'Paid', icon: '💳' },
                                ].map((transaction, index) => (
                                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-4 text-sm text-slate-700 font-medium">{transaction.id}</td>
                                        <td className="py-4 px-4 text-sm text-slate-700">{transaction.name}</td>
                                        <td className="py-4 px-4 text-sm text-slate-700 font-semibold">{transaction.amount}</td>
                                        <td className="py-4 px-4 text-sm">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                <span>{transaction.icon}</span>
                                                {transaction.mode}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-600">{transaction.date}</td>
                                        <td className="py-4 px-4 text-sm">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${transaction.status === 'Paid'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-orange-50 text-orange-700'
                                                }`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default FeeDashBoard