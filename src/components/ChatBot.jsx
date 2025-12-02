import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, Trash2, RefreshCw, ChevronDown, ExternalLink } from 'lucide-react';
import API_URL from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hi! I'm the ThinkMint Ambassador. Ask me anything about our mission, programs, or how to get involved! 🌱" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Show welcome message after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowWelcome(true);
            }
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, [isOpen]);

    const suggestedQuestions = [
        "How can I donate?",
        "What internships are open?",
        "Tell me about your programs",
        "How do I volunteer?"
    ];

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Enhanced Markdown Formatter
    const formatMessage = (text) => {
        if (!text) return null;

        // 1. Split by newlines to handle paragraphs and lists
        const lines = text.split('\n');

        return lines.map((line, lineIdx) => {
            // Handle Lists
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return (
                    <div key={lineIdx} className="flex items-start gap-2 ml-2 mb-1">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{parseInline(line.replace(/^[-*]\s/, ''))}</span>
                    </div>
                );
            }

            // Handle Empty Lines
            if (!line.trim()) {
                return <div key={lineIdx} className="h-2"></div>;
            }

            // Standard Paragraph
            return <p key={lineIdx} className="mb-1 last:mb-0 leading-relaxed">{parseInline(line)}</p>;
        });
    };

    const parseInline = (text) => {
        // Regex for Bold (**text**) and Links [text](url)
        const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

        return parts.map((part, index) => {
            // Bold
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            // Links
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const [label, url] = part.slice(1, -1).split('](');
                return (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark underline decoration-primary/30 hover:decoration-primary transition-colors inline-flex items-center gap-0.5"
                    >
                        {label} <ExternalLink size={10} />
                    </a>
                );
            }
            return part;
        });
    };

    const handleClearChat = () => {
        setMessages([{ role: 'model', text: "Chat cleared! How can I help you now? ✨" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto'; // Reset height

        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await fetch(`${API_URL}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history })
            });

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, { role: 'model', text: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting right now. Please try again later.", isError: true }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please check your connection.", isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = async () => {
        // Find last user message
        const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
        if (lastUserMsg) {
            setInput(lastUserMsg.text);
            // Remove the error message and the last user message to "retry"
            setMessages(prev => prev.slice(0, -2));
            // The user will need to press send again, which is safer UX than auto-resending
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-[90vw] sm:w-[28rem] mb-4 overflow-hidden border border-white/40 flex flex-col h-[650px] max-h-[80vh]"
                    >
                        {/* Header */}
                        <div className="bg-white/50 backdrop-blur-md p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-primary to-primary-dark p-2.5 rounded-xl shadow-lg shadow-primary/20">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm tracking-wide">ThinkMint AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                        <p className="text-[11px] text-gray-500 font-medium">Online & Ready</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleClearChat}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                    title="Clear Chat"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
                                >
                                    <ChevronDown size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {msg.role === 'model' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                                                <Sparkles size={14} className="text-primary" />
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-1">
                                            <div
                                                className={`px-5 py-3.5 text-sm shadow-sm ${msg.role === 'user'
                                                    ? 'bg-gradient-to-br from-primary to-primary-600 text-white rounded-2xl rounded-br-sm'
                                                    : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm'
                                                    } ${msg.isError ? 'border-red-200 bg-red-50 text-red-800' : ''}`}
                                            >
                                                {formatMessage(msg.text)}
                                            </div>

                                            {/* Retry Button for Errors */}
                                            {msg.isError && (
                                                <button
                                                    onClick={handleRetry}
                                                    className="self-start text-xs text-red-500 hover:text-red-700 flex items-center gap-1 ml-1 font-medium"
                                                >
                                                    <RefreshCw size={10} /> Retry
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-end gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                                            <Sparkles size={14} className="text-primary" />
                                        </div>
                                        <div className="bg-white text-gray-500 shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 text-xs flex items-center gap-1.5">
                                            <motion.span
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                            />
                                            <motion.span
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                            />
                                            <motion.span
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            {/* Suggested Questions */}
                            {messages.length < 3 && (
                                <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                    {suggestedQuestions.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setInput(q);
                                                if (textareaRef.current) textareaRef.current.focus();
                                            }}
                                            className="whitespace-nowrap px-3 py-1.5 bg-gray-50 hover:bg-primary/5 hover:border-primary/30 hover:text-primary text-gray-600 text-xs rounded-full transition-all border border-gray-200 shadow-sm"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-3xl p-1.5 focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary transition-all shadow-inner">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    placeholder="Ask about our mission..."
                                    rows={1}
                                    className="flex-1 bg-transparent border-none px-4 py-3 text-sm text-gray-900 focus:ring-0 outline-none placeholder:text-gray-400 resize-none max-h-32 min-h-[44px]"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="mb-1 mr-1 bg-primary text-white p-2.5 rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                            <div className="text-center mt-2 flex justify-center items-center gap-1.5 opacity-50">
                                <Sparkles size={10} className="text-primary" />
                                <p className="text-[10px] text-gray-400 font-medium tracking-wide">Powered by Gemini 2.0 Flash</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button & Welcome Popup */}
            <div className="relative">
                <AnimatePresence>
                    {!isOpen && showWelcome && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className="absolute bottom-full right-0 mb-4 mr-2 w-64 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-40 origin-bottom-right"
                        >
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowWelcome(false);
                                    }}
                                    className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <X size={14} />
                                </button>
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Bot size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Hi there! 👋</h4>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            I can help you find programs, volunteer opportunities, or answer any questions.
                                        </p>
                                    </div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute -bottom-6 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setIsOpen(true);
                                setShowWelcome(false);
                            }}
                            className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-600 text-white rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all overflow-hidden z-50"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>

                            <motion.div
                                animate={{ rotate: [0, 10, -10, 10, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10"
                            >
                                <Bot size={32} />
                            </motion.div>

                            {/* Tooltip (Simple Hover) */}
                            <div className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                <p className="text-sm font-bold">Chat with us!</p>
                                <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white transform -translate-y-1/2 rotate-45 border-t border-r border-gray-100"></div>
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChatBot;
