import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoyaltyCard from '../components/LoyaltyCard';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState(user?.loyaltyPoints || 0);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchDashboardData();
        }
    }, [user, navigate]);

    const fetchDashboardData = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const apptsData = await axios.get('/api/appointments/mine', config);
            setAppointments(apptsData.data);

            const authData = await axios.get('/api/auth/me', config);
            setPoints(authData.data.loyaltyPoints);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard', error);
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                await axios.put(`/api/appointments/${id}/cancel`, {}, config);
                fetchDashboardData();
            } catch (error) {
                alert('Error cancelling appointment');
            }
        }
    };

    const handleReschedule = (id) => {
        navigate(`/?reschedule=true&appointmentId=${id}`);
    };

    if (!user) return null;

    const upcoming = appointments.filter(app => app.status === 'confirmed' || app.status === 'pending');
    const past = appointments.filter(app => app.status === 'completed' || app.status === 'cancelled');

    return (
        <section className="min-h-screen bg-[#0b0b0b] p-6 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-3xl text-white font-bold">
                        Welcome, <span className="text-accent">{user.name}</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="bg-[#111111] border border-gray-800 px-4 py-2 rounded-lg text-white">
                            Loyalty Points: <span className="text-accent font-bold text-xl">{points}</span>
                        </div>
                        <button onClick={logout} className="text-gray-400 hover:text-white transition">
                            Logout
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-white">Loading...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">Upcoming Appointments</h2>
                            {upcoming.length === 0 ? (
                                <p className="text-gray-500">No upcoming appointments.</p>
                            ) : (
                                <div className="space-y-4">
                                    {upcoming.map((app) => (
                                        <div key={app._id} className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-accent text-lg font-bold">{app.service?.name || 'Service'}</h3>
                                                <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded">
                                                    {app.status}
                                                </span>
                                            </div>
                                            <p className="text-white"><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                                            <p className="text-white"><strong>Time:</strong> {app.timeSlot}</p>
                                            <p className="text-white mb-4"><strong>Barber:</strong> {app.barber}</p>
                                            
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleReschedule(app._id)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500 transition"
                                                >
                                                    Reschedule
                                                </button>
                                                <button 
                                                    onClick={() => handleCancel(app._id)}
                                                    className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-500 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">Past Appointments</h2>
                            {past.length === 0 ? (
                                <p className="text-gray-500">No past appointments.</p>
                            ) : (
                                <div className="space-y-4">
                                    {past.map((app) => (
                                        <div key={app._id} className="bg-[#111111] border border-gray-800 p-5 rounded-xl opacity-75">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-gray-300 text-lg font-bold">{app.service?.name || 'Service'}</h3>
                                                <span className={`text-xs px-2 py-1 rounded ${app.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-400"><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                                            <p className="text-gray-400"><strong>Time:</strong> {app.timeSlot}</p>
                                            <p className="text-gray-400"><strong>Barber:</strong> {app.barber}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <LoyaltyCard points={points} refreshData={fetchDashboardData} />
                    </>
                )}
            </div>
        </section>
    );
};

export default Dashboard;
