

const Booking = () => {
  return (
    <section className="overflow-hidden py-10 bg-[#0b0b0b]">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 md:mb-6">
          Book an <span className="text-accent">Appointment</span>
        </h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-500 border border-gray-700"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 rounded bg-gray-500 border border-gray-700"
          />
          <select className="w-full p-3 rounded bg-gray-500 border border-gray-700">
            <option>Select Service</option>
            <option>Classic Haircut</option>
            <option>Fade Cut</option>
            <option>Beard Trim</option>
          </select>
          <input
            type="date"
            className="w-full p-3 rounded bg-gray-500 border border-gray-700"
          />
          <div className="overflow-hidden flex justify-center">
            <button className="bg-accent text-black py-3 px-3 rounded-lg font-semibold hover:opacity-90">
            Confirm Booking
          </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Booking;
