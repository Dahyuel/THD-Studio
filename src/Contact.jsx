import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// ── Shared Word component (same as About) ──
const Word = ({ children, progress, range, italic, startOpacity = 0.15 }) => {
  const opacity = useTransform(progress, range, [startOpacity, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.25em] ${italic ? 'italic' : ''}`}
    >
      {children}
    </motion.span>
  );
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-100px' });

  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: '',
    message: '',
  });

  // ── Scroll progress for heading word reveal (same offset as About) ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'center 55%'],
  });

  // "Let's start your next project" — 5 words
  const line1 = ["Let's", 'start', 'your'];
  const line2 = ['next', 'project'];
  const allWords = [...line1, ...line2];
  const step = 1 / allWords.length;

  const wordRange = (i) => {
    const start = i * step;
    const end = Math.min(start + step * 1.4, 1);
    return [start, end];
  };

  const anim = (delay) =>
    formInView ? fadeUp(delay) : { initial: { opacity: 0, y: 40 } };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-[#E2E61D] relative overflow-hidden"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full border-[40px] border-black"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.03, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute right-20 bottom-20 text-[15rem] font-black leading-none select-none text-black"
        >
          04
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">


        {/* ── Heading with scroll-driven word reveal ── */}
        <h2
          className="font-poppins font-semibold text-black leading-[1.15] tracking-tight mb-4"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
        >
          {/* Line 1: italic, animates in at full opacity */}
          <span className="block">
            {line1.map((word, i) => (
              <Word key={word} progress={scrollYProgress} range={wordRange(i)} italic startOpacity={1}>
                {word}
              </Word>
            ))}
          </span>

          {/* Line 2: normal, scroll-driven fade from low opacity */}
          <span className="block">
            {line2.map((word, i) => (
              <Word key={word} progress={scrollYProgress} range={wordRange(line1.length + i)}>
                {word}
              </Word>
            ))}
          </span>
        </h2>

        <motion.p
          {...anim(0.15)}
          className="font-poppins text-base md:text-lg text-black/70 font-semibold max-w-xl mb-20 leading-relaxed"
        >
          Have a space that needs transforming? We'd love to hear about it.
          Drop us a line and let's create something extraordinary together.
        </motion.p>

        {/* Main content grid */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0 min-h-[700px]">

          {/* ── Left: Info ── */}
          <div className="lg:col-span-5 relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '-1px -1px',
              }}
            />

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 right-10 w-3 h-3 bg-black rounded-full opacity-40" />
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-32 right-20 w-2 h-2 bg-black rounded-full opacity-30" />

            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <motion.div {...anim(0.2)} className="space-y-8">
                {[
                  {
                    label: 'Location', value: 'Cairo, Egypt', sub: 'New Cairo District',
                    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
                  },
                  {
                    label: 'Email', value: 'hello@thd.com', href: 'mailto:hello@thd.com',
                    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
                  },
                  {
                    label: 'Phone', value: '+20 123 456 7890', href: 'tel:+201234567890',
                    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
                  },
                  {
                    label: 'Hours', value: 'Mon – Fri', sub: '9:00 AM – 6:00 PM',
                    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
                  },
                ].map(({ label, value, sub, href, icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="group flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-black/5 transition-colors duration-300 cursor-default"
                  >
                    <div className="mt-1 text-black/40 group-hover:text-black/70 transition-colors duration-300">{icon}</div>
                    <div>
                      <p className="font-poppins text-sm text-black/60 font-semibold mb-1.5">{label}</p>
                      {href ? (
                        <a href={href} className="font-poppins text-lg md:text-xl text-black font-bold hover:text-black/60 transition-colors duration-300 block">{value}</a>
                      ) : (
                        <>
                          <p className="font-poppins text-lg md:text-xl text-black font-bold">{value}</p>
                          {sub && <p className="font-poppins text-sm text-black/50 font-semibold mt-0.5">{sub}</p>}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-7 relative">
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-black/10" />
            <motion.div {...anim(0.25)} className="lg:pl-16 h-full">
              <form noValidate className="space-y-8 h-full flex flex-col justify-center">

                <div className="grid grid-cols-2 gap-8">
                  {['firstName', 'lastName'].map((field) => (
                    <div key={field} className="relative group">
                      <label className="block font-poppins text-sm text-black/60 font-semibold mb-2 transition-colors duration-300 group-focus-within:text-black">
                        {field === 'firstName' ? 'First Name' : 'Last Name'}
                      </label>
                      <input
                        name={field} type="text" value={formData[field]} onChange={handleChange}
                        onFocus={() => setFocusedField(field)} onBlur={() => setFocusedField(null)}
                        placeholder={field === 'firstName' ? 'Ahmed' : 'Hassan'}
                        className="w-full bg-transparent border-b-[2.5px] border-black/15 text-black font-poppins text-base font-bold py-3 outline-none focus:border-black transition-all duration-300 placeholder:text-black/20 placeholder:font-semibold"
                      />
                      <motion.div className="absolute bottom-0 left-0 h-[2.5px] bg-black"
                        initial={{ width: '0%' }} animate={{ width: focusedField === field ? '100%' : '0%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }} />
                    </div>
                  ))}
                </div>

                <div className="relative group">
                  <label className="block font-poppins text-sm text-black/60 font-semibold mb-2 transition-colors duration-300 group-focus-within:text-black">Email Address</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-b-[2.5px] border-black/15 text-black font-poppins text-base font-bold py-3 outline-none focus:border-black transition-all duration-300 placeholder:text-black/20 placeholder:font-semibold"
                  />
                  <motion.div className="absolute bottom-0 left-0 h-[2.5px] bg-black"
                    initial={{ width: '0%' }} animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }} />
                </div>

                <div className="relative group">
                  <label className="block font-poppins text-sm text-black/60 font-semibold mb-2 transition-colors duration-300 group-focus-within:text-black">Project Type</label>
                  <div className="relative">
                    <select name="projectType" value={formData.projectType} onChange={handleChange}
                      onFocus={() => setFocusedField('projectType')} onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b-[2.5px] border-black/15 text-black font-poppins text-base font-bold py-3 outline-none focus:border-black transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-black/40 font-semibold">Select a category</option>
                      <option value="residential" className="text-black font-bold">Residential Interior</option>
                      <option value="commercial" className="text-black font-bold">Commercial Space</option>
                      <option value="acoustic" className="text-black font-bold">Acoustic Design</option>
                      <option value="architecture" className="text-black font-bold">Full Architecture</option>
                      <option value="consultation" className="text-black font-bold">Consultation Only</option>
                    </select>
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none"
                      fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <motion.div className="absolute bottom-0 left-0 h-[2.5px] bg-black"
                    initial={{ width: '0%' }} animate={{ width: focusedField === 'projectType' ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }} />
                </div>

                <div className="relative group flex-grow">
                  <label className="block font-poppins text-sm text-black/60 font-semibold mb-2 transition-colors duration-300 group-focus-within:text-black">Message</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your space, timeline, and vision…"
                    className="w-full bg-transparent border-b-[2.5px] border-black/15 text-black font-poppins text-base font-bold py-3 outline-none focus:border-black transition-all duration-300 resize-none placeholder:text-black/20 placeholder:font-semibold"
                    style={{ boxShadow: 'none' }}
                  />
                  <motion.div className="absolute bottom-0 left-0 h-[2.5px] bg-black"
                    initial={{ width: '0%' }} animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }} />
                </div>

                <div className="flex items-end justify-between pt-6">
                  <button type="submit"
                    className="group flex items-center gap-3 bg-black text-[#E2E61D] font-poppins text-[0.65rem] tracking-[0.2em] uppercase font-bold rounded-full px-10 py-4 hover:scale-105 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
                  >
                    Send Enquiry
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5" /><polyline points="10 5 19 5 19 14" />
                    </svg>
                  </button>

                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}