import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { id } = useParams();

    // Mock data - in a real app, fetch based on ID
    const post = {
        id: 1,
        title: "Empowering Rural India Through Digital Literacy",
        excerpt: "How our 'Tech for All' initiative is bridging the digital divide in Maharashtra's remote villages.",
        content: `
            <p class="mb-4">In the heart of Maharashtra's rural landscape, a quiet revolution is taking place. It's not led by politicians or large corporations, but by eager students and dedicated volunteers armed with laptops and a thirst for knowledge.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Digital Divide</h3>
            <p class="mb-4">For decades, the gap between urban and rural education in India has been widened by a lack of access to technology. While city kids grow up with smartphones and tablets, many rural children see a computer for the first time in their late teens. This 'digital divide' severely limits their future career prospects and ability to participate in the modern economy.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Approach</h3>
            <p class="mb-4">ThinkMinnt's 'Tech for All' initiative aims to bridge this gap. We don't just donate hardware; we provide a comprehensive ecosystem for digital learning. This includes:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Infrastructure:</strong> Setting up solar-powered computer labs in village schools.</li>
                <li><strong>Curriculum:</strong> A tailored coding and digital literacy curriculum in local languages (Marathi and Hindi).</li>
                <li><strong>Training:</strong> rigorous training for local teachers to ensure sustainability.</li>
            </ul>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Impact Stories</h3>
            <p class="mb-4">Take the case of 14-year-old Anjali from a small village near Pune. Before our program, she had never used the internet. Today, she can code basic websites and uses online resources to help her father with modern farming techniques. "I want to be a software engineer," she says with a beaming smile. And for the first time, that dream feels within reach.</p>

            <p class="mt-8">Join us in this mission. Your support can help us reach 50 more villages by 2025.</p>
        `,
        author: "Tejas S.",
        role: "Founder",
        date: "Nov 20, 2024",
        category: "Education",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        readTime: "5 min read"
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "ThinkMinnt Foundation",
            "logo": {
                "@type": "ImageObject",
                "url": "https://thinkminnt.com/logo.jpg"
            }
        },
        "datePublished": "2024-11-20", // Ideally parse post.date
        "description": post.excerpt
    };

    return (
        <PageTransition>
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={`${post.category}, Blog, ThinkMinnt, Social Impact`}
                image={post.image}
                type="article"
                author={post.author}
                publishedTime={post.date}
                schema={articleSchema}
            />
            <article className="bg-white min-h-screen pb-24">
                {/* Header Image */}
                <div className="h-[50vh] relative overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="bg-secondary px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">{post.category}</span>
                            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">{post.title}</h1>
                            <div className="flex items-center gap-6 text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <User size={18} />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{post.date}</span>
                                </div>
                                <span>{post.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                        <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Blog
                        </Link>

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>

                        {/* Share & Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900">Share this article:</span>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors"><Facebook size={20} /></button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-400 transition-colors"><Twitter size={20} /></button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-700 transition-colors"><Linkedin size={20} /></button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Share2 size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default BlogPost;
