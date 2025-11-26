import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, TreePine, Heart, Globe, BookOpen, Smile } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Counter = ({ value, label, icon: Icon, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <div ref={ref} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Icon size={32} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2 font-heading">
                {displayValue.toLocaleString()}{suffix}
            </h3>
            <p className="text-gray-600 font-medium uppercase tracking-wide text-sm">{label}</p>
        </div>
    );
};

const Impact = () => {
    const stats = [
        { id: 1, value: 50000, label: "Lives Touched", icon: Users, suffix: "+" },
        { id: 2, value: 12000, label: "Trees Planted", icon: TreePine, suffix: "" },
        { id: 3, value: 25, label: "Communities Served", icon: Globe, suffix: "" },
        { id: 4, value: 1500, label: "Volunteers Engaged", icon: Heart, suffix: "+" },
        { id: 5, value: 8500, label: "Students Educated", icon: BookOpen, suffix: "" },
        { id: 6, value: 100, label: "Projects Completed", icon: Smile, suffix: "%" },
    ];

    return (
        <PageTransition>
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
                                Our <span className="text-secondary">Impact</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                Measuring the change we create together. Every number represents a story of hope, growth, and transformation.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stats.map((stat) => (
                                <Counter key={stat.id} {...stat} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <span className="text-9xl text-primary/5 absolute -top-12 -left-12 font-serif">"</span>
                            <blockquote className="text-3xl md:text-4xl font-serif text-gray-800 italic leading-relaxed mb-8">
                                We don't just count the numbers; we make the numbers count. Every statistic here is a testament to the power of collective action.
                            </blockquote>
                            <cite className="text-lg font-bold text-primary not-italic">- Sarah Jenkins, Founder</cite>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Impact;
