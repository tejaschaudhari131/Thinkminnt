import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, X, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registrationStatus, setRegistrationStatus] = useState('idle'); // idle, submitting, success

    const upcomingEvents = [
        {
            id: 1,
            title: "Tech for All Workshop",
            date: "Dec 15, 2024",
            time: "10:00 AM - 2:00 PM",
            location: "Pune Community Center",
            description: "A hands-on workshop teaching basic computer skills to students from underprivileged backgrounds. Volunteers needed!",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Workshop"
        },
        {
            id: 2,
            title: "Green City Drive",
            date: "Dec 22, 2024",
            time: "8:00 AM - 12:00 PM",
            location: "Vetal Tekdi, Pune",
            description: "Join us for a tree plantation drive. Let's make our city greener and cleaner together.",
            image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Environment"
        },
        {
            id: 3,
            title: "Fundraising Gala",
            date: "Jan 10, 2025",
            time: "6:00 PM - 10:00 PM",
            location: "Sheraton Grand, Pune",
            description: "An evening of networking, performances, and giving back. All proceeds go towards our 'Literacy First' program.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Fundraiser"
        }
    ];

    const pastEvents = [
        {
            id: 4,
            title: "Diwali Donation Drive",
            date: "Nov 10, 2024",
            location: "Multiple Locations",
            description: "Distributed sweets and clothes to over 500 families across Pune.",
            image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "Coding Bootcamp",
            date: "Oct 15, 2024",
            location: "Online",
            description: "A 4-week intensive coding bootcamp for high school students.",
            image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const handleRegister = (e) => {
        e.preventDefault();
        setRegistrationStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setRegistrationStatus('success');
            setTimeout(() => {
                setSelectedEvent(null);
                setRegistrationStatus('idle');
            }, 3000);
        }, 1500);
    };

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": upcomingEvents.map((event, index) => ({
            "@type": "Event",
            "position": index + 1,
            "name": event.title,
            "startDate": new Date(event.date).toISOString(), // Note: Ideally parse date correctly
            "location": {
                "@type": "Place",
                "name": event.location,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Pune",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                }
            },
            "image": event.image,
            "description": event.description,
            "organizer": {
                "@type": "Organization",
                "name": "ThinkMinnt Foundation",
                "url": "https://thinkminnt.com"
            }
        }))
    };

    return (
        <PageTransition>
            <SEO
                title="Events & Workshops"
                description="Join us in making a difference. Participate in our upcoming events, workshops, and fundraisers."
                keywords="Events, Workshops, Fundraisers, Volunteer Opportunities, Pune Events, Community Service"
                schema={eventSchema}
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
                                <span className="bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent">
                                    Events & Workshops
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                Join us in making a difference. Participate in our upcoming events and be a part of the change.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-12 w-2 bg-secondary rounded-full"></div>
                            <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary shadow-sm">
                                            {event.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-secondary font-medium mb-2">
                                            <Calendar size={16} />
                                            <span>{event.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                                        <div className="space-y-2 text-gray-600 mb-6">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-gray-400" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-400" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>
                                        <Button
                                            onClick={() => setSelectedEvent(event)}
                                            className="w-full justify-center"
                                        >
                                            Register Now <ArrowRight size={18} className="ml-2" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Past Events */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-12 w-2 bg-gray-300 rounded-full"></div>
                            <h2 className="text-4xl font-bold text-gray-900">Past Events</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {pastEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col md:flex-row bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
                                >
                                    <div className="md:w-1/3 h-48 md:h-auto relative">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                            <Calendar size={14} />
                                            <span>{event.date}</span>
                                            <span className="mx-1">•</span>
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                        <p className="text-gray-600">{event.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Register for Event</h2>
                                        <p className="text-gray-500 text-sm mt-1">{selectedEvent.title}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-gray-500" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    {registrationStatus === 'success' ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Confirmed!</h3>
                                            <p className="text-gray-600">We have sent the details to your email address.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleRegister} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                                <input required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                                <input type="email" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                                <input type="tel" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                            </div>

                                            <div className="pt-4 flex gap-3">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="flex-1 justify-center"
                                                    onClick={() => setSelectedEvent(null)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="flex-1 justify-center"
                                                    disabled={registrationStatus === 'submitting'}
                                                >
                                                    {registrationStatus === 'submitting' ? 'Registering...' : 'Confirm Registration'}
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default Events;
