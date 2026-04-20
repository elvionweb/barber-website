import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const defaultTestimonials = [
  { _id: 't1', clientName: "Sam O.", rating: 5, review: "Best fade I've ever had! The attention to detail is unmatched. Definitely my new spot." },
  { _id: 't2', clientName: "Emmanuel D.", rating: 5, review: "Clean environment and professional barbers. Emeka knows exactly what he's doing." },
  { _id: 't3', clientName: "Kayode", rating: 4, review: "Great service, was in and out quickly. The hot towel treatment is a must-try." },
];

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    
    // Form state
    const [clientName, setClientName] = useState('');
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get('/api/reviews');
                if (Array.isArray(data) && data.length > 0) {
                    setReviews(data);
                } else {
                    setReviews(defaultTestimonials);
                }
            } catch (error) {
                setReviews(defaultTestimonials);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviews', { clientName, rating, review: reviewText });
            setStatusMsg('Your review has been submitted for approval!');
            setClientName('');
            setRating(5);
            setReviewText('');
            setTimeout(() => setModalOpen(false), 3000);
        } catch (error) {
            setStatusMsg('Failed to submit review.');
        }
    };

    const StarRating = ({ value, setRating }) => {
        return (
            <div className="flex gap-1 text-accent text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star} 
                        className={setRating ? "cursor-pointer" : ""} 
                        onClick={() => setRating && setRating(star)}
                    >
                        {star <= value ? '★' : '☆'}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <section className="py-16 bg-[#111111] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left text-white">
                        Client <span className="text-accent">Testimonials</span>
                    </h2>
                    <button 
                        onClick={() => {setModalOpen(true); setStatusMsg('');}}
                        className="mt-4 md:mt-0 bg-accent text-[#111111] px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
                    >
                        Leave a Review
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((rev) => (
                        <div key={rev._id} className="bg-[#0b0b0b] border border-gray-800 p-6 rounded-xl hover:border-accent transition duration-300">
                            <StarRating value={rev.rating} />
                            <p className="text-gray-300 my-4 italic">"{rev.review}"</p>
                            <h4 className="text-white font-bold">- {rev.clientName}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
                    >
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }} 
                            animate={{ y: 0, opacity: 1 }} 
                            exit={{ y: 50, opacity: 0 }} 
                            className="bg-[#111111] border border-gray-800 rounded-2xl w-full max-w-md p-6 relative"
                        >
                            <button 
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                            <h3 className="text-2xl font-bold text-white mb-6">Write a Review</h3>
                            
                            {statusMsg && (
                                <div className="bg-green-500/10 text-green-500 p-3 rounded mb-4 text-center text-sm font-semibold">
                                    {statusMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Your Name</label>
                                    <input 
                                        type="text" 
                                        value={clientName} 
                                        onChange={(e) => setClientName(e.target.value)} 
                                        className="w-full bg-[#0b0b0b] border border-gray-700 rounded-lg p-3 text-white focus:border-accent outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Rating</label>
                                    <StarRating value={rating} setRating={setRating} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Review</label>
                                    <textarea 
                                        rows="4" 
                                        value={reviewText} 
                                        onChange={(e) => setReviewText(e.target.value)} 
                                        className="w-full bg-[#0b0b0b] border border-gray-700 rounded-lg p-3 text-white focus:border-accent outline-none" 
                                        required 
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-accent text-[#111111] py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
                                    Submit Review
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Testimonials;
