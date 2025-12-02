import React, { useState, useEffect } from 'react';
import { Heart, Check, CreditCard, Gift, Sparkles, ArrowRight, ShieldCheck, Quote, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_URL from '../config/api';
import { useLocation } from 'react-router-dom';

const Donate = () => {
    const [amount, setAmount] = useState(500);
    const [frequency, setFrequency] = useState('monthly');
    const [impactStory, setImpactStory] = useState('');
    const [loadingStory, setLoadingStory] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    // User Details State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentStatus = searchParams.get('status');
    const txnid = searchParams.get('txnid');

    useEffect(() => {
        if (paymentStatus === 'success' || paymentStatus === 'failure') {
            window.scrollTo(0, 0);
        }
    }, [paymentStatus]);

    useEffect(() => {
        const fetchImpact = async () => {
            if (!amount || amount < 10) return;
            setLoadingStory(true);
            try {
                const response = await fetch(`${API_URL}/api/ai/impact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount })
                });
                const data = await response.json();
                if (data.success && data.story) {
                    setImpactStory(data.story);
                }
            } catch (error) {
                console.error('Error fetching impact story:', error);
            } finally {
                setLoadingStory(false);
            }
        };

        const timeoutId = setTimeout(fetchImpact, 800); // Debounce
        return () => clearTimeout(timeoutId);
    }, [amount]);

    const amounts = [100, 500, 1000, 2500, 5000];

    const handleDonate = async () => {
        try {
            if (!amount) {
                alert('Please select an amount');
                return;
            }

            if (!name || !email || !phone) {
                alert('Please fill in your details');
                return;
            }

            // 1. Prepare Transaction Data
            const txnid = 'TXN' + Date.now();
            const productinfo = 'Donation';
            const firstname = name;
            const surl = `${API_URL}/api/payment/response`;
            const furl = `${API_URL}/api/payment/response`;

            // 2. Get Hash from Backend
            const response = await fetch(`${API_URL}/api/payment/hash`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    txnid,
                    amount,
                    productinfo,
                    firstname,
                    email
                })
            });

            const data = await response.json();

            if (!data.hash) {
                throw new Error('Failed to generate hash');
            }

            // 3. Create Hidden Form and Submit to PayU
            const form = document.createElement('form');
            form.method = 'POST';
            const isProduction = import.meta.env.VITE_PAYU_MODE === 'production';
            form.action = isProduction ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment';

            const fields = {
                key: data.key,
                txnid: txnid,
                amount: amount,
                productinfo: productinfo,
                firstname: firstname,
                email: email,
                phone: phone,
                surl: surl,
                furl: furl,
                hash: data.hash
            };

            for (const key in fields) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        } catch (error) {
            console.error('Error:', error);
            alert(`An error occurred initializing payment: ${error.message}`);
        }
    };

    // Mock Data for Human Touch Elements
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Monthly Donor",
            quote: "Seeing the updates on how my small monthly contribution helps real families is incredibly rewarding. ThinkMint makes me feel part of the change.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            name: "Rahul Sharma",
            role: "Volunteer & Donor",
            quote: "I've visited the schools they support. The joy on the children's faces is genuine. This organization truly cares.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    ];

    const stories = [
        {
            title: "A New Beginning for Priya",
            image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            desc: "With the scholarship provided by donors like you, Priya was able to attend coding camp and is now building her own apps."
        },
        {
            title: "Clean Water for Rampur",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            desc: "The new filtration system installed last month has reduced waterborne illnesses by 80% in the village of Rampur."
        }
    ];

    const faqs = [
        { q: "Is my donation tax-deductible?", a: "Yes, all donations to ThinkMint Foundation are 100% tax-deductible under Section 80G." },
        { q: "Can I cancel my monthly donation?", a: "Absolutely. You can pause, change, or cancel your monthly support at any time with one click." },
        { q: "How much of my donation goes to the cause?", a: "We pride ourselves on efficiency. 92% of every rupee goes directly to our programs." }
    ];

    if (paymentStatus === 'success') {
        return (
            <PageTransition>
                <SEO title="Donation Successful" />
                <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-20 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-green-100 relative z-10"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
                        >
                            <Check size={48} className="text-green-600" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Welcome to the Family!</h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Your generosity has just sparked a change. Thank you for standing with us. <br />
                            <span className="text-sm text-gray-500 mt-2 block">Transaction ID: <span className="font-mono font-bold text-gray-800">{txnid}</span></span>
                        </p>
                        <p className="text-gray-600 mb-8">
                            A receipt has been sent to your email. We'll keep you updated on the impact you're making.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Return Home
                        </button>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    if (paymentStatus === 'failure') {
        return (
            <PageTransition>
                <SEO title="Donation Failed" />
                <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-20 px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100"
                    >
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="text-4xl">⚠️</div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Something Went Wrong</h2>
                        <p className="text-gray-600 mb-6">
                            We couldn't process your donation this time. Please try again or contact us if the issue persists. <br />
                            <span className="text-sm text-gray-500 mt-2 block">Transaction ID: <span className="font-mono font-bold text-gray-800">{txnid}</span></span>
                        </p>
                        <button
                            onClick={() => window.location.href = '/#/donate'}
                            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg"
                        >
                            Try Again
                        </button>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <SEO
                title="Donate - Join Our Family"
                description="Your contribution directly impacts lives. Join us in creating a sustainable future for communities in need."
                keywords="Donate, Charity, NGO, Support, Give Back, Philanthropy"
            />
            <div className="flex flex-col min-h-screen bg-neutral-50 font-sans">
                {/* Hero Section */}
                <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                            alt="Children learning"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-neutral-50/90"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-20">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20 shadow-lg">
                                <Heart size={16} className="text-accent fill-accent" />
                                <span className="text-sm font-medium tracking-wide text-white">Join 5,000+ Changemakers</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight tracking-tight drop-shadow-lg">
                                Be the Reason <br /> Someone <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Smiles Today</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-md">
                                Every contribution, big or small, writes a new chapter in a child's life. Join our family and build a future filled with hope.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20 -mt-32 relative z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                            {/* Donation Form (Left - Wider) */}
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="lg:col-span-7"
                            >
                                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 relative">
                                    {/* Decorative background blob */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                                    <div className="p-8 md:p-10 relative z-10">
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="text-3xl font-bold text-gray-900 font-heading">Make a Difference</h2>
                                            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-sm font-bold border border-green-100">
                                                <ShieldCheck size={16} />
                                                100% Secure
                                            </div>
                                        </div>

                                        {/* Frequency Toggle */}
                                        {/* Frequency Toggle */}
                                        <div className="grid grid-cols-2 bg-neutral-100 p-1.5 rounded-xl mb-10 w-full max-w-md relative">
                                            <motion.div
                                                className="absolute top-1.5 bottom-1.5 left-1.5 bg-white rounded-lg shadow-sm"
                                                initial={false}
                                                animate={{
                                                    x: frequency === 'one-time' ? 0 : '100%',
                                                    width: 'calc(50% - 0.375rem)'
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                            <button
                                                onClick={() => setFrequency('one-time')}
                                                className={`relative z-10 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${frequency === 'one-time' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                Give Once
                                            </button>
                                            <button
                                                onClick={() => setFrequency('monthly')}
                                                className={`relative z-10 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${frequency === 'monthly' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                Monthly <span className="text-xs font-normal bg-accent/20 text-accent-dark px-1.5 py-0.5 rounded-full">Impact x12</span>
                                            </button>
                                        </div>

                                        {/* Amount Selection */}
                                        <div className="mb-10">
                                            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Choose your contribution</label>
                                            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                                                {amounts.map((amt) => (
                                                    <button
                                                        key={amt}
                                                        onClick={() => setAmount(amt)}
                                                        className={`py-4 rounded-xl border-2 font-bold text-lg transition-all transform hover:-translate-y-1 ${amount === amt ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-gray-100 bg-white text-gray-600 hover:border-primary/30 hover:shadow-md'}`}
                                                    >
                                                        ₹{amt}
                                                    </button>
                                                ))}
                                                <div className="relative col-span-3 sm:col-span-1 group">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-primary transition-colors">₹</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Custom"
                                                        className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white focus:border-primary outline-none font-bold text-gray-700 transition-all hover:border-gray-200 focus:shadow-lg focus:shadow-primary/10"
                                                        onChange={(e) => setAmount(Number(e.target.value))}
                                                        value={amount || ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Impact Storyteller */}
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={amount}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mb-10 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden group"
                                            >
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                                    <Sparkles size={80} className="text-indigo-600" />
                                                </div>
                                                <div className="relative z-10">
                                                    <h3 className="text-indigo-900 font-bold text-sm mb-3 flex items-center gap-2 uppercase tracking-wider">
                                                        <Sparkles size={16} className="text-indigo-600 animate-pulse" />
                                                        The Magic You Create
                                                    </h3>
                                                    {loadingStory ? (
                                                        <div className="space-y-2">
                                                            <div className="h-4 w-3/4 bg-indigo-200/50 rounded animate-pulse"></div>
                                                            <div className="h-4 w-1/2 bg-indigo-200/50 rounded animate-pulse"></div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-indigo-900 text-lg font-medium leading-relaxed">
                                                            "{impactStory || "Select an amount to see the tangible impact of your kindness."}"
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>



                                        {/* User Details Form */}
                                        <div className="mb-8 space-y-4">
                                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Your Details</h3>
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-neutral-50 focus:border-primary focus:bg-white outline-none transition-all"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-neutral-50 focus:border-primary focus:bg-white outline-none transition-all"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-neutral-50 focus:border-primary focus:bg-white outline-none transition-all"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleDonate}
                                            className="w-full bg-accent text-secondary-DEFAULT font-bold py-5 rounded-xl hover:bg-yellow-400 transition-all text-xl shadow-lg hover:shadow-xl hover:shadow-yellow-400/20 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
                                        >
                                            <span>Donate ₹{amount} {frequency === 'monthly' ? '/ month' : ''}</span>
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                                            <ShieldCheck size={14} />
                                            Secure payment processing by PayU. All donations are tax-deductible.
                                        </p>
                                    </div>
                                </div>

                                {/* Voices from the Field */}
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold text-gray-900 font-heading mb-6">Voices from the Field</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {stories.map((story, i) => (
                                            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                                                <div className="h-48 rounded-xl overflow-hidden mb-4">
                                                    <img src={story.image} alt={story.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                </div>
                                                <h4 className="font-bold text-lg text-gray-900 mb-2">{story.title}</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">{story.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column (Info & Trust) */}
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="lg:col-span-5 space-y-8"
                            >
                                {/* Impact Card */}
                                <div className="bg-secondary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                                    <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3 relative z-10">
                                        <Gift className="text-accent" />
                                        Your Impact
                                    </h3>
                                    <ul className="space-y-6 relative z-10">
                                        <li className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="text-accent" size={16} />
                                            </div>
                                            <span className="text-gray-200 text-base leading-relaxed"><strong className="text-white">₹500</strong> provides school supplies for one student for a year.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="text-accent" size={16} />
                                            </div>
                                            <span className="text-gray-200 text-base leading-relaxed"><strong className="text-white">₹1000</strong> plants 20 trees in urban areas.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="text-accent" size={16} />
                                            </div>
                                            <span className="text-gray-200 text-base leading-relaxed"><strong className="text-white">₹2500</strong> funds a coding workshop for 5 teenagers.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Testimonials */}
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 font-heading flex items-center gap-2">
                                        <Users size={20} className="text-primary" />
                                        Our Community
                                    </h3>
                                    <div className="space-y-6">
                                        {testimonials.map((t, i) => (
                                            <div key={i} className="flex gap-4">
                                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                                                <div>
                                                    <p className="text-sm text-gray-600 italic mb-2">"{t.quote}"</p>
                                                    <p className="text-xs font-bold text-gray-900">{t.name}</p>
                                                    <p className="text-[10px] text-accent-dark font-bold uppercase tracking-wide">{t.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FAQ Accordion */}
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 font-heading">Common Questions</h3>
                                    <div className="space-y-4">
                                        {faqs.map((faq, i) => (
                                            <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                                <button
                                                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                                    className="flex items-center justify-between w-full text-left font-bold text-gray-700 hover:text-primary transition-colors text-sm"
                                                >
                                                    {faq.q}
                                                    {activeAccordion === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>
                                                <AnimatePresence>
                                                    {activeAccordion === i && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{faq.a}</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </motion.div>

                        </div>
                    </div>
                </section >
            </div >
        </PageTransition >
    );
};

export default Donate;
