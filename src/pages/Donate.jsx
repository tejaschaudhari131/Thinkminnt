import React, { useState, useEffect } from 'react';
import { Heart, Check, CreditCard, Gift, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_URL from '../config/api';

const Donate = () => {
    const [amount, setAmount] = useState(500);
    const [frequency, setFrequency] = useState('monthly');
    const [impactStory, setImpactStory] = useState('');
    const [loadingStory, setLoadingStory] = useState(false);

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

    return (
        <PageTransition>
            <SEO
                title="Donate - Support Our Cause"
                description="Your contribution directly impacts lives. Join us in creating a sustainable future for communities in need."
                keywords="Donate, Charity, NGO, Support, Give Back, Philanthropy"
            />
            <div className="flex flex-col">
                {/* Header */}
                <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Heart size={48} className="mx-auto mb-6 text-accent" />
                        <h1 className="text-4xl font-bold font-heading mb-4">Support Our Cause</h1>
                        <p className="text-xl text-primary-light max-w-2xl mx-auto">
                            Your contribution directly impacts lives. Join us in creating a sustainable future for communities in need.
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                            {/* Donation Form */}
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-100">
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>

                                    {/* Frequency Toggle */}
                                    <div className="flex bg-neutral-100 p-1 rounded-lg mb-8 w-max">
                                        <button
                                            onClick={() => setFrequency('one-time')}
                                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${frequency === 'one-time' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            One-Time
                                        </button>
                                        <button
                                            onClick={() => setFrequency('monthly')}
                                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${frequency === 'monthly' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            Monthly
                                        </button>
                                    </div>

                                    {/* Amount Selection */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                            {amounts.map((amt) => (
                                                <button
                                                    key={amt}
                                                    onClick={() => setAmount(amt)}
                                                    className={`py-3 rounded-lg border-2 font-bold transition-all ${amount === amt ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-primary/50 text-gray-600'}`}
                                                >
                                                    ₹{amt}
                                                </button>
                                            ))}
                                            <div className="relative col-span-3 sm:col-span-2">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="Other"
                                                    className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary outline-none font-bold text-gray-700"
                                                    onChange={(e) => setAmount(Number(e.target.value))}
                                                    value={amount}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Impact Storyteller */}
                                    <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-xl p-5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2 opacity-10">
                                            <Sparkles size={64} className="text-indigo-600" />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-indigo-900 font-bold text-sm mb-2 flex items-center gap-2">
                                                <Sparkles size={16} className="text-indigo-600" />
                                                Your Potential Impact
                                            </h3>
                                            {loadingStory ? (
                                                <div className="h-6 w-3/4 bg-indigo-200/50 rounded animate-pulse"></div>
                                            ) : (
                                                <p className="text-indigo-800 text-sm italic leading-relaxed">
                                                    "{impactStory || "Calculating impact..."}"
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Payment Method Placeholder */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                                        <div className="flex gap-4">
                                            <button className="flex-1 py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                                                <CreditCard size={20} />
                                                <span>Card</span>
                                            </button>
                                            <button className="flex-1 py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                                                <span>UPI</span>
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(`${API_URL}/api/donate`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ amount, frequency, paymentMethod: 'Card' })
                                                });
                                                if (response.ok) {
                                                    alert(`Thank you for your donation of ₹${amount}!`);
                                                } else {
                                                    alert('Failed to process donation.');
                                                }
                                            } catch (error) {
                                                console.error('Error:', error);
                                                alert('An error occurred.');
                                            }
                                        }}
                                        className="w-full bg-accent text-secondary-DEFAULT font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                                        Donate ₹{amount} {frequency === 'monthly' ? '/ month' : ''}
                                    </button>

                                    <p className="text-center text-xs text-gray-400 mt-4">
                                        Secure payment processing. All donations are tax-deductible.
                                    </p>
                                </div>
                            </div>

                            {/* Impact Info */}
                            <div className="space-y-8">
                                <div className="bg-secondary text-white p-8 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                                        <Gift className="text-accent" />
                                        Your Impact
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <Check className="text-accent mt-1 flex-shrink-0" size={18} />
                                            <span className="text-gray-200 text-sm"><strong>₹500</strong> provides school supplies for one student for a year.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="text-accent mt-1 flex-shrink-0" size={18} />
                                            <span className="text-gray-200 text-sm"><strong>₹1000</strong> plants 20 trees in urban areas.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="text-accent mt-1 flex-shrink-0" size={18} />
                                            <span className="text-gray-200 text-sm"><strong>₹2500</strong> funds a coding workshop for 5 teenagers.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Other Ways to Give</h3>
                                    <ul className="space-y-4 text-sm text-gray-600">
                                        <li>
                                            <strong className="block text-gray-900">Corporate Matching</strong>
                                            Check if your employer matches charitable contributions.
                                        </li>
                                        <li>
                                            <strong className="block text-gray-900">Legacy Giving</strong>
                                            Include ThinkMint in your will or estate plan.
                                        </li>
                                        <li>
                                            <strong className="block text-gray-900">Volunteer</strong>
                                            Donate your time and skills to our programs.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Donate;
