import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_URL from '../config/api';

const Contact = () => {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "ThinkMinnt Foundation",
        "url": "https://thinkminnt.com",
        "logo": "https://thinkminnt.com/logo.jpg",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+91-91393-92550",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi", "mr"]
            },
            {
                "@type": "ContactPoint",
                "telephone": "+91-93721-95870",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi", "mr"]
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "S No. 89/1, 89/2, Shop No. Namo Developers, Mohamadwadi",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411060",
            "addressCountry": "IN"
        }
    };

    return (
        <PageTransition>
            <SEO
                title="Contact Us"
                description="Get in touch with ThinkMinnt Foundation. We'd love to hear from you about volunteering, donations, or partnerships."
                keywords="Contact, Address, Email, Phone, Volunteer, Donate"
                schema={contactSchema}
            />
            <div className="flex flex-col">
                {/* Header */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-bold font-heading mb-6"
                        >
                            <span className="bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent">
                                Contact Us
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            We'd love to hear from you. Reach out with any questions, suggestions, or just to say hello.
                        </motion.p>
                    </div>
                </section>

                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-primary-dark rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-8 font-heading">Get in Touch</h2>
                                    <p className="text-gray-300 mb-12 text-lg font-light">
                                        Whether you're interested in volunteering, donating, or partnering with us, our team is ready to assist you.
                                    </p>

                                    <div className="space-y-10">
                                        <div className="flex items-start gap-6 group">
                                            <div className="bg-white/10 p-4 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 border border-white/10">
                                                <MapPin size={28} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-xl mb-2">Visit Us</h3>
                                                <p className="text-gray-400 leading-relaxed">S No. 89/1, 89/2, Shop No. Namo Developers,<br />Mohamadwadi, Pune City, Pune – 411060</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6 group">
                                            <div className="bg-white/10 p-4 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 border border-white/10">
                                                <Mail size={28} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-xl mb-2">Email Us</h3>
                                                <p className="text-gray-400">tejaschaudhari131@gmail.com</p>
                                                <p className="text-gray-400">adityajoshi020503@gmail.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6 group">
                                            <div className="bg-white/10 p-4 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 border border-white/10">
                                                <Phone size={28} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-xl mb-2">Call Us</h3>
                                                <p className="text-gray-400">+91 91393 92550 (Tejaram Choudhari)</p>
                                                <p className="text-gray-400">+91 93721 95870 (Aditya Joshi)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-gray-100"
                            >
                                <form className="space-y-6" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = {
                                        firstName: e.target.firstName.value,
                                        lastName: e.target.lastName.value,
                                        email: e.target.email.value,
                                        subject: e.target.subject.value,
                                        message: e.target.message.value
                                    };
                                    try {
                                        const response = await fetch(`${API_URL}/api/contact`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(formData)
                                        });
                                        if (response.ok) {
                                            alert('Message sent successfully!');
                                            e.target.reset();
                                        } else {
                                            alert('Failed to send message.');
                                        }
                                    } catch (error) {
                                        console.error('Error:', error);
                                        alert('An error occurred.');
                                    }
                                }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                            <input type="text" id="firstName" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" placeholder="John" />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                            <input type="text" id="lastName" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input type="email" id="email" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" placeholder="john@example.com" />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                        <div className="relative">
                                            <select id="subject" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none font-medium text-gray-600">
                                                <option>General Inquiry</option>
                                                <option>Volunteer Opportunities</option>
                                                <option>Donation Question</option>
                                                <option>Partnership Proposal</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-gray-500">
                                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                        <textarea id="message" rows="5" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none font-medium" placeholder="How can we help you?"></textarea>
                                    </div>

                                    <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full justify-center shadow-lg shadow-primary/25 py-4 text-lg">
                                        Send Message
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Contact;
