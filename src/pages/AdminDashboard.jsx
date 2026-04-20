import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    
    const [stats, setStats] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [giftCards, setGiftCards] = useState([]);

    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            fetchStats();
        }
    }, [user, navigate]);

    // Data Fetchers
    const fetchStats = async () => { try { setStats((await axios.get('/api/admin/stats', config)).data); } catch(err){ console.error('fetchStats error', err); } };
    const fetchAppointments = async () => { try { setAppointments((await axios.get('/api/appointments', config)).data); } catch(err){ console.error(err); } };
    const fetchServices = async () => { try { setServices((await axios.get('/api/services')).data); } catch(err){ console.error(err); } };
    const fetchReviews = async () => { try { setReviews((await axios.get('/api/reviews/all', config)).data); } catch(err){ console.error(err); } };
    const fetchProducts = async () => { try { setProducts((await axios.get('/api/products')).data); } catch(err){ console.error(err); } };
    const fetchBarbers = async () => { try { setBarbers((await axios.get('/api/barbers')).data); } catch(err){ console.error(err); } };
    const fetchGiftCards = async () => { try { setGiftCards((await axios.get('/api/giftcards', config)).data); } catch(err){ console.error(err); } };

    useEffect(() => {
        if (!user || user.role !== 'admin') return;
        
        if (activeTab === 'Overview') fetchStats();
        if (activeTab === 'Appointments') fetchAppointments();
        if (activeTab === 'Services') fetchServices();
        if (activeTab === 'Reviews') fetchReviews();
        if (activeTab === 'Products') fetchProducts();
        if (activeTab === 'Barbers') fetchBarbers();
        if (activeTab === 'GiftCards') fetchGiftCards();
    }, [activeTab, user]);

    // --- Action Handlers ---
    // Appointments
    const updateAppointmentStatus = async (id, status) => {
        await axios.put(`/api/appointments/${id}/status`, { status }, config);
        fetchAppointments();
    };

    // Services
    const [newService, setNewService] = useState({ name: '', price: '', category: 'Haircut', description: '' });
    const handleAddService = async (e) => {
        e.preventDefault();
        await axios.post('/api/services', newService, config);
        setNewService({ name: '', price: '', category: 'Haircut', description: '' });
        fetchServices();
    };
    const handleDeleteService = async (id) => {
        if (window.confirm('Delete service?')) {
            await axios.delete(`/api/services/${id}`, config);
            fetchServices();
        }
    };

    // Reviews
    const handleApproveReview = async (id) => {
        await axios.put(`/api/reviews/${id}/approve`, {}, config);
        fetchReviews();
    };
    const handleDeleteReview = async (id) => {
        await axios.delete(`/api/reviews/${id}`, config);
        fetchReviews();
    };

    // Products
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', stock: '' });
    const handleAddProduct = async (e) => {
        e.preventDefault();
        await axios.post('/api/products', newProduct, config);
        setNewProduct({ name: '', price: '', description: '', stock: '' });
        fetchProducts();
    };
    const handleDeleteProduct = async (id) => {
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts();
    };

    // Barbers
    const handleToggleBarber = async (barber) => {
        await axios.put(`/api/barbers/${barber._id}`, { available: !barber.available }, config);
        fetchBarbers();
    };

    // Gift Cards
    const [newGiftCardVal, setNewGiftCardVal] = useState('');
    const handleGenerateGiftCard = async (e) => {
        e.preventDefault();
        await axios.post('/api/giftcards', { value: newGiftCardVal }, config);
        setNewGiftCardVal('');
        fetchGiftCards();
    };

    if (!user || user.role !== 'admin') return null;

    const tabs = ['Overview', 'Appointments', 'Services', 'Reviews', 'Products', 'Barbers', 'GiftCards'];

    return (
        <section className="min-h-screen bg-[#0b0b0b] text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#111111] border-r border-gray-800 p-6">
                <h2 className="text-2xl font-bold text-accent mb-8">Admin Panel</h2>
                <ul className="space-y-2">
                    {tabs.map(tab => (
                        <li key={tab}>
                            <button 
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === tab ? 'bg-accent text-[#111111] font-bold' : 'hover:bg-gray-800 text-gray-400'}`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6">
                    <button onClick={logout} className="text-sm text-red-500 hover:text-red-400 text-left font-bold flex items-center gap-2">
                        <span>🚪</span> Logout
                    </button>
                    <button onClick={() => window.location.href='/'} className="text-sm text-gray-500 hover:text-white text-left">← Back to Site</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
                <h1 className="text-3xl font-bold mb-8">{activeTab}</h1>

                {/* OVERVIEW */}
                {activeTab === 'Overview' && stats && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl">
                                <h3 className="text-gray-400 text-sm">Bookings Today</h3>
                                <p className="text-3xl font-bold text-accent">{stats.totalBookingsToday}</p>
                            </div>
                            <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl">
                                <h3 className="text-gray-400 text-sm">Pending Appointments</h3>
                                <p className="text-3xl font-bold text-accent">{stats.pendingCount}</p>
                            </div>
                            <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl">
                                <h3 className="text-gray-400 text-sm">Total Clients</h3>
                                <p className="text-3xl font-bold text-accent">{stats.totalClients}</p>
                            </div>
                            <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl">
                                <h3 className="text-gray-400 text-sm">Revenue This Month</h3>
                                <p className="text-3xl font-bold text-accent">₦{stats.totalRevenueThisMonth}</p>
                            </div>
                        </div>
                        
                        <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl">
                            <h3 className="font-bold mb-6">Bookings (Last 7 Days)</h3>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer width="99%" height={300}>
                                    <BarChart data={stats.bookingsLast7Days}>
                                        <XAxis dataKey="date" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" allowDecimals={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#111111', borderColor: '#374151' }} />
                                        <Bar dataKey="bookings" fill="#d4af37" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* APPOINTMENTS */}
                {activeTab === 'Appointments' && (
                    <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="p-4">Date & Time</th>
                                    <th className="p-4">Client</th>
                                    <th className="p-4">Barber</th>
                                    <th className="p-4">Service</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {appointments.map(app => (
                                    <tr key={app._id} className="hover:bg-gray-800/50">
                                        <td className="p-4">{new Date(app.date).toLocaleDateString()} at {app.timeSlot}</td>
                                        <td className="p-4">
                                            {app.clientName}<br/>
                                            <span className="text-xs text-gray-500">{app.phone}</span>
                                        </td>
                                        <td className="p-4">{app.barber}</td>
                                        <td className="p-4">{app.service?.name || '-'}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${app.status === 'confirmed' ? 'bg-blue-500/10 text-blue-500' : app.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            {app.status !== 'completed' && <button onClick={() => updateAppointmentStatus(app._id, 'completed')} className="text-green-500 hover:underline">Complete</button>}
                                            {app.status !== 'cancelled' && <button onClick={() => updateAppointmentStatus(app._id, 'cancelled')} className="text-red-500 hover:underline">Cancel</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* SERVICES */}
                {activeTab === 'Services' && (
                    <div className="space-y-8">
                        <form onSubmit={handleAddService} className="bg-[#111111] border border-gray-800 p-6 rounded-xl flex flex-wrap gap-4 items-end">
                            <div><label className="text-xs text-gray-400 block mb-1">Name</label><input required className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} /></div>
                            <div><label className="text-xs text-gray-400 block mb-1">Price (₦)</label><input required type="number" className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} /></div>
                            <div><label className="text-xs text-gray-400 block mb-1">Description</label><input required className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} /></div>
                            <button type="submit" className="bg-accent text-[#111111] px-4 py-2 font-bold rounded">Add Service</button>
                        </form>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(s => (
                                <div key={s._id} className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold">{s.name}</h3>
                                        <span className="text-accent font-bold">₦{s.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">{s.description}</p>
                                    <div className="flex justify-end gap-3 text-sm">
                                        <button onClick={() => handleDeleteService(s._id)} className="text-red-500 hover:text-red-400">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* REVIEWS */}
                {activeTab === 'Reviews' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map(r => (
                            <div key={r._id} className="bg-[#111111] border border-gray-800 p-5 rounded-xl flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold">{r.clientName}</h3>
                                        <div className="text-yellow-400">★ {r.rating}</div>
                                    </div>
                                    <p className="text-sm text-gray-400 italic mb-4">"{r.review}"</p>
                                    <span className={`text-xs px-2 py-1 rounded inline-block mb-4 ${r.approved ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                        {r.approved ? 'Approved' : 'Pending'}
                                    </span>
                                </div>
                                <div className="flex gap-2 border-t border-gray-800 pt-4">
                                    {!r.approved && <button onClick={() => handleApproveReview(r._id)} className="flex-1 bg-green-600/20 text-green-500 py-1 rounded hover:bg-green-600/40">Approve</button>}
                                    <button onClick={() => handleDeleteReview(r._id)} className="flex-1 bg-red-600/20 text-red-500 py-1 rounded hover:bg-red-600/40">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* PRODUCTS */}
                {activeTab === 'Products' && (
                    <div className="space-y-8">
                        <form onSubmit={handleAddProduct} className="bg-[#111111] border border-gray-800 p-6 rounded-xl flex flex-wrap gap-4 items-end">
                            <div><label className="text-xs text-gray-400 block mb-1">Name</label><input required className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} /></div>
                            <div><label className="text-xs text-gray-400 block mb-1">Price</label><input required type="number" className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} /></div>
                            <div><label className="text-xs text-gray-400 block mb-1">Stock</label><input required type="number" className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} /></div>
                            <button type="submit" className="bg-accent text-[#111111] px-4 py-2 font-bold rounded">Add Product</button>
                        </form>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {products.map(p => (
                                <div key={p._id} className="bg-[#111111] border border-gray-800 p-4 rounded-xl text-center">
                                    <h3 className="font-bold">{p.name}</h3>
                                    <p className="text-accent my-2">₦{p.price}</p>
                                    <p className="text-sm text-gray-500 mb-4">{p.stock} in stock</p>
                                    <button onClick={() => handleDeleteProduct(p._id)} className="text-red-500 text-sm hover:underline">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* BARBERS */}
                {activeTab === 'Barbers' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {barbers.map(b => (
                            <div key={b._id} className={`bg-[#111111] border p-6 rounded-xl text-center ${b.available ? 'border-gray-800' : 'border-red-500 border-dashed opacity-50'}`}>
                                <div className="text-6xl mb-4">{b.image}</div>
                                <h3 className="text-xl font-bold">{b.name}</h3>
                                <p className="text-accent mb-4">{b.title}</p>
                                <button 
                                    onClick={() => handleToggleBarber(b)}
                                    className={`px-4 py-2 rounded font-bold text-sm ${b.available ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}
                                >
                                    {b.available ? 'Set Unavailable' : 'Set Available'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* GIFT CARDS */}
                {activeTab === 'GiftCards' && (
                    <div className="space-y-8">
                        <form onSubmit={handleGenerateGiftCard} className="bg-[#111111] border border-gray-800 p-6 rounded-xl flex gap-4 items-end max-w-sm">
                            <div className="flex-1"><label className="text-xs text-gray-400 block mb-1">Value (₦)</label><input required type="number" className="bg-[#0b0b0b] border border-gray-700 p-2 rounded text-sm w-full" value={newGiftCardVal} onChange={e => setNewGiftCardVal(e.target.value)} /></div>
                            <button type="submit" className="bg-accent text-[#111111] px-4 py-2 font-bold rounded">Generate Manually</button>
                        </form>

                        <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-800 text-gray-300">
                                    <tr>
                                        <th className="p-4">Code</th>
                                        <th className="p-4">Value</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Purchased By</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {giftCards.map(gc => (
                                        <tr key={gc._id}>
                                            <td className="p-4 font-mono font-bold text-accent">{gc.code}</td>
                                            <td className="p-4">₦{gc.value}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs ${gc.used ? 'bg-gray-800 text-gray-400' : 'bg-green-500/10 text-green-500'}`}>
                                                    {gc.used ? 'Used' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="p-4">{gc.purchasedBy?.name || 'Guest/Manual'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>
        </section>
    );
};

export default AdminDashboard;
