
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <Helmet>
                <title>Terms & Conditions | ThinkMint Foundation</title>
                <meta name="description" content="Terms and Conditions for using the ThinkMint Foundation website and services." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                            <FileText size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Terms & Conditions</h1>
                        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the ThinkMint Foundation website, you accept and agree to be bound by the terms and provision of this agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Use License</h2>
                            <p>
                                Permission is granted to temporarily download one copy of the materials (information or software) on ThinkMint Foundation's website for personal, non-commercial transitory viewing only.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
                            <p>
                                The materials on ThinkMint Foundation's website are provided "as is". ThinkMint Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Limitations</h2>
                            <p>
                                In no event shall ThinkMint Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ThinkMint Foundation's website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Governing Law</h2>
                            <p>
                                Any claim relating to ThinkMint Foundation's website shall be governed by the laws of India without regard to its conflict of law provisions.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
