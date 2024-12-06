'use client';
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser'



export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
        type: null,
        message: ''
    });
    const [statusCopy, setStatusCopy] = useState<{ type: string | null, message: string }>({
        type: null,
        message: ''
    });
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: null, message: '' });

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_NEXT_PUBLIC_MAIL_SERVER_KEY || '',
                process.env.NEXT_PUBLIC_MAIL_TEMPLATE_KEY || '',
                formRef.current!,
                process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY || ''
            );

            setStatus({
                type: 'success',
                message: 'Message sent successfully!'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setStatusCopy({ type: 'success', message: `${text} copied to clipboard!` });
            setTimeout(() => setStatusCopy({ type: null, message: '' }), 2000); // 2초 후 메시지 사라짐
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const contactInfo = [
        {
            title: "LOCATION",
            content: "611, 6th Floor, Skansen Knowledge Industry Center, 188 Galmae Sunhwan-ro, Guri-si, Gyeonggi-do, South Korea"
        },
        {
            title: "EMAIL",
            content: "82percent.official@gmail.com"
        },
        {
            title: "PHONE",
            content: "+82 10 9915 5855"
        },

    ];

    return (
        <div className="w-full min-h-screen flex justify-center items-center py-20 pt-[200px]">
            <div className="flex flex-col gap-12 max-w-[920px] mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1 }
                    }}
                >
                    <h1 className="text-2xl font-bold mb-6">CONTACT</h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.8 }
                        }}
                        className="grid grid-cols-1 gap-8"
                    >
                        {contactInfo.map((info) => (
                            <div key={info.title} className="flex flex-col gap-2 cursor-pointer">
                                <h2 className="text-sm font-bold">{info.title}</h2>
                                {<p onClick={() => handleCopyToClipboard(info.content)} className="text-lg">{info.content}</p>}

                                {statusCopy.message === `${info.content} copied to clipboard!` && (
                                    <div className={`text-sm ${statusCopy.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {statusCopy.message}
                                    </div>
                                )}
                            </div>

                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        ref={formRef}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.8 }
                        }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-bold">NAME</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="text-sm bg-transparent border border-white/30 rounded-none p-2 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-bold">EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="text-sm bg-transparent border border-white/30 rounded-none p-2 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-bold">MESSAGE</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="text-sm bg-transparent border border-white/30 rounded-none p-2 focus:outline-none focus:border-white transition-colors resize-none"
                            />
                        </div>

                        {status.message && (
                            <div className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mt-4 bg-white text-black py-2 px-6 font-bold text-lg hover:bg-gray-200 transition-colors self-start
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'SENDING...' : 'SEND EMAIL'}
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
} 