import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download } from 'lucide-react';
import API_URL from '../config/api';

const COLORS = ['#2A9D8F', '#E9C46A', '#E76F51', '#264653', '#1A365D'];

const Admin = () => {
    const [contacts, setContacts] = useState([]);
    const [donations, setDonations] = useState([]);
    const [applications, setApplications] = useState([]);
    const [careers, setCareers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null);

    // Form States
    const [newCareer, setNewCareer] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' });
    const [newProgram, setNewProgram] = useState({ title: '', category: '', description: '', icon: 'Code' });
    const [showCareerForm, setShowCareerForm] = useState(false);
    const [showProgramForm, setShowProgramForm] = useState(false);
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
                const [contactsRes, donationsRes, applicationsRes, analyticsRes, careersRes, programsRes] = await Promise.all([
                    fetch(`${API_URL}/api/contacts`, { headers }),
                    fetch(`${API_URL}/api/donations`, { headers }),
                    fetch(`${API_URL}/api/applications`, { headers }),
                    fetch(`${API_URL}/api/analytics`, { headers }),
                    fetch(`${API_URL}/api/careers`),
                    fetch(`${API_URL}/api/programs`)
                ]);

                if (contactsRes.status === 401 || contactsRes.status === 403 || donationsRes.status === 401 || donationsRes.status === 403 || applicationsRes.status === 401 || applicationsRes.status === 403 || analyticsRes.status === 401 || analyticsRes.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                const contactsData = contactsRes.ok ? await contactsRes.json() : [];
                const donationsData = donationsRes.ok ? await donationsRes.json() : [];
                const applicationsData = applicationsRes.ok ? await applicationsRes.json() : [];
                const analyticsJson = analyticsRes.ok ? await analyticsRes.json() : null;
                const careersData = await careersRes.json(); // Public endpoint
                const programsData = await programsRes.json(); // Public endpoint

                setContacts(Array.isArray(contactsData) ? contactsData : []);
                setDonations(Array.isArray(donationsData) ? donationsData : []);
                setApplications(Array.isArray(applicationsData) ? applicationsData : []);
                setApplications(Array.isArray(applicationsData) ? applicationsData : []);
                setCareers(Array.isArray(careersData) ? careersData : []);
                setPrograms(Array.isArray(programsData) ? programsData : []);
                setAnalyticsData(analyticsJson);
            } catch (error) {
                console.error('Error fetching data:', error);
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

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/applications/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setApplications(applications.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                ));
            } else {
                console.error('Failed to update status');
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
            } else {
                console.error('Failed to export data');
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
        if (!window.confirm('Are you sure you want to delete this job?')) return;
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
        if (!window.confirm('Are you sure you want to delete this program?')) return;
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

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="bg-white hover:bg-gray-100 text-red-600 border-red-200">
                        Logout
                    </Button>
                </div>

                {/* Analytics Section */}
                {analyticsData && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Overview</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Applications by Role */}
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Applications by Role</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={analyticsData.appsByRole}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="title" />
                                            <YAxis allowDecimals={false} />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="count" fill="#2A9D8F" name="Applications" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Contact Subjects */}
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Inquiries</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={analyticsData.contactsBySubject}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="count"
                                                nameKey="subject"
                                            >
                                                {analyticsData.contactsBySubject.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Donations Trend */}
                            <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Donation Trends (Last 30 Days)</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analyticsData.donationsOverTime}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="total" stroke="#1A365D" strokeWidth={2} name="Total Donations ($)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Contacts Section */}
                <section className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Contact Submissions</h2>
                        <Button onClick={() => handleExport('contacts')} variant="outline" size="sm" className="flex items-center gap-2">
                            <Download size={16} /> Export CSV
                        </Button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {contacts.map((contact) => (
                                        <tr key={contact.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.firstName} {contact.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.message}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Donations Section */}
                <section className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Donations</h2>
                        <Button onClick={() => handleExport('donations')} variant="outline" size="sm" className="flex items-center gap-2">
                            <Download size={16} /> Export CSV
                        </Button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {donations.map((donation) => (
                                        <tr key={donation.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${donation.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{donation.frequency}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.paymentMethod}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donation.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Applications Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover Letter</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((app) => (
                                        <tr key={app.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.jobTitle || 'Unknown Role'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.firstName} {app.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <select
                                                    value={app.status || 'Pending'}
                                                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold border-0 focus:ring-2 focus:ring-primary/20 cursor-pointer ${app.status === 'Hired' ? 'bg-green-100 text-green-800' :
                                                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                                                                app.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Reviewed">Reviewed</option>
                                                    <option value="Interview">Interview</option>
                                                    <option value="Hired">Hired</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.phone}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={app.coverLetter}>{app.coverLetter || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                                                <a href={`${API_URL}/uploads/${app.resume}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    Download Resume
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* CMS Section: Careers */}
                <section className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Manage Careers</h2>
                        <Button onClick={() => setShowCareerForm(!showCareerForm)} size="sm">
                            {showCareerForm ? 'Cancel' : 'Add New Job'}
                        </Button>
                    </div>

                    {showCareerForm && (
                        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                            <form onSubmit={handleAddCareer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required placeholder="Job Title" className="p-2 border rounded" value={newCareer.title} onChange={e => setNewCareer({ ...newCareer, title: e.target.value })} />
                                <input required placeholder="Department" className="p-2 border rounded" value={newCareer.department} onChange={e => setNewCareer({ ...newCareer, department: e.target.value })} />
                                <input required placeholder="Location" className="p-2 border rounded" value={newCareer.location} onChange={e => setNewCareer({ ...newCareer, location: e.target.value })} />
                                <select className="p-2 border rounded" value={newCareer.type} onChange={e => setNewCareer({ ...newCareer, type: e.target.value })}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Internship</option>
                                    <option>Volunteer</option>
                                </select>
                                <textarea required placeholder="Description" className="p-2 border rounded md:col-span-2" rows="3" value={newCareer.description} onChange={e => setNewCareer({ ...newCareer, description: e.target.value })} />
                                <textarea required placeholder="Requirements" className="p-2 border rounded md:col-span-2" rows="2" value={newCareer.requirements} onChange={e => setNewCareer({ ...newCareer, requirements: e.target.value })} />
                                <div className="md:col-span-2">
                                    <Button type="submit" size="sm">Post Job</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {careers.map(c => (
                                    <tr key={c.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{c.department}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{c.type}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDeleteCareer(c.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* CMS Section: Programs */}
                <section className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Manage Programs</h2>
                        <Button onClick={() => setShowProgramForm(!showProgramForm)} size="sm">
                            {showProgramForm ? 'Cancel' : 'Add New Program'}
                        </Button>
                    </div>

                    {showProgramForm && (
                        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                            <form onSubmit={handleAddProgram} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required placeholder="Program Title" className="p-2 border rounded" value={newProgram.title} onChange={e => setNewProgram({ ...newProgram, title: e.target.value })} />
                                <input required placeholder="Category" className="p-2 border rounded" value={newProgram.category} onChange={e => setNewProgram({ ...newProgram, category: e.target.value })} />
                                <select className="p-2 border rounded" value={newProgram.icon} onChange={e => setNewProgram({ ...newProgram, icon: e.target.value })}>
                                    <option value="Code">Code Icon</option>
                                    <option value="Sprout">Sprout Icon</option>
                                    <option value="BookOpen">Book Icon</option>
                                    <option value="HeartHandshake">Heart Icon</option>
                                </select>
                                <textarea required placeholder="Description" className="p-2 border rounded md:col-span-2" rows="3" value={newProgram.description} onChange={e => setNewProgram({ ...newProgram, description: e.target.value })} />
                                <div className="md:col-span-2">
                                    <Button type="submit" size="sm">Launch Program</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {programs.map(p => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{p.category}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDeleteProgram(p.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Admin;
