
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Newsletter from './Newsletter';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white pt-20 pb-10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Mission */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src="/logo.jpg" alt="ThinkMinnt Logo" className="h-16 w-auto object-contain bg-white/10 rounded-lg p-1" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A Section 8 Non-Profit Organization dedicated to Education, Innovation, and Child Development.
                        </p>
                        <div className="text-xs text-gray-500 space-y-1 border-l-2 border-gray-700 pl-3">
                            <p>CIN: U85500PN2024NPL235880</p>
                            <p>Licence No: 162020</p>
                        </div>
                        <div className="flex space-x-4 pt-2">
                            {[
                                { Icon: Facebook, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: Instagram, href: "#" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/thinkminnt-foundation/" }
                            ].map(({ Icon, href }, index) => (
                                <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 border border-white/10">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Our Programs', 'Careers', 'Get Involved', 'Contact', 'Donate'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2 group text-sm">
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-secondary" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <MapPin size={14} />
                                </div>
                                <span className="text-sm leading-relaxed">S No. 89/1, 89/2, Shop No. Namo Developers,<br />Mohamadwadi, Pune City, Pune – 411060</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <Phone size={14} />
                                </div>
                                <span className="text-sm">+91 91393 92550</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <Mail size={14} />
                                </div>
                                <span className="text-sm">contact-us@thinkminnt.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <Newsletter />
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} ThinkMinnt Foundation. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
