import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';

const ProgramDetails = () => {
    const { id } = useParams();
    // In a real app, you would fetch the specific program data based on the ID.
    // For now, we'll use static data or mock data.

    // Mock Data (Replace with API fetch if needed)
    const programData = {
        title: "Digital Literacy Drive",
        category: "Education",
        description: "Empowering rural communities with essential computer skills and internet access to bridge the digital divide.",
        longDescription: `
            <p class="mb-4">Our Digital Literacy Drive is more than just teaching people how to use computers; it's about opening doors to a world of opportunities. In today's digital age, access to technology is a fundamental right, yet many rural communities remain disconnected.</p>
            <p class="mb-4">This program focuses on setting up community computer centers, providing hands-on training in basic computer operations, internet usage, and digital safety. We target students, women, and small business owners to ensure inclusive growth.</p>
            <p>By the end of the program, participants are equipped to access online education, government services, and market opportunities, effectively transforming their livelihoods.</p>
        `,
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        stats: [
            { label: "Duration", value: "6 Months", icon: Calendar },
            { label: "Location", value: "Pune District", icon: MapPin },
            { label: "Beneficiaries", value: "500+ Students", icon: Users },
        ],
        highlights: [
            "Basic Computer Operations",
            "Internet & Email Usage",
            "Digital Financial Literacy",
            "Online Safety & Security",
            "Access to Government Portals"
        ]
    };

    return (
        <PageTransition>
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-end pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={programData.image} alt={programData.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <Link to="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group">
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Programs
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-white text-sm font-bold mb-4">
                                {programData.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                                {programData.title}
                            </h1>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold font-heading mb-6 text-gray-900">About the Program</h2>
                                <div
                                    className="prose prose-lg text-gray-600 leading-relaxed mb-12"
                                    dangerouslySetInnerHTML={{ __html: programData.longDescription }}
                                ></div>

                                <h3 className="text-2xl font-bold font-heading mb-6 text-gray-900">Program Highlights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {programData.highlights.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                            <CheckCircle size={20} className="text-secondary mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-3xl p-8 sticky top-32 border border-gray-100">
                                    <h3 className="text-xl font-bold font-heading mb-6 text-gray-900">Key Details</h3>
                                    <div className="space-y-6 mb-8">
                                        {programData.stats.map((stat, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                                    <stat.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <Button to="/contact" variant="primary" className="w-full justify-center py-4">
                                            Partner with Us
                                        </Button>
                                        <Button to="/donate" variant="outline" className="w-full justify-center py-4 bg-white">
                                            Support this Cause
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default ProgramDetails;
