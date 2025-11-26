import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:3001/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
                setTimeout(() => {
                    setStatus('idle');
                    setMessage('');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to connect to server');
        }
    };

    return (
        <div>
            <h4 className="text-lg font-bold mb-6 font-heading text-white">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates and impact stories.</p>

            {status === 'success' ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3 text-green-400">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">{message}</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                            disabled={status === 'submitting'}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all disabled:opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold px-4 py-3 rounded-lg text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                        {!status.startsWith('submitting') && <Send size={16} />}
                    </button>
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
                            <AlertCircle size={14} />
                            <span>{message}</span>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default Newsletter;
