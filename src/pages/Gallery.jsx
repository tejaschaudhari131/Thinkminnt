import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const photos = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Tech for All Workshop",
            category: "Education"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Community Clean-up Drive",
            category: "Environment"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Student Mentorship Session",
            category: "Mentorship"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Women Empowerment Seminar",
            category: "Community"
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Tree Plantation Day",
            category: "Environment"
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            caption: "Digital Literacy Class",
            category: "Education"
        }
    ];

    const stories = [
        {
            id: 1,
            name: "Riya Sharma",
            role: "Student, Tech for All",
            quote: "I just started the computer course last week, and I'm already learning so much! I'm excited to see what I can build by the end of the program.",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 2,
            name: "Arjun Patel",
            role: "Founding Volunteer",
            quote: "Being part of ThinkMinnt from day one has been incredible. The energy in our first few drives shows just how much potential we have to make a real difference.",
            image: "https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];

    return (
        <PageTransition>
            <SEO
                title="Our Impact Gallery"
                description="A visual journey of our work, the people we serve, and the change we are creating together."
                keywords="Gallery, Photos, Impact, Community, Education, Environment, Success Stories"
            />
            <div className="flex flex-col">
                {/* Hero Section */}
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
                                    Our Impact Gallery
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                A visual journey of our work, the people we serve, and the change we are creating together.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Photo Grid */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {photos.map((photo) => (
                                <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
                                    onClick={() => setSelectedImage(photo)}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.caption}
                                        className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <span className="text-secondary text-sm font-semibold mb-1">{photo.category}</span>
                                        <h3 className="text-white text-xl font-bold">{photo.caption}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Hear directly from the lives we've touched and the community that makes it possible.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {stories.map((story) => (
                                <motion.div
                                    key={story.id}
                                    initial={{ opacity: 0, x: story.id % 2 === 0 ? 20 : -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-50 p-8 rounded-3xl relative"
                                >
                                    <Quote size={48} className="text-primary/10 absolute top-8 right-8" />
                                    <p className="text-gray-700 text-lg italic mb-8 relative z-10">"{story.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{story.name}</h4>
                                            <p className="text-secondary font-medium text-sm">{story.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-5xl w-full max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
                                >
                                    <X size={32} />
                                </button>
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.caption}
                                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white rounded-b-lg">
                                    <h3 className="text-xl font-bold">{selectedImage.caption}</h3>
                                    <p className="text-gray-300 text-sm">{selectedImage.category}</p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default Gallery;
