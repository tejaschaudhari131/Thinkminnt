import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <PageTransition>
            <SEO
                title="Page Not Found - ThinkMinnt Foundation"
                description="The page you are looking for does not exist."
                keywords="404, Not Found, Error"
            />
            <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-center px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <h1 className="text-9xl font-bold text-primary-dark font-heading mb-4">404</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Oops! Page Not Found</h2>
                    <p className="text-xl text-gray-600 max-w-lg mx-auto mb-10 leading-relaxed">
                        It seems you've wandered off the path. The page you are looking for might have been removed or is temporarily unavailable.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button to="/" variant="primary" size="lg" icon={Home} className="shadow-lg shadow-primary/20">
                            Back to Home
                        </Button>
                        <Button onClick={() => window.history.back()} variant="secondary" size="lg" icon={ArrowLeft} className="text-primary-dark">
                            Go Back
                        </Button>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default NotFound;
