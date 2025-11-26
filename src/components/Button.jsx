import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    to,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 focus:ring-primary",
        secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary",
        accent: "bg-accent text-primary-dark hover:bg-accent-light hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 focus:ring-accent",
        outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary focus:ring-white",
        ghost: "bg-transparent text-primary hover:bg-primary/5 focus:ring-primary",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const classes = twMerge(baseStyles, variants[variant], sizes[size], className);

    const content = (
        <>
            {children}
            {Icon && <Icon size={size === 'lg' ? 24 : 20} className="ml-2" />}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={classes}
            {...props}
        >
            {content}
        </motion.button>
    );
};

export default Button;
