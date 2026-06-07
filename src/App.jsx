import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './Hero'
import About from './About'
import Gallery from './Gallery'
import Contact from './Contact'
import Footer from './Footer'
import StaggeredMenu from './StaggeredMenu'
import Preloader from './Preloader'

function App() {
  const [showStickyMenu, setShowStickyMenu] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'dark' means black background (yellow icons), 'light' means yellow background (black icons)
  const [videoReady, setVideoReady] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const handleScrollAndResize = () => {
      // Show sticky menu if we've scrolled past 90vh OR if it's a mobile screen
      const isMobile = window.innerWidth < 768;
      if (isMobile || window.scrollY > window.innerHeight * 0.9) {
        setShowStickyMenu(true);
      } else {
        setShowStickyMenu(false);
      }

      // Check if we are over a yellow-background section (About or Contact)
      const aboutSection = document.getElementById('about');
      const contactSection = document.getElementById('contact');
      const checkY = 100;
      const isOverAbout = aboutSection && aboutSection.getBoundingClientRect().top <= checkY && aboutSection.getBoundingClientRect().bottom >= checkY;
      const isOverContact = contactSection && contactSection.getBoundingClientRect().top <= checkY && contactSection.getBoundingClientRect().bottom >= checkY;

      setTheme((isOverAbout || isOverContact) ? 'light' : 'dark');
    };

    handleScrollAndResize(); // Initial check
    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);
    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, []);

  return (
    <div className="w-full bg-black min-h-screen relative">
      <AnimatePresence>
        {!loadingComplete && (
          <Preloader 
            isReady={videoReady} 
            onComplete={() => setLoadingComplete(true)} 
          />
        )}
      </AnimatePresence>

      <Hero onVideoReady={() => setVideoReady(true)} />
      <About />
      <Gallery />
      <Contact />
      <Footer />

      {/* Sticky Navbar that fades in after Hero */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-500 pointer-events-none ${showStickyMenu ? 'opacity-100' : 'opacity-0'}`}
      >
        <StaggeredMenu 
          isFixed={true}
          theme={theme}
          position="right"
          items={[
            { label: 'Home', ariaLabel: 'Go to home page', link: '#top' },
            { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
            { label: 'Projects', ariaLabel: 'View our projects', link: '#gallery' },
            { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
          ]}
          socialItems={[
            { label: 'LinkedIn', link: 'https://www.linkedin.com/company/64627923' },
            { label: 'Instagram', link: 'https://www.instagram.com/thdstudio.eg/' },
            { label: 'Facebook', link: 'https://www.facebook.com/profile.php?id=100064107966174' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          logoUrl="/modifiedlogo.png"
        />
      </div>
    </div>
  )
}

export default App
