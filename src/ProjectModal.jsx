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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 bg-[#111] max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <AnimatePresence mode="wait">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImg((p) => (p + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 px-8 py-4 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`flex-shrink-0 w-20 h-14 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                    i === currentImg ? 'border-[#E2E61D] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="px-8 py-8">
            {/* Location + category */}
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-4 h-4 text-[#E2E61D]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-poppins text-sm text-white/50 font-medium">{project.location}</span>
              {project.category && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-poppins text-sm text-white/50 font-medium">{project.category}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="font-poppins font-bold text-white text-2xl md:text-3xl tracking-tight mb-4">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-poppins text-white/50 text-base leading-relaxed max-w-2xl">
              {project.description}
            </p>

            {/* Tags */}
            {project.tags && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-poppins text-xs tracking-wider uppercase text-[#E2E61D]/70 border border-[#E2E61D]/20 rounded-full px-4 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
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
        <p className="font-poppins text-xs text-[#E2E61D] font-medium tracking-wider uppercase mb-1">
          {project.location}
        </p>
        <h4 className="font-poppins font-bold text-white text-sm mb-1.5 leading-tight">
          {project.title}
        </h4>
        <p className="font-poppins text-xs text-white/40 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        {project.category && (
          <span className="inline-block mt-2 font-poppins text-[0.6rem] text-white/30 uppercase tracking-widest">
            {project.category}
          </span>
        )}
      </div>
      {/* Arrow */}
      <div className="flex justify-center">
        <div className="w-2.5 h-2.5 bg-[#111] border-r border-b border-white/10 rotate-45 -mt-1.5" />
      </div>
    </motion.div>
  );
}
