import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  const [currentImg, setCurrentImg] = useState(0);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll only when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [project]);

  if (!project) return null;

  const images = project.images || [project.img];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 bg-[#111] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-md shadow-2xl border border-white/5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main media */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden">
            <AnimatePresence mode="wait">
              {images[currentImg] && (images[currentImg].endsWith('.mp4') || images[currentImg].endsWith('.webm')) ? (
                <motion.video
                  key={currentImg}
                  src={images[currentImg]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  key={currentImg}
                  src={images[currentImg]}
                  alt={project.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              )}
            </AnimatePresence>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="font-poppins text-xs text-white/70 tracking-wider">
                  {String(currentImg + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
              </div>
            )}

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImg((p) => (p - 1 + images.length) % images.length)}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImg((p) => (p + 1) % images.length)}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 px-4 md:px-8 py-3 md:py-4 overflow-x-auto hide-scrollbar">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`flex-shrink-0 w-16 h-11 md:w-20 md:h-14 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                    i === currentImg ? 'border-[#E2E61D] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  {src && (src.endsWith('.mp4') || src.endsWith('.webm')) ? (
                    <video src={src} className="w-full h-full object-cover" muted playsInline />
                  ) : (
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6 md:px-8 md:py-8 pb-10 md:pb-8">
            {/* Meta (Type) */}
            {project.category && (
              <div className="mb-3">
                <span className="font-poppins text-sm text-[#E2E61D]/80 font-medium tracking-wide uppercase">{project.category}</span>
              </div>
            )}

            {/* Title (Name) */}
            <h3 className="font-poppins font-bold text-white text-2xl md:text-3xl tracking-tight">
              {project.title}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Hover Tooltip ── */
export function ProjectTooltip({ project, position, onClose }) {
  if (!project || !position) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="fixed z-[90] pointer-events-none"
      style={{
        left: position.x,
        top: position.y - 12,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="bg-[#111] border border-white/10 rounded-sm shadow-2xl shadow-black/50 p-4 max-w-[260px]">
        {project.category && (
          <p className="font-poppins text-xs text-[#E2E61D] font-medium tracking-wider uppercase mb-1">
            {project.category}
          </p>
        )}
        <h4 className="font-poppins font-bold text-white text-sm leading-tight">
          {project.title}
        </h4>
      </div>
      {/* Arrow */}
      <div className="flex justify-center">
        <div className="w-2.5 h-2.5 bg-[#111] border-r border-b border-white/10 rotate-45 -mt-1.5" />
      </div>
    </motion.div>
  );
}
