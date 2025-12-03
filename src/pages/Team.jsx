import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const boardMembers = [
    {
        id: 1,
        name: "Tejaram Chaudhari",
        role: "Director",
        bio: "Dedicated to steering the foundation towards its mission of sustainable development and social equity.",
        image: "/assets/tejaram_chaudhari.jpg",
        social: { linkedin: "https://www.linkedin.com/in/tejaramchaudhari/", twitter: "#" }
    },
    {
        id: 2,
        name: "Aditya Joshi",
        role: "Director",
        bio: "Passionate about leveraging community engagement to drive impactful change.",
        image: "/assets/aditya_joshi.jpg",
        social: { linkedin: "https://www.linkedin.com/in/adityajoshi8/", twitter: "#" }
    }
];

const coreTeam = [
    {
        id: 4,
        name: "Tejas S.",
        role: "Founder & Executive Director",
        bio: "Passionate about leveraging technology for social good. Leads the overall strategy and operations.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { linkedin: "#", twitter: "#", email: "tejas@thinkminnt.org" }
    },
    {
        id: 5,
        name: "Priya Sharma",
        role: "Program Director",
        bio: "Oversees the implementation of all our on-ground initiatives, ensuring they reach the intended beneficiaries.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { linkedin: "#", twitter: "#" }
    },
    {
        id: 6,
        name: "Rahul Verma",
        role: "Head of Partnerships",
        bio: "Builds strategic alliances with corporates and other NGOs to amplify our impact.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { linkedin: "#", twitter: "#" }
    },
    {
        id: 7,
        name: "Neha Gupta",
        role: "Volunteer Coordinator",
        bio: "Manages our growing community of volunteers, matching their skills with our needs.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { linkedin: "#", twitter: "#" }
    }
];

const TeamCard = ({ member }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
    >
        <div className="relative h-64 overflow-hidden">
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {member.social.linkedin && (
                    <a href={member.social.linkedin} className="p-2 bg-white rounded-full text-secondary hover:text-primary transition-colors">
                        <Linkedin size={20} />
                    </a>
                )}
                {member.social.twitter && (
                    <a href={member.social.twitter} className="p-2 bg-white rounded-full text-secondary hover:text-primary transition-colors">
                        <Twitter size={20} />
                    </a>
                )}
                {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="p-2 bg-white rounded-full text-secondary hover:text-primary transition-colors">
                        <Mail size={20} />
                    </a>
                )}
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-primary font-medium mb-3">{member.role}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
        </div>
    </motion.div>
);

const Team = () => {
    return (
        <PageTransition>
            <SEO
                title="Our Team"
                description="Meet the dedicated individuals and Board of Directors driving ThinkMinnt Foundation's mission forward."
                keywords="Team, Board of Directors, Leadership, Volunteers, Staff"
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
                                <span className="bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent">
                                    Meet Our Team
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                The passionate individuals driving our mission forward.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Board Members */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Board of Directors</h2>
                            <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            {boardMembers.map(member => (
                                <div key={member.id} className="w-full md:w-1/3 max-w-sm">
                                    <TeamCard member={member} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Team */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Team</h2>
                            <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coreTeam.map(member => <TeamCard key={member.id} member={member} />)}
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Team;
