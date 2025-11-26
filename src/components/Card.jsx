import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({
    image,
    title,
    subtitle,
    description,
    children,
    className = '',
    hoverEffect = true
}) => {
    return (
        <div
            className={twMerge(
                "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 dark:border-gray-700 shadow-soft transition-all duration-300 flex flex-col h-full",
                hoverEffect && "hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20 hover:bg-white/90",
                className
            )}
        >
            {image && (
                <div className="relative h-56 overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
            )}
            <div className="p-8 flex flex-col flex-grow">
                {subtitle && (
                    <div className="text-accent font-semibold text-sm mb-2 uppercase tracking-wider">
                        {subtitle}
                    </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-heading leading-tight">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
};

export default Card;
