import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/90 backdrop-blur-md">
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Ring */}
                <motion.div
                    className="absolute inset-0 w-16 h-16 border-4 border-secondary/20 border-b-secondary rounded-full m-auto"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(250,204,21,0.6)]"></div>
                </motion.div>
            </div>

            <motion.p
                className="mt-6 text-primary font-bold tracking-widest text-sm uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                Loading
            </motion.p>
        </div>
    );
};

export default Loader;
