import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Send, CheckCircle, GraduationCap } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_URL from '../config/api';
import emailjs from '@emailjs/browser';

const GetInvolved = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

    const volunteerSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Get Involved - Volunteer",
        "description": "Join ThinkMinnt Foundation as a volunteer and make a difference in education and child development."
    };

    const handleVolunteerSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            interest: e.target.interest.value,
            availability: e.target.availability.value,
            message: e.target.message.value
        };

        try {
            // Send email via EmailJS
            await emailjs.send(
                'service_mao2bzd',
                'template_bcwrx2r',
                {
                    to_name: 'ThinkMinnt Team',
                    to_email: 'contact-us@thinkminnt.com', // Send to admin
                    reply_to: formData.email,
                    message: `
                        New Volunteer Application:
                        Name: ${formData.name}
                        Email: ${formData.email}
                        Phone: ${formData.phone}
                        Interest: ${formData.interest}
                        Availability: ${formData.availability}
                        Message: ${formData.message}
                    `
                },
                'Q50KacLeY8z0yfCN4'
            );

            setFormStatus('success');
            e.target.reset();
        } catch (error) {
            console.error('Volunteer form error:', error);
            setFormStatus('error');
        }
    };

    return (
        <PageTransition>
            <SEO
                title="Get Involved - Volunteer | ThinkMinnt Foundation"
                description="Join our mission at ThinkMinnt Foundation. Volunteer your time and skills to help underprivileged children in Pune. Be a changemaker today."
                keywords="Volunteer, ThinkMinnt, Think Mint, Think Minnd, NGO, Social Work, Education, Pune, Get Involved, Student Chapter, Community Service"
                schema={volunteerSchema}
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 rounded-full bg-white/10 text-secondary text-sm font-medium mb-4 backdrop-blur-sm border border-white/10"
                        >
                            Join the Movement
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-white"
                        >
                            Become a <span className="text-secondary">Changemaker</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            Your time and skills can light up a child's future. Join our community of passionate volunteers today.
                        </motion.p>
                    </div>
                </section>

                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                            {/* Left Column: Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">Why Volunteer?</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        Volunteering with ThinkMinnt is more than just giving time; it's about creating tangible impact. Whether you're teaching coding, organizing events, or mentoring students, you're building the foundation for a better tomorrow.
                                    </p>

                                    <div className="space-y-6">
                                        {[
                                            { icon: Users, title: "Community Impact", desc: "Directly affect the lives of children in your local community." },
                                            { icon: BookOpen, title: "Skill Development", desc: "Gain leadership, teaching, and organizational skills." },
                                            { icon: Heart, title: "Personal Growth", desc: "Experience the profound joy of giving back." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                                    <item.icon size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                                                    <p className="text-gray-600">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-dark">
                                            <GraduationCap size={24} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-xl">Start a Student Chapter</h3>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Are you a university student? Lead the change on your campus by starting a ThinkMinnt Chapter. Organize hackathons, fundraisers, and mentorship drives.
                                    </p>
                                    <Button to="/partners" variant="secondary" className="w-full justify-center">
                                        Learn More
                                    </Button>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-xl mb-4">Other Ways to Help</h3>
                                    <p className="text-gray-600 mb-6">Can't volunteer right now? You can still support our mission.</p>
                                    <Button to="/donate" variant="outline" className="w-full justify-center">
                                        Make a Donation
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Right Column: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                                <h2 className="text-3xl font-bold mb-2 font-heading text-gray-900 relative z-10">Volunteer Sign Up</h2>
                                <p className="text-gray-500 mb-8 relative z-10">Fill out the form and we'll get back to you.</p>

                                {formStatus === 'success' ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                        <p className="text-gray-600">We've received your application. Our team will contact you shortly.</p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="mt-8 text-primary font-medium hover:underline"
                                        >
                                            Submit another application
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleVolunteerSubmit} className="space-y-5 relative z-10">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Jane Doe" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                                <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="jane@example.com" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                                <input type="tel" name="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+91 98765 43210" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Area of Interest</label>
                                            <select name="interest" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-600">
                                                <option value="Teaching">Teaching / Mentoring</option>
                                                <option value="Events">Event Management</option>
                                                <option value="Social Media">Social Media & Marketing</option>
                                                <option value="Fundraising">Fundraising</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                                            <select name="availability" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-600">
                                                <option value="Weekends">Weekends Only</option>
                                                <option value="Weekdays">Weekdays</option>
                                                <option value="Flexible">Flexible</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Why do you want to join?</label>
                                            <textarea name="message" rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Tell us a bit about yourself..."></textarea>
                                        </div>

                                        {formStatus === 'error' && (
                                            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                                Something went wrong. Please try again.
                                            </div>
                                        )}

                                        <Button type="submit" disabled={formStatus === 'submitting'} className="w-full justify-center py-4 text-lg shadow-lg shadow-primary/20">
                                            {formStatus === 'submitting' ? 'Submitting...' : 'Sign Up to Volunteer'}
                                        </Button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default GetInvolved;
