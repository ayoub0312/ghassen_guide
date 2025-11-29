import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    LayoutDashboard, Calendar, Activity, Settings,
    LogOut, Users, DollarSign, TrendingUp
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const adminAuth = JSON.parse(localStorage.getItem('adminAuth') || '{}');

    useEffect(() => {
        if (!adminAuth.email) {
            navigate('/admin/login');
            return;
        }

        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/analytics/dashboard');
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    if (loading) {
        return <div className="loading-spinner">Loading dashboard...</div>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h2>Ghassen Guide</h2>
                    <p>Admin Panel</p>
                </div>
                <nav className="admin-nav">
                    <div className="admin-nav-item active">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>
                    <Link to="/admin/activities" className="admin-nav-item" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Activity size={20} />
                        Activities
                    </Link>
                    <Link to="/admin/reservations" className="admin-nav-item" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Calendar size={20} />
                        Reservations
                    </Link>
                    <div className="admin-nav-item">
                        <Settings size={20} />
                        Settings
                    </div>
                </nav>
                <button onClick={handleLogout} className="logout-button">
                    <LogOut size={18} style={{ marginRight: '8px' }} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                <div className="admin-header">
                    <h1>Welcome back, {adminAuth.name || 'Admin'}! 👋</h1>
                    <p>Here's what's happening with your travel guide today.</p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span className="stat-card-title">Total Reservations</span>
                            <Users className="stat-card-icon" color="#667eea" />
                        </div>
                        <div className="stat-card-value">{stats?.totalReservations || 0}</div>
                        <div className="stat-card-change">
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            +12% from last month
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span className="stat-card-title">Total Revenue (TND)</span>
                            <DollarSign className="stat-card-icon" color="#10b981" />
                        </div>
                        <div className="stat-card-value">
                            {stats?.revenueByurrency?.TND?.toLocaleString() || 0} TND
                        </div>
                        <div className="stat-card-change">
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            +8% from last month
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span className="stat-card-title">Active Activities</span>
                            <Activity className="stat-card-icon" color="#f59e0b" />
                        </div>
                        <div className="stat-card-value">{stats?.totalActivities || 0}</div>
                        <div className="stat-card-change">All operational</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Monthly Trends</h3>
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.monthlyTrends || []}>
                                    <defs>
                                        <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="reservations" stroke="#667eea" fillOpacity={1} fill="url(#colorRes)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3>Popular Activities</h3>
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats?.popularActivities || []} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={100} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#764ba2" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Reservations */}
                <div className="recent-section">
                    <h3>Recent Reservations</h3>
                    <table className="recent-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Activity</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentReservations?.map(res => (
                                <tr key={res.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{res.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{res.email}</div>
                                    </td>
                                    <td>{res.activityName}</td>
                                    <td>{new Date(res.date).toLocaleDateString()}</td>
                                    <td>{res.totalPrice} {res.currency}</td>
                                    <td>
                                        <span className={`status-badge status-${res.status || 'pending'}`}>
                                            {res.status || 'pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {(!stats?.recentReservations || stats.recentReservations.length === 0) && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No reservations found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
