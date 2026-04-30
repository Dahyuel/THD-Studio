import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Masonry from './Masonry';
import ProjectModal, { ProjectTooltip } from './ProjectModal';

// Mock metadata for gallery items
const galleryItems = [
  { 
    id: '1', 
    title: 'The Serene Pavilion',
    location: 'Kyoto, Japan',
    category: 'Architecture',
    description: 'A minimalist wooden pavilion designed to blend seamlessly with its natural surroundings, featuring expansive glass walls that blur the line between indoors and out.',
    tags: ['Minimalist', 'Wood', 'Nature Integration'],
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=750&fit=crop&q=80', 
    url: '#', 
    height: 380 
  },
  { 
    id: '2', 
    title: 'Urban Oasis Penthouse',
    location: 'New York, USA',
    category: 'Interior Design',
    description: 'A luxurious penthouse overlooking the city skyline. The interior features a striking balance of dark marbles, warm brass accents, and custom acoustic paneling.',
    tags: ['Luxury', 'Urban', 'Acoustics'],
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=750&fit=crop&q=80', 
    url: '#', 
    height: 360 
  },
  { id: '3', title: 'Nordic Light Villa', location: 'Oslo, Norway', category: 'Architecture', description: 'Embracing the principles of Scandinavian design, this villa maximizes natural light through strategically placed skylights and a stark, beautiful monochromatic palette.', tags: ['Scandinavian', 'Light', 'Monochrome'], img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=750&fit=crop&q=80', url: '#', height: 400 },
  { id: '4', title: 'Modern Brutalist Home', location: 'São Paulo, Brazil', description: 'Raw concrete meets warm timber in this striking brutalist residence.', category: 'Architecture', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=750&fit=crop&q=80', url: '#', height: 360 },
  { id: '5', title: 'Coastal Retreat', location: 'Malibu, USA', description: 'A seamless indoor-outdoor living experience right on the coast.', category: 'Execution', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=750&fit=crop&q=80', url: '#', height: 420 },
  { id: '6', title: 'Minimalist Loft', location: 'Berlin, Germany', description: 'An industrial loft converted into a sleek, minimalist living space.', category: 'Interior Design', img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&h=750&fit=crop&q=80', url: '#', height: 360 },
  { id: '7', title: 'Desert Courtyard House', location: 'Scottsdale, USA', description: 'Designed around a central courtyard to provide shade and natural cooling.', category: 'Architecture', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=750&fit=crop&q=80', url: '#', height: 380 },
  { id: '8', title: 'Heritage Renovation', location: 'London, UK', description: 'Careful restoration of a Victorian home with a modern glass extension.', category: 'Execution', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=750&fit=crop&q=80', url: '#', height: 360 },
  { id: '9', title: 'Alpine Chalet', location: 'Chamonix, France', description: 'A contemporary take on the traditional alpine chalet using local stone.', category: 'Architecture', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=750&fit=crop&q=80', url: '#', height: 400 },
  { id: '10', title: 'Glass Box Studio', location: 'Tokyo, Japan', description: 'A compact, transparent workspace designed for a local artist.', category: 'Interior Design', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&h=750&fit=crop&q=80', url: '#', height: 360 },
  { id: '11', title: 'Sustainable Eco-Lodge', location: 'Costa Rica', description: 'Off-grid eco-lodge built entirely from sustainable and reclaimed materials.', category: 'Execution', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=750&fit=crop&q=80', url: '#', height: 380 },
  { id: '12', title: 'Zen Garden Home', location: 'Kyoto, Japan', description: 'A residence that frames carefully curated internal zen gardens.', category: 'Architecture', img: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&h=750&fit=crop&q=80', url: '#', height: 360 },
];

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoverState, setHoverState] = useState(null); // { project, position }
  const [activeCategory, setActiveCategory] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = ['All', 'Architecture', 'Interior Design', 'Execution'];

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
              className={`relative flex-1 md:flex-none whitespace-nowrap rounded-full px-1 md:px-6 py-2.5 font-poppins text-[0.5rem] sm:text-[0.55rem] md:text-xs tracking-wider uppercase transition-colors duration-300 font-bold z-10 ${
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
