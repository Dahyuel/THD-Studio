import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ isReady, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99; // Hold at 99 until ready
        }
        const inc = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + inc, 99);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isReady && progress >= 99) {
      setProgress(100);
    } else if (isReady && progress < 99) {
      setProgress(100);
    }
  }, [isReady, progress]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // Hold at 100% for half a second before sliding up
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center pointer-events-auto"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center">
        <div className="text-[#E2E61D] font-poppins font-black text-7xl md:text-[10rem] mb-8 tracking-tighter leading-none">
          {progress}%
        </div>
        <div className="w-64 h-[2px] bg-white/20 overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-[#E2E61D]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
