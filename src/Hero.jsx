import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    video: '/Interior_with_clouds_drifting_202604302156.mp4',
    videoMobile: '/Living_room_with_clouds_outside_202604302216.mp4',
    subtitle: 'Architectural acoustic solution',
    body: 'We help architects sculpt sound out of space, with bespoke, acoustic solutions.',
  },
  {
    video: '/Living_room_with_clouds_outside_202604302206.mp4',
    videoMobile: '/Living_room_with_clouds_outside_202604302215.mp4',
    subtitle: 'Timeless interior landscapes',
    body: 'Spaces that breathe — where materiality meets the quiet poetry of light and form.',
  },
  {
    video: '/Pool.mp4',
    videoMobile: '', // Add mobile video name here later
    subtitle: 'Tranquil aquatic environments',
    body: 'Blurring the boundaries between interior comfort and outdoor serenity.',
  },
];

export default function Hero({ onVideoReady }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* SVG filter for logo */}
      <svg style={{ height: 0, width: 0, position: 'absolute' }}>
        <filter id="colorize-green">
          <feColorMatrix type="matrix" values="
            0 0 0 0 0.886
            0 0 0 0 0.902
            0 0 0 0 0.114
            0 0 0 1 0"
          />
        </filter>
      </svg>

      <AnimatePresence mode="wait">
        {slides[current].video || slides[current].videoMobile ? (
          <motion.video
            key={`vid-${current}-${isMobile ? 'm' : 'd'}`}
            src={isMobile && slides[current].videoMobile ? slides[current].videoMobile : slides[current].video}
            autoPlay
            muted
            playsInline
            onEnded={next}
            onCanPlayThrough={() => {
              if (onVideoReady) onVideoReady();
            }}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ transform: 'translateZ(0)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        ) : (
          <motion.img
            key={`img-${current}`}
            src={slides[current].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ transform: 'translateZ(0)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      {/* ── NAVBAR ── */}
      <nav className="absolute top-0 left-0 right-0 z-30 hidden md:flex items-center justify-between px-10 pt-8 pb-4 pointer-events-auto">
        {/* Logo + brand */}
        <div className="flex items-center gap-3">
          <img
            src="/modifiedlogo.png"
            alt="THD Studio"
            className="h-8 w-auto"
            style={{ filter: 'url(#colorize-green)' }}
          />
        </div>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-10 font-poppins text-white uppercase">
          {[
            { label: 'Home', href: '#top' },
            { label: 'About us', href: '#about' },
            { label: 'Projects', href: '#gallery' },
            { label: 'Contact', href: '#contact' },
          ].map(({ label, href }) => {
            const isActive = (hoveredNav || 'Home') === label;
            return (
              <li key={label}>
                <a
                  href={href}
                  onMouseEnter={() => setHoveredNav(label)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={
                    label === 'Home'
                      ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                      : undefined
                  }
                  className={`relative group transition-colors duration-300 ${isActive ? 'text-[#E2E61D]' : 'text-white/80 hover:text-white'
                    }`}
                  style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 500 }}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${isActive ? 'w-full bg-[#E2E61D]' : 'w-0 bg-[#E2E61D] group-hover:w-full'
                      }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Search */}
        <div 
          className="flex flex-col gap-1 group relative" 
          style={{ width: '160px' }}
        >
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
              className={`bg-transparent outline-none font-poppins uppercase transition-colors duration-300 w-full 
                ${searchActive ? 'text-[#E2E61D] placeholder:text-[#E2E61D]' : 'text-white/70 placeholder:text-white/70 group-hover:text-white group-hover:placeholder:text-white'}`}
              style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 500 }}
            />
            <svg 
              width="14" height="14" viewBox="0 0 24 24" fill="none" 
              stroke={searchActive ? '#E2E61D' : 'rgba(255,255,255,0.6)'} 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`flex-shrink-0 transition-colors duration-300 ${searchActive ? '' : 'group-hover:stroke-white'}`}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <span className={`block w-full h-px transition-colors duration-300 ${searchActive ? 'bg-[#E2E61D]' : 'bg-white/50 group-hover:bg-white'}`} />
        </div>
      </nav>

      {/* ── BOTTOM CONTENT ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-10 pb-12">

        {/* Left — headline + body */}
        <div className="max-w-xl pointer-events-none">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="block w-10 h-px bg-white/50" />
                <span
                  className="text-white/60 font-poppins uppercase tracking-widest"
                  style={{ fontSize: '0.68rem', fontWeight: 500 }}
                >
                  {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
              </div>

              <h1
                className="leading-[1.08] mb-5"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                <em style={{ color: '#E2E61D', fontWeight: 700, fontStyle: 'italic' }}>
                  {slide.subtitle.split(' ')[0]}
                </em>{' '}
                <span className="text-white">
                  {slide.subtitle.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <div className="flex items-center gap-3 mb-5">
                <span className="block w-14 h-px bg-white/40" />
                <span className="block w-3 h-px bg-white/20" />
              </div>

              <p
                className="text-white/65 font-poppins leading-relaxed"
                style={{ fontSize: '0.9rem', maxWidth: '30ch', fontWeight: 500 }}
              >
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — prev / next arrows */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="flex items-center justify-center rounded-full border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300"
            style={{ width: 44, height: 44 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="flex items-center justify-center rounded-full border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300"
            style={{ width: 44, height: 44 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}