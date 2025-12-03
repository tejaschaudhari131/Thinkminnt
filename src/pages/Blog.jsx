import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

import API_URL from '../config/api';

const categories = ['All', 'Education', 'Environment', 'Mentorship', 'Community'];

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <PageTransition>
            <SEO
                title="News & Insights | ThinkMinnt Foundation"
                description="Read the latest stories, updates, and insights from ThinkMinnt Foundation. Explore our impact on education, environment, and community."
                keywords="Blog, News, Stories, Impact, Education, Environment, ThinkMinnt, Think Mint, Think Minnd, Social Work, NGO Updates"
            />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
                                <span className="bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent">
                                    News & Insights
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                Stories of change, updates from the field, and thoughts on the future of social impact.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Blog Feed */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-white text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Posts Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
                                            <Tag size={12} /> {post.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-xs text-gray-400 font-medium">{post.readTime}</span>
                                            <Link
                                                to={`/blog/${post.id}`}
                                                className="text-secondary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                            >
                                                Read More <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Blog;
