import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const WalkInBadge = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const { data } = await axios.get('/api/appointments/walkin-status');
                setStatus(data);
            } catch (err) {
                console.error("Failed to fetch walk-in status");
            }
        };
        fetchStatus();
        const interval = setInterval(fetchStatus, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    if (!status) return null;

    return (
        <div className="hidden lg:flex items-center gap-2 bg-[#1a1a1a] border border-gray-800 px-4 py-2 rounded-full shadow-lg">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-3 h-3 rounded-full ${status.available ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className={`text-xs font-bold ${status.available ? 'text-green-500' : 'text-red-500'}`}>
                {status.available ? 'Walk-Ins Welcome' : 'Fully Booked'}
            </span>
        </div>
    );
};

export default WalkInBadge;
