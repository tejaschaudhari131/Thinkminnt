import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Handshake, ArrowRight, CheckCircle, Brain, Trophy, ShieldCheck, Users, Rocket, Globe } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Button from '../components/Button';

const Partners = () => {
    const benefits = [
        {
            title: "CSR Compliance",
            description: "Fulfill your Corporate Social Responsibility goals with a registered Section 8 non-profit.",
            icon: <CheckCircle className="text-secondary" size={24} />
        },
        {
            title: "Brand Visibility",
            description: "Co-branding opportunities on our digital platforms and on-ground events.",
            icon: <CheckCircle className="text-secondary" size={24} />
        },
        {
            title: "Employee Engagement",
            description: "Curated volunteering opportunities for your team to give back to the community.",
            icon: <CheckCircle className="text-secondary" size={24} />
        },
        {
            title: "Impact Reporting",
            description: "Quarterly detailed reports on how your funds are transforming lives.",
            icon: <CheckCircle className="text-secondary" size={24} />
        }
    ];

    return (
        <PageTransition>
            <SEO
                title="Partner With Us | ThinkMinnt Foundation"
                description="Collaborate with ThinkMinnt Foundation through CSR initiatives, school alliances, and strategic partnerships. Join us in Pune to drive social impact."
                keywords="CSR, Corporate Partnership, School Alliance, NGO Partnership, Pune, ThinkMinnt, Think Mint, Think Minnd, Social Impact, Corporate Social Responsibility"
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    {/* Added gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-0"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-white drop-shadow-lg"
                        >
                            Partner for <span className="text-secondary">Impact</span>
                        </motion.h1>
                        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
                            Join hands with us to build a more equitable future through education and innovation.
                        </p>
                    </div>
                </section>

                {/* Partnership Types */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Corporate Partnership */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-neutral-50 rounded-[2.5rem] p-10 border border-neutral-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary">
                                    <Building2 size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Corporate Partners (CSR)</h2>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                    Amplify your social impact by sponsoring our "Tech for All" labs or adopting a village. We offer structured CSR programs tailored to your organization's values.
                                </p>
                                <div className="space-y-4 mb-10">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            {benefit.icon}
                                            <div>
                                                <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                                                <p className="text-sm text-gray-500">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button to="/contact" variant="primary" className="w-full justify-center">
                                    Inquire for CSR
                                </Button>
                            </motion.div>

                            {/* School & University Alliances */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-neutral-50 rounded-[2.5rem] p-10 border border-neutral-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 text-accent-dark">
                                    <GraduationCap size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Educational Alliances</h2>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                    Connect your students with real-world social challenges. Launch a "ThinkMinnt Chapter" in your institution or partner with us for service-learning projects.
                                </p>
                                <div className="space-y-6 mb-10">
                                    <div className="bg-white p-6 rounded-xl shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-2">School-to-School Support</h4>
                                        <p className="text-sm text-gray-600">Private schools can sponsor resources for our underprivileged partner schools, fostering empathy and connection.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-2">University Chapters</h4>
                                        <p className="text-sm text-gray-600">Student-led chapters that organize fundraisers, hackathons, and mentorship drives.</p>
                                    </div>
                                </div>
                                <Button to="/contact" variant="secondary" className="w-full justify-center">
                                    Start an Alliance
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Strategic Roadmap */}
                <section className="py-32 bg-primary-dark text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    {/* Decorative gradients */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block py-1 px-3 rounded-full bg-white/10 text-secondary text-sm font-medium mb-6 backdrop-blur-sm border border-white/10"
                            >
                                Future Roadmap
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white drop-shadow-lg"
                            >
                                Our Vision for <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">2026</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md"
                            >
                                We have ambitious plans to scale our impact. Partner with us to bring these transformative initiatives to life.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "MINNT Labs in 50+ Schools",
                                    desc: "Physical innovation centers bringing hands-on technology education directly to students nationwide.",
                                    icon: <Brain className="text-secondary" size={32} />,
                                    color: "from-secondary/20 to-secondary/5"
                                },
                                {
                                    title: "National MINNT Olympiad",
                                    desc: "Competitive platform showcasing student innovation and technical excellence across the country.",
                                    icon: <Trophy className="text-yellow-400" size={32} />,
                                    color: "from-yellow-400/20 to-yellow-400/5"
                                },
                                {
                                    title: "AI & Cybersecurity Bootcamps",
                                    desc: "Intensive training programs in the most in-demand technology skills of the future.",
                                    icon: <ShieldCheck className="text-blue-400" size={32} />,
                                    color: "from-blue-400/20 to-blue-400/5"
                                },
                                {
                                    title: "Student Innovation Summit",
                                    desc: "Annual gathering connecting young innovators with industry leaders, investors, and researchers.",
                                    icon: <Users className="text-purple-400" size={32} />,
                                    color: "from-purple-400/20 to-purple-400/5"
                                },
                                {
                                    title: "Teen Startup Incubation",
                                    desc: "Supporting high school entrepreneurs with mentorship, resources, and funding pathways.",
                                    icon: <Rocket className="text-red-400" size={32} />,
                                    color: "from-red-400/20 to-red-400/5"
                                },
                                {
                                    title: "National Digital Platform",
                                    desc: "Comprehensive online learning ecosystem making MINNT education accessible everywhere.",
                                    icon: <Globe className="text-green-400" size={32} />,
                                    color: "from-green-400/20 to-green-400/5"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 font-heading">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-24 bg-secondary/10 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <Handshake size={64} className="mx-auto text-secondary mb-6" />
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">Let's Build Something Together</h2>
                        <p className="text-xl text-gray-600 mb-10">
                            Whether you are a startup, a multinational corporation, or an educational institution, there is a place for you in our mission.
                        </p>
                        <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                            Contact Our Partnerships Team
                        </Button>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Partners;
