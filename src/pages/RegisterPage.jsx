import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const { register, user, error, loading } = useAuth();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        register(name, email, phone, password);
    };

    return (
        <section className="min-h-screen bg-[#0b0b0b] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-xl p-8 mt-10 mb-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">
                    Create <span className="text-accent">Account</span>
                </h1>
                
                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4 text-center">{error}</div>}
                
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2 font-medium">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 font-medium">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 font-medium">Phone Number</label>
                        <input 
                            type="tel" 
                            className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 font-medium">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-accent text-[#111111] font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;
