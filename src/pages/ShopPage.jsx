import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const ShopPage = () => {
    const { cart, dispatch } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load products");
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        setCartOpen(true);
    };

    const cartTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        let message = `Hello EliteCuts! I'd like to place an order from your shop:\n\n`;
        cart.items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (₦${item.price * item.quantity})\n`;
        });
        message += `\nTotal: ₦${cartTotal}\n\nPlease let me know how to proceed with payment and pickup/delivery.`;
        
        window.open(`https://wa.me/2347068826788?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="min-h-screen bg-[#0b0b0b] pt-28 pb-16 text-white relative">
            <button 
                onClick={() => window.location.href = "/"} 
                className="absolute top-8 left-6 md:left-12 text-gray-400 hover:text-white flex items-center gap-2 font-bold transition"
            >
                ← Back
            </button>
            <div className="max-w-6xl mx-auto px-4 mt-12 md:mt-6">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            EliteCuts <span className="text-accent">Shop</span>
                        </h1>
                        <p className="text-gray-400 mt-2">Premium grooming products for maintaining your look.</p>
                    </div>
                    <button 
                        onClick={() => setCartOpen(true)}
                        className="relative bg-[#111111] border border-gray-800 p-4 rounded-full hover:border-accent transition"
                    >
                        🛍️
                        {cart.items.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-[#111111] w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">
                                {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 py-10">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 bg-[#111111] rounded-xl border border-gray-800">No products available at the moment.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <div key={product._id} className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden hover:border-accent transition group">
                                <div className="h-48 bg-gray-800 relative overflow-hidden flex items-center justify-center">
                                    {/* Placeholder for images since prompt implies hardcoded fallbacks or dynamic later */}
                                    <span className="text-4xl">🧴</span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-accent font-bold text-xl">₦{product.price}</span>
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded transition"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cart Sidebar Overlay */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setCartOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40"
                        />
                        <motion.div 
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111111] border-l border-gray-800 shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#0b0b0b]">
                                <h2 className="text-2xl font-bold">Your Cart</h2>
                                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.items.length === 0 ? (
                                    <div className="text-center text-gray-500 mt-20">Your cart is empty.</div>
                                ) : (
                                    cart.items.map(item => (
                                        <div key={item._id} className="flex gap-4 items-center bg-[#0b0b0b] p-4 rounded-xl border border-gray-800">
                                            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center text-2xl">🧴</div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm">{item.name}</h4>
                                                <p className="text-accent font-semibold text-sm">₦{item.price}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button onClick={() => dispatch({ type: 'DECREMENT', payload: item._id })} className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600">-</button>
                                                    <span className="text-sm font-bold">{item.quantity}</span>
                                                    <button onClick={() => dispatch({ type: 'INCREMENT', payload: item._id })} className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600">+</button>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item._id })}
                                                className="text-red-500 hover:text-red-400 p-2"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-800 bg-[#0b0b0b]">
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-400">Total:</span>
                                    <span className="text-2xl font-bold text-accent">₦{cartTotal}</span>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={cart.items.length === 0}
                                    className="w-full bg-accent text-[#111111] font-bold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-50"
                                >
                                    Checkout via WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </section>
    );
};

export default ShopPage;
