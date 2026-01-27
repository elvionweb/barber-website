import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Booking from '../components/Booking'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import Location from '../components/Location'
import WhatsAppButton from '../components/WhatsAppButton'
import Reveal from '../components/Reveal'


const Home = () => {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const bookingRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
    <Navbar scrollToSection={scrollToSection} refs={{
        homeRef,
        aboutRef,
        servicesRef,
        galleryRef,
        testimonialsRef,
        bookingRef,
      }} />

    <section ref={homeRef}>
        <Hero />
      </section>

    <section ref={aboutRef}>
        <About />
      </section>

    <section ref={servicesRef}>
        <Services />
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
    <Reveal>
    <Location />
    </Reveal>
    <Footer />
    <WhatsAppButton />
    </>
  )
}

export default Home