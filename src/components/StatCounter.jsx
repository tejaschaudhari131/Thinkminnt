import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

const StatCounter = ({ number, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Extract numeric part and suffix (e.g., "500+" -> 500, "+")
    const numericValue = parseInt(number.replace(/[^0-9]/g, '')) || 0;
    const suffix = number.replace(/[0-9]/g, '');

    const count = useSpring(0, {
        duration: 2000,
        bounce: 0
    });

    const rounded = useTransform(count, latest => Math.floor(latest));

    useEffect(() => {
        if (isInView) {
            count.set(numericValue);
        }
    }, [isInView, numericValue, count]);

    return (
        <div ref={ref} className="text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold font-heading mb-2 flex justify-center items-baseline text-white">
                <motion.span>{rounded}</motion.span>
                <span>{suffix}</span>
            </div>
            <div className="text-sm md:text-base text-blue-200 font-medium uppercase tracking-wider group-hover:text-white transition-colors">{label}</div>
        </div>
    );
};

export default StatCounter;
