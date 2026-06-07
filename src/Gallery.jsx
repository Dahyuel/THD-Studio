import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Masonry from './Masonry';
import ProjectModal, { ProjectTooltip } from './ProjectModal';
import { galleryItems } from './projectsData';


export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoverState, setHoverState] = useState(null); // { project, position }
  const [activeCategory, setActiveCategory] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = ['All', 'Interior Design', 'Architecture', 'Execution'];

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    setIsTransitioning(true);
    // Add a slight delay before showing the new category to simulate loading
    // and give the browser a moment to process the layout changes.
    setTimeout(() => {
      setActiveCategory(cat);
      setIsTransitioning(false);
    }, 600);
  };

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="w-full bg-black py-16">

      {/* Heading & Filters */}
      <div className="px-8 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-poppins font-semibold leading-[1.15] tracking-tight">
            <span className="block italic text-[#E2E61D] mb-1">Spaces</span>
            <span className="block text-white">We Shape.</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-6 max-w-xl font-poppins font-semibold leading-relaxed">
            We craft unique environments that seamlessly blend your vision with timeless design, ensuring every detail reflects your personality and aspirations.
          </p>
        </div>

        {/* Universal Selector Pill Container */}
        <div className="relative flex md:inline-flex w-full md:w-auto items-center rounded-full border border-white/20 p-1 md:p-1.5 overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              disabled={isTransitioning}
              className={`relative flex-1 md:flex-none whitespace-nowrap rounded-full px-2 sm:px-4 md:px-6 py-2 md:py-2.5 font-poppins text-[0.6rem] sm:text-[0.65rem] md:text-xs tracking-wider uppercase transition-colors duration-300 font-bold z-10 ${
                activeCategory === cat 
                  ? 'text-black' 
                  : 'text-white/60 hover:text-white hover:bg-white/10 scale-95 hover:scale-100'
              } ${isTransitioning ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-[#E2E61D] rounded-full shadow-lg -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <div className="px-8 md:px-16 min-h-[500px] relative">
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center pt-20 z-20"
            >
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-[3px] border-[#E2E61D]/20 border-t-[#E2E61D] rounded-full mb-4"
              />
              <p className="text-white/50 font-poppins text-xs tracking-widest uppercase animate-pulse">Loading gallery</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Masonry
                key={activeCategory} // Forces Masonry to remount and recalculate layout perfectly when filtered
                items={filteredItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.04}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.97}
                blurToFocus={true}
                gap={16}
                onItemClick={(item) => setSelectedProject(item)}
                onItemHover={(item, pos) => setHoverState({ project: item, position: pos })}
                onItemHoverEnd={() => setHoverState(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Tooltip (rendered conditionally when hovered > 2s) */}
      <AnimatePresence>
        {hoverState && (
          <ProjectTooltip 
            project={hoverState.project} 
            position={hoverState.position} 
          />
        )}
      </AnimatePresence>

      {/* Modal Card (rendered conditionally when clicked) */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
