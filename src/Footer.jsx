import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const fade = (delay = 0) =>
    inView
      ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
      }
      : { initial: { opacity: 0, y: 20 } };

  return (
    <footer ref={ref} className="w-full bg-black relative overflow-hidden">

      {/* ── Top divider ── */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-10">

        {/* Big CTA headline */}
        <motion.div {...fade(0)} className="mb-20">
          <p className="font-poppins text-sm text-[#E2E61D] font-normal mb-6">
            Ready to collaborate?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-end gap-6"
          >
            <h3
              className="font-poppins font-bold text-white leading-[1.05] tracking-tight hover:text-[#E2E61D] transition-colors duration-500"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
            >
              Let's talk
            </h3>
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-[#E2E61D] mb-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="10 5 19 5 19 14" />
            </svg>
          </a>
        </motion.div>

        {/* ── Links grid ── */}
        <motion.div
          {...fade(0.15)}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20"
        >
          {/* Navigation */}
          <div>
            <p className="font-poppins text-sm text-[#E2E61D] font-normal mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#top' },
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#gallery' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-poppins text-sm font-light text-white/40 hover:text-white transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <p className="font-poppins text-sm text-[#E2E61D] font-normal mb-5">
              Services
            </p>
            <nav className="flex flex-col gap-3">
              {['Interior Design', 'Acoustic Solutions', 'Architecture', 'Consultation'].map(
                (s) => (
                  <span
                    key={s}
                    className="font-poppins text-sm font-light text-white/40"
                  >
                    {s}
                  </span>
                )
              )}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="font-poppins text-sm text-[#E2E61D] font-normal mb-5">
              Social
            </p>
            <nav className="flex flex-col gap-3">
              {['LinkedIn', 'Instagram', 'Facebook'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-poppins text-sm font-light text-white/40 hover:text-white transition-colors duration-300"
                >
                  {s}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-poppins text-sm text-[#E2E61D] font-normal mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@thd.com"
                className="font-poppins text-sm font-light text-white/40 hover:text-white transition-colors duration-300"
              >
                hello@thd.com
              </a>
              <a
                href="tel:+201234567890"
                className="font-poppins text-sm font-light text-white/40 hover:text-white transition-colors duration-300"
              >
                +20 123 456 7890
              </a>
              <span className="font-poppins text-sm text-white/40">
                Cairo, Egypt
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div {...fade(0.3)}>
          <div className="w-full h-px bg-white/[0.06] mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <img
                src="/modifiedlogo.png"
                alt="THD Studio"
                className="h-6 w-auto opacity-60"
              />
            </div>

            {/* Copyright */}
            <p className="font-poppins text-[0.6rem] tracking-[0.15em] text-white/20">
              © {new Date().getFullYear()} THD Studio — All rights reserved
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}