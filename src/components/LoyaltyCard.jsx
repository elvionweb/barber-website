import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const LoyaltyCard = ({ points, refreshData }) => {
    const { user } = useAuth();
    const [redeeming, setRedeeming] = useState(false);
    const [msg, setMsg] = useState('');

    const maxPts = 100;
    const progress = Math.min((points / maxPts) * 100, 100);

    const handleRedeem = async () => {
        setRedeeming(true);
        setMsg('');
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/loyalty/redeem', {}, config);
            setMsg('Success! You redeemed 100 points for a discount.');
            refreshData();
        } catch (error) {
            setMsg(error.response?.data?.message || 'Error redeeming points');
        }
        setRedeeming(false);
    };

    return (
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 mt-8">
            <h2 className="text-2xl text-white font-bold mb-4">Loyalty Rewards</h2>
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-gray-800 pb-6 mb-6">
                <div className="flex-1 w-full relative">
                    <p className="text-gray-400 font-semibold mb-2 flex justify-between">
                        <span>Progress to Reward</span>
                        <span className="text-accent">{points} / {maxPts} PTS</span>
                    </p>
                    <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${progress}%` }} 
                            transition={{ duration: 1 }}
                            className="h-full bg-accent rounded-full"
                        ></motion.div>
                    </div>
                </div>
                
                {points >= 100 && (
                    <button 
                        onClick={handleRedeem} 
                        disabled={redeeming}
                        className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition w-full md:w-auto flex-shrink-0"
                    >
                        {redeeming ? 'Redeeming...' : 'Redeem 100 Points'}
                    </button>
                )}
            </div>
            
            {msg && (
                <div className="bg-gray-800 text-white p-3 rounded text-center mb-6">{msg}</div>
            )}
            
            <p className="text-sm text-gray-500 italic">
                * Earn 10 points for every completed booking. Redeem 100 points for ₦1,000 off your next cut or products!
            </p>
        </div>
    );
};

export default LoyaltyCard;
