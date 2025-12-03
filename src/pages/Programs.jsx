import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sprout, HeartHandshake, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
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
            staggerChildren: 0.15
        }
    }
};

import API_URL from '../config/api';

const Programs = () => {
    const [programs, setPrograms] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        console.log('Fetching programs...');
        fetch(`${API_URL}/api/programs`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                console.log('Programs data:', data);
                if (!Array.isArray(data)) throw new Error('Data is not an array');

                const iconMap = {
                    'Code': <Code size={24} />,
                    'Sprout': <Sprout size={24} />,
                    'HeartHandshake': <HeartHandshake size={24} />,
                    'BookOpen': <BookOpen size={24} />
                };

                const mappedPrograms = data.map(p => ({
                    ...p,
                    icon: iconMap[p.icon] || <Code size={24} />
                }));
                setPrograms(mappedPrograms);
            })
            .catch(err => {
                console.error('Failed to fetch programs:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);



    const programSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": programs.map((program, index) => ({
            "@type": "Service",
            "position": index + 1,
            "name": program.title,
            "description": program.description,
            "provider": {
                "@type": "Organization",
                "name": "ThinkMinnt Foundation",
                "url": "https://thinkminnt.com"
            },
            "areaServed": {
                "@type": "Place",
                "name": "Pune, Maharashtra, India"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": program.category
            }
        }))
    };

    return (
        <PageTransition>
            <SEO
                title="Our Programs"
                description="Discover our initiatives in Digital Literacy, Rural Education, and Skill Development designed to empower communities."
                keywords="Programs, Education, Digital Literacy, Skill Development, Rural India"
                schema={programSchema}
            />
            <div className="flex flex-col">
                {/* Header */}
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
                                    Our Programs
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                Targeted initiatives designed to create sustainable, long-term impact in the communities we serve.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Programs Grid */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}
                        {error && <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl border border-red-100">Error loading programs: {error}</div>}

                        {!loading && !error && (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12"
                            >
                                {programs.map((program, index) => (
                                    <motion.div variants={fadeInUp} key={index} className="h-full">
                                        <Card
                                            image={program.image}
                                            title={program.title}
                                            subtitle={program.category}
                                            description={program.description}
                                            className="h-full border-none shadow-lg hover:shadow-2xl"
                                        >
                                            <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-sm text-gray-600 flex items-center gap-2 font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                                                    <span className="text-primary">{program.icon}</span> {program.category}
                                                </span>
                                                <Button to={`/programs/${index}`} variant="ghost" size="sm" className="text-primary hover:bg-primary/5 font-semibold group">
                                                    Learn More <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Impact Highlight */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-r from-secondary-dark to-secondary rounded-[2.5rem] p-10 md:p-20 text-white flex flex-col md:flex-row items-center gap-16 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                            <div className="flex-1 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-semibold text-sm mb-6 border border-white/20">
                                    <Sparkles size={16} />
                                    Innovate with Us
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">Have an idea for a program?</h2>
                                <p className="text-blue-50 mb-10 text-lg leading-relaxed font-light">
                                    We are always looking for new ways to serve our community. If you have a project proposal or partnership idea, we'd love to hear from you.
                                </p>
                                <Button to="/contact" variant="accent" size="lg" className="text-primary-dark font-bold shadow-lg shadow-accent/20">
                                    Get in Touch
                                </Button>
                            </div>
                            <div className="flex-1 w-full relative z-10">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Brainstorming"
                                        className="w-full h-80 object-cover"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Programs;
