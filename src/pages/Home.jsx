import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, Globe, Lightbulb, Heart, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import Testimonials from '../components/Testimonials';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const StatCounter = ({ number, label }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="text-5xl md:text-6xl font-bold text-accent mb-3 font-heading">{number}</div>
            <div className="text-gray-300 font-medium tracking-wide uppercase text-sm">{label}</div>
        </motion.div>
    );
};

const Home = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <PageTransition>
            <div className="flex flex-col overflow-hidden">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center bg-primary-dark text-white pt-20 overflow-hidden">
                    {/* Background Image & Overlay */}
                    <motion.div style={{ y }} className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                            alt="Children learning"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary/40 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent"></div>
                    </motion.div>

                    {/* Animated Shapes */}
                    <motion.div
                        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl z-0 mix-blend-screen"
                    />
                    <motion.div
                        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl z-0 mix-blend-screen"
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                                className="max-w-3xl"
                            >
                                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent font-semibold text-sm mb-8 border border-white/10 backdrop-blur-md">
                                    <Sparkles size={16} />
                                    Est. November 2024
                                </motion.div>
                                <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold font-heading mb-8 leading-tight tracking-tight">
                                    Think<span className="text-secondary">Minnt</span> <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Foundation</span>
                                </motion.h1>
                                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-lg font-light">
                                    A Section 8 Non-Profit Organization dedicated to <span className="text-white font-medium">Education</span>, <span className="text-white font-medium">Innovation</span>, and <span className="text-white font-medium">Child Development</span>.
                                </motion.p>
                                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
                                    <Button to="/programs" variant="primary" size="lg" icon={ArrowRight} className="shadow-glow">
                                        Our Programs
                                    </Button>
                                    <Button to="/donate" variant="outline" size="lg" className="border-white/30 hover:bg-white/10">
                                        Make a Donation
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Hero Image Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 50, rotate: 5 }}
                                animate={{ opacity: 1, x: 0, rotate: 3 }}
                                transition={{ duration: 1, delay: 0.4, type: "spring" }}
                                className="hidden lg:block relative"
                            >
                                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 backdrop-blur-sm transform hover:rotate-0 transition-transform duration-700">
                                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Community Impact" className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <p className="font-heading font-bold text-2xl">Empowering Youth</p>
                                        <p className="text-gray-300">Building a brighter tomorrow</p>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-10 -right-10 w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-white/20"
                                >
                                    <div className="text-center text-primary-dark">
                                        <span className="block text-3xl font-bold font-heading">100%</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">Non-Profit</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-32 bg-neutral-50 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">Our Core Pillars</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 font-heading mb-6">Bridging the Gap</h2>
                            <p className="max-w-2xl mx-auto text-xl text-gray-600 font-light">
                                We bridge the gap between potential and opportunity through three focused initiatives.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-10"
                        >
                            {[
                                {
                                    icon: <Lightbulb size={40} className="text-accent" />,
                                    title: "Innovation",
                                    description: "Fostering creative solutions to local challenges through technology and design thinking.",
                                    color: "bg-accent/10",
                                    border: "border-accent/20"
                                },
                                {
                                    icon: <Users size={40} className="text-secondary" />,
                                    title: "Empowerment",
                                    description: "Providing skills training and resources to help individuals build sustainable livelihoods.",
                                    color: "bg-secondary/10",
                                    border: "border-secondary/20"
                                },
                                {
                                    icon: <Globe size={40} className="text-primary" />,
                                    title: "Sustainability",
                                    description: "Promoting environmental stewardship and long-term community resilience.",
                                    color: "bg-primary/10",
                                    border: "border-primary/20"
                                }
                            ].map((item, index) => (
                                <motion.div variants={fadeInUp} key={index}>
                                    <div className={`bg-white p-10 rounded-3xl border ${item.border} shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col`}>
                                        <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center mb-8`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-8 text-lg flex-grow">
                                            {item.description}
                                        </p>
                                        <Link to="/about" className="text-gray-900 font-semibold flex items-center hover:gap-3 transition-all group">
                                            Learn more <ArrowRight size={18} className="ml-2 text-secondary group-hover:text-primary transition-colors" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="py-32 bg-primary-dark text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {[
                                { number: "50+", label: "Communities Served" },
                                { number: "10k+", label: "Lives Impacted" },
                                { number: "120", label: "Projects Completed" },
                                { number: "95%", label: "Funds to Programs" }
                            ].map((stat, index) => (
                                <StatCounter key={index} number={stat.number} label={stat.label} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <Testimonials />

                {/* Call to Action */}
                <section className="py-32 bg-white relative overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-primary to-primary-dark rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
                        >
                            {/* Decorative Circles */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-bold text-white font-heading mb-8">Ready to Make a Difference?</h2>
                                <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                                    Your support enables us to continue our vital work. Whether you donate, volunteer, or partner with us, you are part of the solution.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-6">
                                    <Button to="/donate" variant="accent" size="lg" icon={Heart} className="shadow-xl shadow-accent/20 text-primary-dark font-bold">
                                        Donate Now
                                    </Button>
                                    <Button to="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                                        Contact Us
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;
