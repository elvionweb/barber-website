import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const GiftCardPage = () => {
    const { user } = useAuth();
    
    const [amount, setAmount] = useState(5000);
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [buying, setBuying] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const amounts = [5000, 10000, 20000];

    const handlePurchase = async (e) => {
        e.preventDefault();
        setBuying(true);
        setErrorMsg('');
        try {
            const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
            const { data } = await axios.post('/api/giftcards/purchase', {
                value: amount, recipientName, recipientEmail
            }, config);
            
            setGeneratedCode(data.code);
            
            // Redirect to WhatsApp for payment
            const message = `Hello, I'd like to pay for a ₦${amount} EliteCuts Gift Card for ${recipientName} (${recipientEmail}). My purchase code is: ${data.code}`;
            const waLink = `https://wa.me/2347068826788?text=${encodeURIComponent(message)}`;
            
            setTimeout(() => {
                window.open(waLink, '_blank');
            }, 1000);

        } catch (err) {
            setErrorMsg('Failed to process purchase.');
        }
        setBuying(false);
    };

    return (
        <section className="min-h-screen bg-[#0b0b0b] py-20 text-white flex flex-col items-center relative">
            <button 
                onClick={() => window.location.href = "/"} 
                className="absolute top-6 left-6 text-gray-400 hover:text-white flex items-center gap-2 font-bold transition"
            >
                ← Back
            </button>
            <div className="max-w-3xl w-full px-4 mt-8 md:mt-0">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Give the Gift of a <span className="text-accent">Great Cut</span>
                    </h1>
                    <p className="text-gray-400">Digital gift cards delivered instantly via email.</p>
                </div>

                <AnimatePresence mode="wait">
                    {!generatedCode ? (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#111111] border border-gray-800 p-6 md:p-10 rounded-2xl">
                            {errorMsg && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4">{errorMsg}</div>}
                            
                            <form onSubmit={handlePurchase} className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Select Amount</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {amounts.map(amt => (
                                            <button 
                                                key={amt} type="button"
                                                onClick={() => setAmount(amt)}
                                                className={`py-3 rounded-lg border font-bold transition ${amount === amt ? 'bg-accent border-accent text-[#111111]' : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'}`}
                                            >
                                                ₦{amt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">Recipient Details</h3>
                                    <div className="space-y-4">
                                        <input 
                                            type="text" placeholder="Recipient's Name" required 
                                            value={recipientName} onChange={e => setRecipientName(e.target.value)}
                                            className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg focus:outline-none focus:border-accent"
                                        />
                                        <input 
                                            type="email" placeholder="Recipient's Email" required 
                                            value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)}
                                            className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg focus:outline-none focus:border-accent"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-800">
                                    <p className="text-sm text-gray-400 mb-4">* Payment link will be sent to your WhatsApp securely.</p>
                                    <button 
                                        type="submit" disabled={buying}
                                        className="w-full bg-accent text-[#111111] font-bold py-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                                    >
                                        {buying ? 'Processing...' : 'Purchase Gift Card'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#111111] border border-accent p-10 rounded-2xl text-center">
                            <h2 className="text-3xl font-bold text-green-500 mb-4">Purchase Initiated!</h2>
                            <p className="text-gray-300 mb-6">Your WhatsApp should be opening to complete payment. The unique gift code is:</p>
                            <div className="bg-[#0b0b0b] border border-gray-800 py-6 px-4 rounded-xl mb-6">
                                <span className="text-3xl md:text-4xl font-mono tracking-widest text-accent font-bold">
                                    {generatedCode}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">A copy of this code has been emailed to {recipientEmail}. It will activate immediately upon payment confirmation.</p>
                            <button onClick={() => window.location.href = "/"} className="mt-8 text-accent hover:underline font-bold">Return Home</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default GiftCardPage;
