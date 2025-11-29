import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, X, Upload, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_URL from '../config/api';
import emailjs from '@emailjs/browser';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState('idle'); // idle, submitting, success, error

    useEffect(() => {
        fetch(`${API_URL}/api/careers`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch careers');
                return res.json();
            })
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleApply = async (e) => {
        e.preventDefault();
        setApplicationStatus('submitting');

        const formData = new FormData(e.target);
        formData.append('jobId', selectedJob.id);

        const applicantName = e.target.firstName.value;
        const applicantEmail = e.target.email.value;

        try {
            const response = await fetch(`${API_URL}/api/apply`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                // Send Email via EmailJS
                try {
                    await emailjs.send(
                        'service_mao2bzd',      // Service ID
                        'template_bcwrx2r',     // Template ID
                        {
                            to_name: applicantName,
                            to_email: applicantEmail,
                            reply_to: 'careers@thinkminnt.com'
                        },
                        'Q50KacLeY8z0yfCN4'      // Public Key
                    );
                    console.log('Email sent successfully via EmailJS');
                } catch (emailError) {
                    console.error('EmailJS Error:', emailError);
                }

                setApplicationStatus('success');
                e.target.reset();
                setTimeout(() => {
                    setApplicationStatus('idle');
                    setSelectedJob(null);
                }, 3000);
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (error) {
            console.error(error);
            setApplicationStatus('error');
        }
    };

    const jobSchema = jobs.map(job => ({
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "identifier": {
            "@type": "PropertyValue",
            "name": "ThinkMinnt Foundation",
            "value": job.id
        },
        "datePosted": new Date().toISOString().split('T')[0],
        "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        "employmentType": job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "ThinkMinnt Foundation",
            "sameAs": "https://thinkminnt.com",
            "logo": "https://thinkminnt.com/logo.jpg"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "S No. 89/1, 89/2, Shop No. Namo Developers, Mohamadwadi",
                "addressLocality": "Pune",
                "addressRegion": "MH",
                "postalCode": "411060",
                "addressCountry": "IN"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "INR",
            "value": {
                "@type": "QuantitativeValue",
                "value": 0,
                "unitText": "MONTH"
            }
        }
    }));

    return (
        <PageTransition>
            <SEO
                title="Join Our Team - Careers"
                description="Be a part of the change. Explore career opportunities at ThinkMinnt Foundation and help us build a better future."
                keywords="Careers, Jobs, NGO Jobs, Social Impact Careers, Volunteer, Pune"
                schema={jobSchema}
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
                                    Join Our Team
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                Be a part of the change. We are looking for passionate individuals to help us build a better future.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Job Listings */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl border border-red-100">
                                Error loading jobs: {error}
                            </div>
                        )}

                        {!loading && !error && jobs.length === 0 && (
                            <div className="text-center py-20">
                                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-600">No open positions at the moment.</h3>
                                <p className="text-gray-500 mt-2">Please check back later or send us your resume for future consideration.</p>
                            </div>
                        )}

                        {!loading && !error && jobs.length > 0 && (
                            <div className="grid gap-8">
                                {jobs.map((job) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                                    {job.department}
                                                </span>
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                                    <Clock size={14} /> {job.type}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                            <div className="flex items-center gap-2 text-gray-500 mb-4">
                                                <MapPin size={18} />
                                                <span>{job.location}</span>
                                            </div>
                                            <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Requirements:</h4>
                                                <p className="text-gray-600 text-sm">{job.requirements}</p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 w-full md:w-auto">
                                            <Button
                                                onClick={() => setSelectedJob(job)}
                                                variant="outline"
                                                className="w-full md:w-auto border-primary text-primary hover:bg-primary hover:text-white"
                                            >
                                                Apply Now <ArrowRight size={18} className="ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Application Modal */}
                <AnimatePresence>
                    {selectedJob && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedJob.title}</h2>
                                        <p className="text-gray-500 text-sm">{selectedJob.location} • {selectedJob.type}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedJob(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X size={24} className="text-gray-500" />
                                    </button>
                                </div>

                                <div className="p-6 md:p-8">
                                    {applicationStatus === 'success' ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                                            <p className="text-gray-600">Thank you for applying. We will review your application and get back to you soon.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleApply} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                                    <input name="firstName" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                                    <input name="lastName" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                                    <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                                    <input type="tel" name="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Resume / CV</label>
                                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer relative">
                                                    <input
                                                        type="file"
                                                        name="resume"
                                                        accept=".pdf,.doc,.docx"
                                                        required
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                const fileName = e.target.files[0].name;
                                                                e.target.nextElementSibling.nextElementSibling.textContent = fileName;
                                                                e.target.nextElementSibling.classList.add('text-primary');
                                                            }
                                                        }}
                                                    />
                                                    <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                                                    <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter / Why do you want to join us?</label>
                                                <textarea name="coverLetter" rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"></textarea>
                                            </div>

                                            {applicationStatus === 'error' && (
                                                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                                    Something went wrong. Please try again or contact us directly.
                                                </div>
                                            )}
                                            <Button type="submit" disabled={applicationStatus === 'submitting'} className="w-full">
                                                {applicationStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default Careers;
