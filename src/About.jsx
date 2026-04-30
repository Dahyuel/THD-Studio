import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

const services = [
  {
    number: '01',
    title: 'Interior Design',
    description:
      'Full-scope residential and commercial interior design — from concept to completion. We craft spaces that reflect your identity.',
    items: ['Space Planning', 'Material Selection', '3D Visualization', 'Mood Boards'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Architecture',
    description:
      'Architectural design that pushes boundaries. Structures that stand as statements of innovation and precision.',
    items: ['Conceptual Design', 'Technical Drawings', 'Building Permits', 'Site Supervision'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M10 21v-4h4v4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Execution',
    description:
      'Flawless on-site execution and project management. We turn designs into reality with meticulous attention to detail.',
    items: ['Project Management', 'Quality Control', 'Turnkey Solutions', 'Contracting'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
      className="group relative flex flex-col border border-black/80 rounded-2xl p-8 hover:bg-black transition-colors duration-500 cursor-default"
    >
      {/* Number + Icon row */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-xs tracking-[0.2em] text-black/30 group-hover:text-white/30 transition-colors duration-500">
          {service.number}
        </span>
        <span className="text-black group-hover:text-[#E2E61D] transition-colors duration-500">
          {service.icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-poppins font-semibold text-xl tracking-tight text-black group-hover:text-white transition-colors duration-500 mb-3">
        {service.title}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-black/25 group-hover:bg-white/25 transition-colors duration-500 mb-4" />

      {/* Description */}
      <p className="font-poppins text-sm text-black/50 group-hover:text-white/50 transition-colors duration-500 leading-relaxed mb-8">
        {service.description}
      </p>

      {/* Services list */}
      <ul className="mt-auto space-y-2">
        {service.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 font-poppins text-xs tracking-wide text-black/70 group-hover:text-white/70 transition-colors duration-500"
          >
            <span className="w-1 h-1 rounded-full bg-black/40 group-hover:bg-white/40 transition-colors duration-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const captionRef = useRef(null);
  const buttonsRef = useRef(null);

  const captionInView = useInView(captionRef, { once: true, margin: '-80px' });
  const buttonsInView = useInView(buttonsRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'center 55%'],
  });

  const words = ['Shaping', 'spaces', 'around', 'your', 'vision.'];
  const step = 1 / words.length;

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full bg-[#E2E61D] relative overflow-hidden flex flex-col items-center justify-center py-24 px-8"
    >
      {/* ── Background Decorations ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.13) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '-1px -1px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full border-[40px] border-black"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          className="absolute -right-24 -bottom-24 w-[350px] h-[350px] rounded-full border-[30px] border-black"
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 right-24 w-3 h-3 bg-black rounded-full opacity-30"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-28 right-40 w-2 h-2 bg-black rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-1/2 left-16 w-2 h-2 bg-black rounded-full opacity-20"
        />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-black/10" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-poppins font-semibold text-black text-center max-w-5xl leading-[1.15] tracking-tight">
          {words.map((word, i) => {
            const start = i * step;
            const end = Math.min(start + step * 1.4, 1);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>

        {/* Caption */}
        <motion.p
          ref={captionRef}
          initial={{ opacity: 0, y: 18 }}
          animate={captionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="text-black/50 text-base md:text-lg text-center max-w-xl mt-8 font-poppins font-semibold leading-relaxed"
        >
          We craft unique spaces that seamlessly blend your vision with timeless design,
          ensuring every detail reflects your personality and aspirations.
        </motion.p>


        {/* ── Service Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 w-full">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}