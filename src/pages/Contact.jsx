import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_URL from '../config/api';
import MapComponent from '../components/MapComponent';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className="font-bold text-gray-800 group-hover:text-primary transition-colors">{question}</span>
                <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-4 text-gray-600 text-sm leading-relaxed">{answer}</p>
            </motion.div>
        </div>
    );
};

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
                title="Contact Us - ThinkMinnt Foundation"
                description="Get in touch with ThinkMinnt Foundation. We'd love to hear from you about volunteering, donations, or partnerships."
                keywords="Contact, Address, Email, Phone, Volunteer, Donate, Pune NGO"
                schema={contactSchema}
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 rounded-full bg-white/10 text-secondary text-sm font-medium mb-4 backdrop-blur-sm border border-white/10"
                        >
                            Get in Touch
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold font-heading mb-6"
                        >
                            Let's Start a <span className="text-secondary">Conversation</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
                        >
                            Whether you have a question, want to volunteer, or just want to say hello, we're here to listen.
                        </motion.p>
                    </div>
                </section>

                <section className="py-20 bg-neutral-50 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Contact Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-32 relative z-20">
                            {[
                                {
                                    icon: Phone,
                                    title: "Call Us",
                                    lines: ["+91 91393 92550", "+91 93721 95870"],
                                    color: "bg-blue-500"
                                },
                                {
                                    icon: Mail,
                                    title: "Email Us",
                                    lines: ["contact-us@thinkminnt.com", "careers@thinkminnt.com"],
                                    color: "bg-secondary"
                                },
                                {
                                    icon: MapPin,
                                    title: "Visit Us",
                                    lines: ["S No. 89/1, Mohamadwadi", "Pune, Maharashtra 411060"],
                                    color: "bg-accent"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${item.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className={item.color.replace('bg-', 'text-')} size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                    {item.lines.map((line, i) => (
                                        <p key={i} className="text-gray-600 font-medium">{line}</p>
                                    ))}
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Left Column: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg border border-gray-100">
                                    <h2 className="text-3xl font-bold mb-2 font-heading text-gray-900">Send a Message</h2>
                                    <p className="text-gray-500 mb-8">We usually respond within 24 hours.</p>

                                    <form className="space-y-5" onSubmit={async (e) => {
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
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                                <input type="text" name="firstName" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                                <input type="text" name="lastName" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                            <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                            <select name="subject" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-600">
                                                <option>General Inquiry</option>
                                                <option>Volunteer Opportunities</option>
                                                <option>Donation Question</option>
                                                <option>Partnership Proposal</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                            <textarea name="message" rows="4" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                                        </div>

                                        <Button type="submit" className="w-full justify-center py-4 text-lg shadow-lg shadow-primary/20">
                                            Send Message <Send size={18} className="ml-2" />
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Right Column: Map & FAQ */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-10"
                            >
                                {/* Map */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 font-heading text-gray-900 flex items-center gap-2">
                                        <MapPin className="text-secondary" /> Find Us
                                    </h3>
                                    <MapComponent />
                                </div>

                                {/* FAQ */}
                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold mb-6 font-heading text-gray-900 flex items-center gap-2">
                                        <HelpCircle className="text-accent" /> FAQ
                                    </h3>
                                    <div className="space-y-2">
                                        <FAQItem
                                            question="How can I volunteer?"
                                            answer="Visit our 'Get Involved' page to fill out a volunteer application form. We welcome skills of all kinds!"
                                        />
                                        <FAQItem
                                            question="Are donations tax-deductible?"
                                            answer="Yes, ThinkMinnt Foundation is a registered Section 8 non-profit. Donations are eligible for tax benefits under 80G."
                                        />
                                        <FAQItem
                                            question="Where does my donation go?"
                                            answer="100% of public donations go directly to our programs (education kits, workshops). Admin costs are covered by founders."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Contact;
