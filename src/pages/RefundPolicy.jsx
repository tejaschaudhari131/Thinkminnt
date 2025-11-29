
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RefreshCw, Heart, Mail } from 'lucide-react';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <Helmet>
                <title>Refund Policy | ThinkMint Foundation</title>
                <meta name="description" content="Refund Policy for donations made to ThinkMint Foundation." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                            <RefreshCw size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Refund Policy</h1>
                        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                                <Heart className="text-secondary" size={24} />
                                Donation Refunds
                            </h2>
                            <p>
                                ThinkMint Foundation is grateful for your support. We work hard to ensure that every donation is used effectively to support our mission.
                            </p>
                            <p>
                                As a general rule, donations to charitable organizations are non-refundable. However, we recognize that errors can happen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Refund Eligibility</h2>
                            <p>
                                We will consider refund requests in the following situations:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>If a donation was made in error (e.g., duplicate transaction).</li>
                                <li>If an unauthorized donation was made using your payment information.</li>
                                <li>If you entered the wrong amount (e.g., $100 instead of $10).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Requesting a Refund</h2>
                            <p>
                                To request a refund, please contact us within 15 days of the donation date. Please include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Your full name</li>
                                <li>Date of donation</li>
                                <li>Amount donated</li>
                                <li>Reason for the refund request</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                                <Mail className="text-secondary" size={24} />
                                Contact Us
                            </h2>
                            <p>
                                Please email your refund request to: <a href="mailto:contact-us@thinkminnt.com" className="text-primary hover:underline">contact-us@thinkminnt.com</a>
                            </p>
                            <p>
                                We will review your request and process approved refunds within 7-10 business days.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
