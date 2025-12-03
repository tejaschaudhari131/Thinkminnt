import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Button from '../components/Button';
import API_URL from '../config/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/api/events/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, eventId: selectedEvent.id }),
            });
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setShowModal(false);
                    setSuccess(false);
                }, 3000);
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert('An error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageTransition>
            <SEO
                title="Upcoming Events | ThinkMinnt Foundation"
                description="Join our workshops, plantation drives, and community meetups. Make a difference with ThinkMinnt Foundation."
                keywords="Events, Workshops, Volunteering, Pune, NGO, ThinkMinnt, Think Mint, Think Minnd, Community Service, Plantation Drive"
            />

            {/* Hero Section */}
            <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6"
                    >
                        Upcoming Events
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Join us on the ground. Make a difference in person.
                    </p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-xl">No upcoming events scheduled at the moment.</p>
                            <p>Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={event.image || 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                                            {event.status}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-sm text-secondary font-semibold mb-2">
                                            <Calendar size={16} />
                                            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <MapPin size={16} />
                                            {event.location}
                                        </div>
                                        <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{event.description}</p>
                                        <Button onClick={() => handleRegisterClick(event)} className="w-full justify-center">
                                            Register Now
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Registration Modal */}
            <AnimatePresence>
                {showModal && selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-900">Register for Event</h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6">
                                {success ? (
                                    <div className="text-center py-8">
                                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle className="text-green-600" size={32} />
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900 mb-2">You're In!</h4>
                                        <p className="text-gray-600">Thanks for registering for <strong>{selectedEvent.title}</strong>.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                            <p className="text-sm text-blue-800 font-medium">Event: {selectedEvent.title}</p>
                                            <p className="text-xs text-blue-600 mt-1">{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.location}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        <Button type="submit" variant="primary" className="w-full justify-center mt-6" disabled={submitting}>
                                            {submitting ? 'Registering...' : 'Confirm Registration'}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Events;
