
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <Helmet>
                <title>Privacy Policy | ThinkMint Foundation</title>
                <meta name="description" content="Privacy Policy for ThinkMint Foundation. Learn how we collect, use, and protect your personal information." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Privacy Policy</h1>
                        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                                <Eye className="text-secondary" size={24} />
                                1. Information We Collect
                            </h2>
                            <p>
                                We collect information that you provide directly to us, such as when you make a donation, sign up for our newsletter, apply for a job, or contact us. This may include your name, email address, phone number, and payment information.
                            </p>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                                <FileText className="text-secondary" size={24} />
                                2. How We Use Your Information
                            </h2>
                            <p>
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process your donations and provide tax receipts.</li>
                                <li>Send you newsletters and updates about our programs (if you opted in).</li>
                                <li>Respond to your comments, questions, and requests.</li>
                                <li>Process job applications.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                                <Lock className="text-secondary" size={24} />
                                3. Data Security
                            </h2>
                            <p>
                                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Sharing of Information</h2>
                            <p>
                                We do not share your personal information with third parties except as described in this policy or as required by law. We do not sell your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:tejaschaudhari131@gmail.com" className="text-primary hover:underline">tejaschaudhari131@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
