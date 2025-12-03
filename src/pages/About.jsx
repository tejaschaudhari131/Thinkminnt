import React from 'react';
import { motion } from 'framer-motion';
import { History, Target, CheckCircle, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const About = () => {
    const team = [
        {
            name: "Tejaram Chaudhari",
            role: "Director / Founder",
            bio: "A visionary leader with over a decade of experience in social entrepreneurship. Tejaram is passionate about leveraging technology to solve grassroots educational challenges. His commitment to 'Education for All' drives the foundation's strategic direction and innovation initiatives.",
            image: "/assets/tejaram_chaudhari.jpg"
        },
        {
            name: "Aditya Joshi",
            role: "Director / Founder",
            bio: "With a strong background in community development and operations, Aditya ensures that our programs reach the most vulnerable populations effectively. He oversees the on-ground implementation of our initiatives and fosters key partnerships with local stakeholders.",
            image: "/assets/aditya_joshi.jpg"
        }
    ];

    const values = [
        "Transparency & Integrity",
        "Community-First Approach",
        "Innovation & Excellence"
    ];

    return (
        <PageTransition>
            <SEO
                title="About Us"
                description="Learn about ThinkMinnt Foundation's mission, vision, and the team driving our efforts to empower communities through education and innovation."
                keywords="About ThinkMinnt, NGO Mission, Vision, Team, Leadership, Values"
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-bold font-heading text-white mb-8"
                        >
                            About <span className="text-secondary">ThinkMinnt</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            A legally registered non-profit organization incorporated under the Ministry of Corporate Affairs, Government of India.
                        </motion.p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative sticky top-32"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-[2rem] transform rotate-3 translate-x-4 translate-y-4 opacity-20"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Our Team Collaborating"
                                    className="relative rounded-[2rem] shadow-2xl z-10 w-full"
                                />
                                <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden md:block">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="bg-accent/20 p-3 rounded-full text-accent-dark">
                                            <History size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-semibold uppercase">Established</p>
                                            <p className="text-xl font-bold text-gray-900">Nov 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                                    <Target size={16} />
                                    Who We Are
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-8 leading-tight">
                                    Driven by Purpose, <br /> Fueled by Passion.
                                </h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-6">
                                        To empower high school students to pursue careers driven by passion, curiosity, and innovation in MINT (Mathematics, Informatics, Natural Sciences, and Technology) through interdisciplinary MINNT-based initiatives, integrating MINT with networking.
                                    </p>
                                    <p className="mb-6">
                                        We aim to provide students with opportunities to engage in creativity, physical activities, and service-based learning, fostering personal growth, teamwork, leadership, and a sense of community responsibility. By participating in diverse projects and experiences that extend beyond academics, students develop essential life skills like collaboration, problem-solving, and time management.
                                    </p>
                                    <p className="mb-6">
                                        This prepares them not only for higher education but also for meaningful contributions to society and successful careers in tech emerging fields like AI, cybersecurity, and data science. Our goal is to cultivate well-rounded individuals who are equipped to thrive in an evolving global landscape.
                                    </p>
                                </div>

                                <div className="mt-10 bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                                    <h3 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-2">
                                        <CheckCircle className="text-secondary" />
                                        Transparency & Legal Compliance
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div className="p-4 bg-white rounded-xl shadow-sm">
                                            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">CIN</span>
                                            <span className="font-mono font-medium text-gray-900">U85500PN2024NPL235880</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-xl shadow-sm">
                                            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Licence No</span>
                                            <span className="font-mono font-medium text-gray-900">162020</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-xl shadow-sm">
                                            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">PAN</span>
                                            <span className="font-mono font-medium text-gray-900">AALCT4053G</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-xl shadow-sm">
                                            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">TAN</span>
                                            <span className="font-mono font-medium text-gray-900">PNET19764D</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-white rounded-xl shadow-sm">
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Registration Authority</span>
                                        <span className="font-medium text-gray-900">Registrar of Companies (ROC), Pune</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Our Core Values</h2>
                            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {values.map((value, index) => (
                                <motion.div
                                    variants={fadeInUp}
                                    key={index}
                                    className="flex items-center bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-all hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mr-4 flex-shrink-0 text-primary">
                                        <CheckCircle size={24} />
                                    </div>
                                    <span className="text-lg font-medium text-gray-800">{value}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-dark font-semibold text-sm mb-6">
                                <Users size={16} />
                                Leadership
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">Meet Our Directors</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-xl font-light">
                                The visionary leaders driving our mission forward.
                            </p>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
                        >
                            {team.map((member, index) => (
                                <motion.div variants={fadeInUp} key={index}>
                                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-500 group border border-gray-100">
                                        <div className="h-80 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-8 text-center relative">
                                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
                                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                                                    <Users size={32} />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading mt-8">{member.name}</h3>
                                            <p className="text-secondary font-medium mb-4 uppercase tracking-wider text-sm">{member.role}</p>
                                            <p className="text-gray-600 leading-relaxed">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default About;
