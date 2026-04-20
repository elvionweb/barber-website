import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await axios.post('/api/chat', { message: userMsg });
            setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Connection error. Contact us on WhatsApp.", isBot: true }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 20, scale: 0.9 }} 
                        className="bg-[#111111] border border-gray-800 rounded-2xl w-[90vw] max-w-[320px] h-[400px] mb-4 shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="bg-[#7c5cff] text-white p-4 font-bold flex justify-between items-center">
                            <span>EliteCuts Assistant</span>
                            <button onClick={() => setIsOpen(false)} className="hover:opacity-75">✕</button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0b0b0b]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.isBot ? 'bg-gray-800 text-white self-start' : 'bg-[#7c5cff] text-white ml-auto'}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {loading && (
                                <div className="text-gray-500 text-xs italic">Typing...</div>
                            )}
                        </div>

                        <form onSubmit={handleSend} className="border-t border-gray-800 p-3 bg-[#111111] flex gap-2">
                            <input 
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 bg-[#0b0b0b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7c5cff]"
                            />
                            <button type="submit" disabled={!input.trim() || loading} className="bg-[#7c5cff] text-white px-3 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-[#6b4ae5]">
                                Send
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full bg-[#7c5cff] text-white shadow-lg flex items-center justify-center text-2xl hover:scale-105 transition-transform ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
            >
                💬
            </button>
        </div>
    );
};

export default LiveChat;
