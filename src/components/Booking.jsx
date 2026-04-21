import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const BARBERS = [
    { id: 'b1', name: 'James "The Blade"', tag: 'Fade Specialist', image: '/c2c.jpeg' },
    { id: 'b2', name: 'Marcus Stylez', tag: 'Classic & Beards', image: '/c2c1.jpeg' },
    { id: 'b3', name: 'Tony Sharp', tag: 'All-Rounder', image: '/c2c2.jpeg' }
];

const Booking = () => {
    const { user } = useAuth();

    const [step, setStep] = useState(1);

    // Reschedule Logic
    const [isReschedule, setIsReschedule] = useState(false);
    const [rescheduleAptId, setRescheduleAptId] = useState(null);

    // Form Data
    const [servicesList, setServicesList] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [waitlistMode, setWaitlistMode] = useState(false);

    // Client Details
    const [clientName, setClientName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [giftCode, setGiftCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [giftCodeValid, setGiftCodeValid] = useState(false);

    // UI State
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [reference, setReference] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get('/api/services');
                setServicesList(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load services");
            }
        };
        fetchServices();

        // Check window search for reschedule
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('reschedule') === 'true') {
            setIsReschedule(true);
            setRescheduleAptId(searchParams.get('appointmentId'));
            setStep(2); // Skip Step 1 to just pick new date/time if rescheduling 
            // Note: Ideal flow fetches old appt details, but we'll assume they just pick date/time/barber here.
        }
    }, [user]);

    useEffect(() => {
        if (selectedDate && selectedBarber) {
            const fetchSlots = async () => {
                setLoadingSlots(true);
                setWaitlistMode(false);
                try {
                    const { data } = await axios.get(`/api/appointments/slots?date=${selectedDate}&barber=${selectedBarber.name}`);
                    setAvailableSlots(Array.isArray(data) ? data : []);
                } catch (err) {
                    console.error("Failed to fetch slots");
                }
                setLoadingSlots(false);
            };
            fetchSlots();
        }
    }, [selectedDate, selectedBarber]);

    const handleValidateGiftCard = async () => {
        setErrorMsg('');
        try {
            const { data } = await axios.post('/api/giftcards/validate', { code: giftCode });
            if (data.valid) {
                setDiscount(data.value);
                setGiftCodeValid(true);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Invalid gift card code');
            setGiftCodeValid(false);
            setDiscount(0);
        }
    };

    const nextStep = () => {
        setErrorMsg('');
        if (step === 1 && (!selectedService || !selectedBarber)) {
            setErrorMsg('Please select a service and a barber.');
            return;
        }
        if (step === 2 && !waitlistMode && !selectedTimeSlot) {
            setErrorMsg('Please select a time slot.');
            return;
        }
        if (step === 3 && (!clientName || !phone || !email)) {
            setErrorMsg('Please enter all required details.');
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const submitBooking = async () => {
        setSubmitting(true);
        setErrorMsg('');
        try {
                const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
            if (waitlistMode) {
                await axios.post('/api/appointments/waitlist', {
                    name: clientName, phone, email, date: selectedDate, service: selectedService._id
                }, config);
                setReference('WAITLIST-' + Math.floor(Math.random() * 10000));
            } else if (isReschedule) {
                const { data } = await axios.put(`/api/appointments/${rescheduleAptId}/reschedule`, {
                    newDate: selectedDate, newTimeSlot: selectedTimeSlot
                }, config);
                setReference(data._id.substring(data._id.length - 8).toUpperCase());
            } else {
                const { data } = await axios.post('/api/appointments', {
                    clientName, phone, email, service: selectedService._id, barber: selectedBarber.name, date: selectedDate, timeSlot: selectedTimeSlot, giftCode
                }, config);
                setReference(data._id.substring(data._id.length - 8).toUpperCase());
            }
            setStep(4);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to complete booking. Slot might be taken.');
        }
        setSubmitting(false);
    };

    // Calculate minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <section id="booking" className="py-16 bg-[#0b0b0b] min-h-screen text-white flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2">
                        {isReschedule ? 'Reschedule' : 'Book'} Your <span className="text-accent">Cut</span>
                    </h2>
                    {step < 4 && <p className="text-gray-400">Step {step} of 3</p>}
                </div>

                <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">

                    {errorMsg && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6 text-center">
                            {errorMsg}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {/* STEP 1: SERVICE & BARBER */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                                <h3 className="text-xl font-bold mb-4">Choose a Service</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {servicesList.map(s => (
                                        <button
                                            key={s._id}
                                            onClick={() => setSelectedService(s)}
                                            className={`p-4 rounded-xl border text-left transition ${selectedService?._id === s._id ? 'border-accent bg-accent/10' : 'border-gray-700 hover:border-gray-500'}`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold">{s.name}</span>
                                                <span className="text-accent font-semibold">₦{s.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-400">{s.description}</p>
                                        </button>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-4">Select Your Barber</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    {BARBERS.map(b => (
                                        <button
                                            key={b.id}
                                            onClick={() => setSelectedBarber(b)}
                                            className={`p-4 rounded-xl border flex flex-col items-center text-center transition ${selectedBarber?.id === b.id ? 'border-accent bg-accent/10' : 'border-gray-700 hover:border-gray-500'}`}
                                        >
                                            <div className="w-16 h-16 bg-gray-600 rounded-full mb-3 flex items-center justify-center text-xl overflow-hidden">
                                                {b.image ? <img src={b.image} alt={b.name} className="w-full h-full object-cover object-top" /> : '👤'}
                                            </div>
                                            <span className="font-bold">{b.name}</span>
                                            <span className="text-xs text-accent mt-1">{b.tag}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={nextStep} className="bg-accent text-[#111111] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition">Next Step</button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: DATE & TIME */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                                <h3 className="text-xl font-bold mb-4">Select Date</h3>
                                <input
                                    type="date"
                                    min={today}
                                    value={selectedDate}
                                    onChange={(e) => { setSelectedDate(e.target.value); setSelectedTimeSlot(''); setWaitlistMode(false); }}
                                    className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg mb-8 text-white focus:outline-none focus:border-accent"
                                />

                                {selectedDate && (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">Available Times</h3>
                                        {loadingSlots ? (
                                            <div className="text-center text-gray-400 py-8">Loading available slots...</div>
                                        ) : availableSlots.length > 0 ? (
                                            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                                                {availableSlots.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => { setSelectedTimeSlot(time); setWaitlistMode(false); }}
                                                        className={`p-3 rounded-lg border font-semibold transition ${selectedTimeSlot === time ? 'border-accent bg-accent text-[#111111]' : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'}`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-red-500/10 border border-red-500/30 p-6 text-center rounded-xl mb-8">
                                                <p className="text-red-400 font-semibold mb-4">No slots available for this date.</p>
                                                <button onClick={() => { setWaitlistMode(true); nextStep(); }} className="bg-gray-800 text-white px-6 py-2 rounded font-bold hover:bg-gray-700 transition">
                                                    Join Waitlist Instead
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="flex justify-between">
                                    {!isReschedule && <button onClick={prevStep} className="text-gray-400 hover:text-white font-semibold">Back</button>}
                                    <button onClick={nextStep} disabled={!selectedDate || (!selectedTimeSlot && !waitlistMode)} className="bg-accent text-[#111111] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 ml-auto">Next Step</button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: DETAILS & GIFT CARD */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                                <h3 className="text-xl font-bold mb-4">Your Details</h3>
                                <div className="space-y-4 mb-8">
                                    <input type="text" placeholder="Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg focus:outline-none focus:border-accent" required />
                                    <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg focus:outline-none focus:border-accent" required />
                                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg focus:outline-none focus:border-accent" required />
                                </div>

                                {!waitlistMode && !isReschedule && (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">Got a Gift Card?</h3>
                                        <div className="flex gap-2 mb-8">
                                            <input type="text" placeholder="Gift Card Code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} disabled={giftCodeValid} className="w-full bg-[#0b0b0b] border border-gray-700 p-4 rounded-lg focus:outline-none focus:border-accent disabled:opacity-50" />
                                            <button type="button" onClick={handleValidateGiftCard} disabled={giftCodeValid || !giftCode} className="btn bg-gray-800 px-6 rounded-lg font-bold hover:bg-gray-700 disabled:opacity-50">Apply</button>
                                        </div>
                                    </>
                                )}

                                <div className="bg-[#0b0b0b] p-6 rounded-xl border border-gray-800 mb-8 mt-4">
                                    <h4 className="text-gray-400 text-sm mb-4">BOOKING SUMMARY</h4>
                                    <div className="flex justify-between mb-2"><span>Service:</span> <span>{selectedService?.name || 'Manual Selection'}</span></div>
                                    {selectedService?.price && !isReschedule && !waitlistMode && <div className="flex justify-between mb-2"><span>Price:</span> <span>₦{selectedService?.price}</span></div>}
                                    <div className="flex justify-between mb-2"><span>Barber:</span> <span>{selectedBarber?.name || 'Any'}</span></div>
                                    <div className="flex justify-between mb-2"><span>Date:</span> <span>{selectedDate ? new Date(selectedDate).toDateString() : ''}</span></div>
                                    <div className="flex justify-between mb-2"><span>Time:</span> <span className="text-accent font-bold" >{waitlistMode ? 'Waitlist' : selectedTimeSlot}</span></div>
                                    {discount > 0 && <div className="flex justify-between mb-2 text-green-500 font-bold border-t border-gray-700 pt-2"><span>Discount:</span> <span>-₦{discount}</span></div>}
                                </div>

                                <div className="flex justify-between">
                                    <button onClick={prevStep} className="text-gray-400 hover:text-white font-semibold">Back</button>
                                    <button onClick={submitBooking} disabled={submitting} className="bg-accent text-[#111111] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2">
                                        {submitting ? 'Confirming...' : (waitlistMode ? 'Join Waitlist' : 'Confirm Booking')}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 4 && (
                            <motion.div key="step4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                                <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-3xl font-bold mb-4">{waitlistMode ? "You're on the list!" : "Booking Confirmed!"}</h3>
                                <p className="text-gray-400 mb-6">
                                    {waitlistMode ? "We've recorded your details and will reach out if a slot opens up." : "We've sent a confirmation email with details."}
                                    <br />Reference: <strong className="text-accent text-lg">{reference}</strong>
                                </p>
                                <button type="button" onClick={() => window.location.href = "/dashboard"} className="text-accent hover:underline font-bold mt-4 block mx-auto">
                                    View my Dashboard
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Booking;
