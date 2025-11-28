import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import {
    LayoutDashboard,
    Users,
    Heart,
    FileText,
    Briefcase,
    GraduationCap,
    Calendar,
    Download,
    Plus,
    Trash2,
    X,
    LogOut,
    Menu
} from 'lucide-react';
import API_URL from '../config/api';

const COLORS = ['#2A9D8F', '#E9C46A', '#E76F51', '#264653', '#1A365D'];

const Admin = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Data States
    const [contacts, setContacts] = useState([]);
    const [donations, setDonations] = useState([]);
    const [applications, setApplications] = useState([]);
    const [careers, setCareers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventRegistrations, setEventRegistrations] = useState({});
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form States
    const [newCareer, setNewCareer] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' });
    const [newProgram, setNewProgram] = useState({ title: '', category: '', description: '', icon: 'Code' });
    const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', description: '', image: '' });

    // Modal States
    const [showCareerForm, setShowCareerForm] = useState(false);
    const [showProgramForm, setShowProgramForm] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            const [contactsRes, donationsRes, applicationsRes, analyticsRes, careersRes, programsRes, eventsRes] = await Promise.all([
                fetch(`${API_URL}/api/contacts`, { headers }),
                fetch(`${API_URL}/api/donations`, { headers }),
                fetch(`${API_URL}/api/applications`, { headers }),
                fetch(`${API_URL}/api/analytics`, { headers }),
                fetch(`${API_URL}/api/careers`),
                fetch(`${API_URL}/api/programs`),
                fetch(`${API_URL}/api/events`)
            ]);

            if (contactsRes.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            setContacts(contactsRes.ok ? await contactsRes.json() : []);
            setDonations(donationsRes.ok ? await donationsRes.json() : []);
            setApplications(applicationsRes.ok ? await applicationsRes.json() : []);
            setAnalyticsData(analyticsRes.ok ? await analyticsRes.json() : null);
            setCareers(careersRes.ok ? await careersRes.json() : []);
            setPrograms(programsRes.ok ? await programsRes.json() : []);
            setEvents(eventsRes.ok ? await eventsRes.json() : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // --- Handlers ---

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/applications/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setApplications(applications.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                ));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleExport = async (type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/export/${type}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${type}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleAddCareer = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/careers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newCareer)
            });
            if (response.ok) {
                const resData = await response.json();
                setCareers([...careers, { ...newCareer, id: resData.id }]);
                setNewCareer({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' });
                setShowCareerForm(false);
            }
        } catch (error) {
            console.error('Error adding career:', error);
        }
    };

    const handleDeleteCareer = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/api/careers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCareers(careers.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting career:', error);
        }
    };

    const handleAddProgram = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/programs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newProgram)
            });
            if (response.ok) {
                const resData = await response.json();
                setPrograms([...programs, { ...newProgram, id: resData.id }]);
                setNewProgram({ title: '', category: '', description: '', icon: 'Code' });
                setShowProgramForm(false);
            }
        } catch (error) {
            console.error('Error adding program:', error);
        }
    };

    const handleDeleteProgram = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/api/programs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPrograms(programs.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting program:', error);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newEvent)
            });
            if (response.ok) {
                const resData = await response.json();
                setEvents([...events, { ...newEvent, id: resData.id, status: 'Upcoming' }]);
                setNewEvent({ title: '', date: '', location: '', description: '', image: '' });
                setShowAddEventModal(false);
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEvents(events.filter(e => e.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleViewRegistrations = async (eventId) => {
        setSelectedEventId(eventId);
        setShowRegistrationsModal(true);
        if (!eventRegistrations[eventId]) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/api/events/${eventId}/registrations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setEventRegistrations(prev => ({ ...prev, [eventId]: data }));
                }
            } catch (error) {
                console.error('Error fetching registrations:', error);
            }
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'contacts', label: 'Contact Submissions', icon: Users },
        { id: 'donations', label: 'Donations', icon: Heart },
        { id: 'applications', label: 'Job Applications', icon: FileText },
        { id: 'careers', label: 'Manage Careers', icon: Briefcase },
        { id: 'programs', label: 'Manage Programs', icon: GraduationCap },
        { id: 'events', label: 'Manage Events', icon: Calendar },
    ];

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const SidebarItem = ({ icon: Icon, label, active, onClick, isOpen }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'} ${!isOpen && 'justify-center'}`}
            title={!isOpen ? label : ''}
        >
            <Icon size={20} />
            {isOpen && <span className="font-medium">{label}</span>}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-20 flex">
            {/* Desktop Sidebar */}
            <aside
                className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white shadow-xl z-40 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col`}
            >
                <div className="p-4 flex-1 overflow-y-auto">
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                active={activeTab === item.id}
                                onClick={() => setActiveTab(item.id)}
                                isOpen={isSidebarOpen}
                            />
                        ))}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 text-red-600 hover:bg-red-50 p-3 rounded-xl w-full transition-colors ${!isSidebarOpen && 'justify-center'}`}
                        title={!isSidebarOpen ? 'Logout' : ''}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="mt-4 flex items-center justify-center w-full text-gray-400 hover:text-gray-600"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 md:hidden flex flex-col`}
            >
                <div className="p-4 flex-1 overflow-y-auto">
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-600 hover:bg-red-50 p-3 rounded-xl w-full transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} p-6 md:p-8 overflow-x-hidden`}>
                <div className="max-w-7xl mx-auto">
                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white rounded-lg shadow-sm">
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && analyticsData && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-gray-800">Analytics Overview</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4">Applications by Role</h3>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={analyticsData.appsByRole}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="title" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Bar dataKey="count" fill="#2A9D8F" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4">Contact Inquiries</h3>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={analyticsData.contactsBySubject} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="count" nameKey="subject" label>
                                                    {analyticsData.contactsBySubject.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contacts Tab */}
                    {activeTab === 'contacts' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Contact Submissions</h2>
                                <Button onClick={() => handleExport('contacts')} variant="outline" size="sm" className="flex items-center gap-2">
                                    <Download size={16} /> Export CSV
                                </Button>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 font-semibold text-gray-600">Name</th>
                                                <th className="p-4 font-semibold text-gray-600">Subject</th>
                                                <th className="p-4 font-semibold text-gray-600">Message</th>
                                                <th className="p-4 font-semibold text-gray-600">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {contacts.map((c) => (
                                                <tr key={c.id} className="hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="font-medium text-gray-900">{c.firstName} {c.lastName}</div>
                                                        <div className="text-sm text-gray-500">{c.email}</div>
                                                    </td>
                                                    <td className="p-4">{c.subject}</td>
                                                    <td className="p-4 text-gray-600 max-w-xs truncate">{c.message}</td>
                                                    <td className="p-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Donations Tab */}
                    {activeTab === 'donations' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Donations</h2>
                                <Button onClick={() => handleExport('donations')} variant="outline" size="sm" className="flex items-center gap-2">
                                    <Download size={16} /> Export CSV
                                </Button>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 font-semibold text-gray-600">Amount</th>
                                                <th className="p-4 font-semibold text-gray-600">Frequency</th>
                                                <th className="p-4 font-semibold text-gray-600">Method</th>
                                                <th className="p-4 font-semibold text-gray-600">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {donations.map((d) => (
                                                <tr key={d.id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-bold text-green-600">${d.amount}</td>
                                                    <td className="p-4 capitalize">{d.frequency}</td>
                                                    <td className="p-4">{d.paymentMethod}</td>
                                                    <td className="p-4 text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Applications Tab */}
                    {activeTab === 'applications' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 font-semibold text-gray-600">Candidate</th>
                                                <th className="p-4 font-semibold text-gray-600">Role</th>
                                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                                <th className="p-4 font-semibold text-gray-600">Resume</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {applications.map((app) => (
                                                <tr key={app.id} className="hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="font-medium text-gray-900">{app.firstName} {app.lastName}</div>
                                                        <div className="text-sm text-gray-500">{app.email}</div>
                                                    </td>
                                                    <td className="p-4">{app.jobTitle || 'Unknown'}</td>
                                                    <td className="p-4">
                                                        <select
                                                            value={app.status || 'Pending'}
                                                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                            className="text-sm border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Reviewed">Reviewed</option>
                                                            <option value="Interview">Interview</option>
                                                            <option value="Hired">Hired</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td className="p-4">
                                                        <a href={`${API_URL}/uploads/${app.resume}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                                            Download
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Careers Tab */}
                    {activeTab === 'careers' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Manage Careers</h2>
                                <Button onClick={() => setShowCareerForm(true)} size="sm" className="flex items-center gap-2">
                                    <Plus size={20} /> Add Job
                                </Button>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 font-semibold text-gray-600">Title</th>
                                                <th className="p-4 font-semibold text-gray-600">Department</th>
                                                <th className="p-4 font-semibold text-gray-600">Type</th>
                                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {careers.map((c) => (
                                                <tr key={c.id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-medium text-gray-900">{c.title}</td>
                                                    <td className="p-4 text-gray-500">{c.department}</td>
                                                    <td className="p-4 text-gray-500">{c.type}</td>
                                                    <td className="p-4 text-right">
                                                        <button onClick={() => handleDeleteCareer(c.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Programs Tab */}
                    {activeTab === 'programs' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Manage Programs</h2>
                                <Button onClick={() => setShowProgramForm(true)} size="sm" className="flex items-center gap-2">
                                    <Plus size={20} /> Add Program
                                </Button>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 font-semibold text-gray-600">Title</th>
                                                <th className="p-4 font-semibold text-gray-600">Category</th>
                                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {programs.map((p) => (
                                                <tr key={p.id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-medium text-gray-900">{p.title}</td>
                                                    <td className="p-4 text-gray-500">{p.category}</td>
                                                    <td className="p-4 text-right">
                                                        <button onClick={() => handleDeleteProgram(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Events Tab */}
                    {activeTab === 'events' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
                                <Button onClick={() => setShowAddEventModal(true)} variant="primary" className="flex items-center gap-2">
                                    <Plus size={20} /> Add Event
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {events.map((event) => (
                                    <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${new Date(event.date) > new Date() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                                        <div className="mt-auto flex gap-3">
                                            <Button onClick={() => handleViewRegistrations(event.id)} variant="outline" size="sm" className="flex-1">
                                                View Signups
                                            </Button>
                                            <button
                                                onClick={() => handleDeleteEvent(event.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modals */}
            {showCareerForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add New Job</h3>
                            <button onClick={() => setShowCareerForm(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddCareer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required placeholder="Job Title" className="p-2 border rounded-lg" value={newCareer.title} onChange={e => setNewCareer({ ...newCareer, title: e.target.value })} />
                            <input required placeholder="Department" className="p-2 border rounded-lg" value={newCareer.department} onChange={e => setNewCareer({ ...newCareer, department: e.target.value })} />
                            <input required placeholder="Location" className="p-2 border rounded-lg" value={newCareer.location} onChange={e => setNewCareer({ ...newCareer, location: e.target.value })} />
                            <select className="p-2 border rounded-lg" value={newCareer.type} onChange={e => setNewCareer({ ...newCareer, type: e.target.value })}>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Internship</option>
                                <option>Volunteer</option>
                            </select>
                            <textarea required placeholder="Description" className="p-2 border rounded-lg md:col-span-2" rows="3" value={newCareer.description} onChange={e => setNewCareer({ ...newCareer, description: e.target.value })} />
                            <textarea required placeholder="Requirements" className="p-2 border rounded-lg md:col-span-2" rows="2" value={newCareer.requirements} onChange={e => setNewCareer({ ...newCareer, requirements: e.target.value })} />
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full justify-center">Post Job</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showProgramForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add New Program</h3>
                            <button onClick={() => setShowProgramForm(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddProgram} className="space-y-4">
                            <input required placeholder="Program Title" className="w-full p-2 border rounded-lg" value={newProgram.title} onChange={e => setNewProgram({ ...newProgram, title: e.target.value })} />
                            <input required placeholder="Category" className="w-full p-2 border rounded-lg" value={newProgram.category} onChange={e => setNewProgram({ ...newProgram, category: e.target.value })} />
                            <textarea required placeholder="Description" className="w-full p-2 border rounded-lg" rows="3" value={newProgram.description} onChange={e => setNewProgram({ ...newProgram, description: e.target.value })} />
                            <Button type="submit" className="w-full justify-center">Launch Program</Button>
                        </form>
                    </div>
                </div>
            )}

            {showAddEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add New Event</h3>
                            <button onClick={() => setShowAddEventModal(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddEvent} className="space-y-4">
                            <input name="title" placeholder="Event Title" required className="w-full p-2 border rounded-lg" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                            <input name="date" type="date" required className="w-full p-2 border rounded-lg" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
                            <input name="location" placeholder="Location" required className="w-full p-2 border rounded-lg" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />
                            <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded-lg" rows="3" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}></textarea>
                            <input name="image" placeholder="Image URL (Optional)" className="w-full p-2 border rounded-lg" value={newEvent.image} onChange={e => setNewEvent({ ...newEvent, image: e.target.value })} />
                            <Button type="submit" className="w-full justify-center">Create Event</Button>
                        </form>
                    </div>
                </div>
            )}

            {showRegistrationsModal && selectedEventId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Event Registrations</h3>
                            <button onClick={() => setShowRegistrationsModal(false)}><X size={24} /></button>
                        </div>

                        {!eventRegistrations[selectedEventId] ? (
                            <p>Loading...</p>
                        ) : eventRegistrations[selectedEventId].length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No registrations yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-3 font-semibold text-gray-600">Name</th>
                                            <th className="p-3 font-semibold text-gray-600">Email</th>
                                            <th className="p-3 font-semibold text-gray-600">Phone</th>
                                            <th className="p-3 font-semibold text-gray-600">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {eventRegistrations[selectedEventId].map((reg) => (
                                            <tr key={reg.id}>
                                                <td className="p-3">{reg.name}</td>
                                                <td className="p-3">{reg.email}</td>
                                                <td className="p-3">{reg.phone}</td>
                                                <td className="p-3 text-sm text-gray-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
