const Location = () => {
  return (
    <section className="py-10 md:py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 md:mb-6">
          Find <span className="text-accent">Us</span>
        </h2>

        <div className="rounded-xl overflow-hidden border border-gray-800">
          <iframe
            title="EliteCute Location"
            src="https://www.google.com/maps?q=benin%20city%20edo%20state%20nigeria&output=embed"
            className="w-full h-[400px] md:h-[450px]"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Location;
