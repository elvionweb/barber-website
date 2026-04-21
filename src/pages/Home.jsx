import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Barbers from '../components/Barbers'
import Gallery from '../components/Gallery'
import Booking from '../components/Booking'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import Location from '../components/Location'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'


const Home = () => {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const barbersRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const bookingRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
    <SEO
      title="EliteCuts Barbershop — Benin City, Edo State"
      description="Premium barbering services in Benin City. Book online for precision cuts, fades, beard trims and more."
      keywords="barber benin city, haircut edo state, EliteCuts, men grooming nigeria"
    />
    <Navbar scrollToSection={scrollToSection} refs={{
        homeRef,
        aboutRef,
        servicesRef,
        barbersRef,
        galleryRef,
        testimonialsRef,
        bookingRef,
        contactRef,
      }} />

    <section ref={homeRef}>
        <Hero scrollToSection={scrollToSection} bookingRef={bookingRef} servicesRef={servicesRef} />
      </section>

    <section ref={aboutRef}>
        <About />
      </section>

    <section ref={servicesRef}>
        <Services />
      </section>

    <section ref={barbersRef}>
        <Barbers barbersRef={barbersRef} />
      </section>

    <section ref={galleryRef}>
        <Gallery />
      </section>

    <section ref={testimonialsRef}>
        <Testimonials />
      </section>

    <section ref={bookingRef}>
        <Booking />
      </section>
    <div ref={contactRef}>
      <Reveal>
        <Location />
      </Reveal>
      <Footer />
    </div>
    </>
  )
}

export default Home