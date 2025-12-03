import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, History, User, LogOut,
    TrendingUp, Heart, Award, Download,
    Calendar, CreditCard, CheckCircle, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';
import Button from '../components/Button';
import jsPDF from 'jspdf';
import SEO from '../components/SEO';

const DonorDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [impact, setImpact] = useState({ totalDonated: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch User Profile
                const userRes = await fetch(`${API_URL}/api/user/profile`, { headers });
                const userData = await userRes.json();
                if (userData.success) setUser(userData.user);

                // Fetch Donations
                const donationsRes = await fetch(`${API_URL}/api/donations/my-history`, { headers });
                const donationsData = await donationsRes.json();
                if (donationsData.success) setDonations(donationsData.donations);

                // Fetch Impact
                const impactRes = await fetch(`${API_URL}/api/user/impact`, { headers });
                const impactData = await impactRes.json();
                if (impactData.success) setImpact(impactData);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const generateReceipt = (donation) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text('ThinkMinnt Foundation', 105, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.text('Donation Receipt', 105, 30, { align: 'center' });

        // Details
        doc.setFontSize(12);
        doc.text(`Receipt ID: ${donation.id}`, 20, 50);
        doc.text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`, 20, 60);

        doc.text(`Donor Name: ${user.name}`, 20, 80);
        doc.text(`Donor Email: ${user.email}`, 20, 90);

        doc.text(`Amount: ₹${donation.amount}`, 20, 110);
        doc.text(`Payment Method: ${donation.paymentMethod}`, 20, 120);

        // Footer
        doc.text('Thank you for your generous support!', 105, 150, { align: 'center' });
        doc.setFontSize(10);
        doc.text('ThinkMinnt Foundation is a registered Section 8 Non-Profit.', 105, 160, { align: 'center' });

        // Save
        doc.save(`Receipt-${donation.id}.pdf`);
    };

    const getBadge = (total) => {
        if (total >= 50000) return { name: 'Gold Guardian', color: 'text-yellow-500', bg: 'bg-yellow-50' };
        if (total >= 10000) return { name: 'Silver Supporter', color: 'text-gray-400', bg: 'bg-gray-50' };
        return { name: 'Bronze Believer', color: 'text-orange-400', bg: 'bg-orange-50' };
    };

    const badge = getBadge(impact.totalDonated);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <SEO title="Donor Dashboard | ThinkMinnt Foundation" />
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                    {user?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{user?.name}</h3>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                                    { id: 'history', label: 'Donation History', icon: History },
                                    { id: 'profile', label: 'My Profile', icon: User },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-8"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Dashboard Overview</h1>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                                                    <TrendingUp size={24} />
                                                </div>
                                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12% this month</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-1">Total Donated</p>
                                            <h3 className="text-3xl font-bold text-gray-900">₹{impact.totalDonated.toLocaleString()}</h3>
                                        </div>

                                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                                                    <Heart size={24} />
                                                </div>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-1">Lives Impacted</p>
                                            <h3 className="text-3xl font-bold text-gray-900">
                                                {Math.floor(impact.totalDonated / 500)} <span className="text-base font-normal text-gray-500">People</span>
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-2">Based on ₹500 avg. cost per beneficiary</p>
                                        </div>

                                        <div className={`p-6 rounded-3xl shadow-sm border border-gray-100 ${badge.bg}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 bg-white rounded-2xl ${badge.color}`}>
                                                    <Award size={24} />
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-1">Donor Status</p>
                                            <h3 className={`text-2xl font-bold ${badge.color}`}>{badge.name}</h3>
                                            <p className="text-xs text-gray-500 mt-2">Donate ₹{(50000 - impact.totalDonated).toLocaleString()} more to reach Gold</p>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                                        <h3 className="font-bold text-gray-900 mb-6">Recent Activity</h3>
                                        <div className="space-y-4">
                                            {donations.slice(0, 3).map((donation) => (
                                                <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                                                            <CreditCard size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">Donation</p>
                                                            <p className="text-xs text-gray-500">{new Date(donation.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-900">₹{donation.amount}</p>
                                                        <p className="text-xs text-green-600 font-medium">{donation.status || 'Completed'}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {donations.length === 0 && (
                                                <p className="text-center text-gray-500 py-4">No donations yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'history' && (
                                <motion.div
                                    key="history"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-900">Donation History</h2>
                                        <Button to="/donate" variant="primary" size="sm">New Donation</Button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider text-left">
                                                <tr>
                                                    <th className="px-6 py-4 font-medium">Date</th>
                                                    <th className="px-6 py-4 font-medium">Amount</th>
                                                    <th className="px-6 py-4 font-medium">Method</th>
                                                    <th className="px-6 py-4 font-medium">Status</th>
                                                    <th className="px-6 py-4 font-medium text-right">Receipt</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {donations.map((donation) => (
                                                    <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                {new Date(donation.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{donation.amount}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">{donation.paymentMethod}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                                <CheckCircle size={10} />
                                                                {donation.status || 'Success'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                onClick={() => generateReceipt(donation)}
                                                                className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-1 justify-end transition-colors"
                                                            >
                                                                <Download size={14} /> Download
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {donations.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                                    <History size={24} />
                                                </div>
                                                <p className="text-gray-500">No donation history found.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                                    <form className="max-w-lg space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user?.name}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue={user?.email}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Leave blank to keep current"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            />
                                        </div>
                                        <Button variant="primary" className="shadow-lg shadow-primary/20">
                                            Save Changes
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
