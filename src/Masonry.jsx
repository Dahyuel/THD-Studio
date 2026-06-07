import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';
import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = async urls => {
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
  await Promise.race([
    Promise.all(
      urls.map(src => new Promise(resolve => {
        const img = new Image();
        img.src = encodeURI(src);
        img.onload = img.onerror = () => resolve();
      }))
    ),
    timeout(4000) // safety: render grid after 4s even if some images are still loading
  ]);
};

// Sub-component for lazy loading grid item images
const GridItem = ({ item, REVEAL_RADIUS, onItemClick, handleItemMouseEnter, handleItemMouseLeave }) => {
  const ref = useRef(null);
  // Start loading image when it is within 400px of the viewport
  const isInView = useInView(ref, { once: true, margin: '400px' });

  return (
    <div
      ref={ref}
      data-key={item.id}
      className="item-wrapper bg-[#111]"
      style={{ '--item-x': `${item.x}px`, '--item-y': `${item.y}px`, borderRadius: '10px' }}
      onClick={() => onItemClick ? onItemClick(item) : null}
      onMouseEnter={(e) => handleItemMouseEnter(item, e)}
      onMouseLeave={() => handleItemMouseLeave(item)}
    >
      {isInView && (
        <>
          {/* Grayscale base layer */}
          <div className="item-img item-img-gray" style={{ backgroundImage: `url('${item.img}')` }} />
          {/* Full-color layer — revealed in a circle around the cursor */}
          <div className="item-img item-img-color" style={{ backgroundImage: `url('${item.img}')`, '--r': `${REVEAL_RADIUS}px` }} />
        </>
      )}
    </div>
  );
};

const REVEAL_RADIUS = 180;

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  gap = 12,
  onItemClick,
  onItemHover,
  onItemHoverEnd,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [3, 3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    // Only preload the first 4 images to get the grid started instantly
    const initialBatch = items.slice(0, 4).map(i => i.img);
    preloadImages(initialBatch).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const totalGapWidth = gap * (columns - 1);          // ← total horizontal gap
    const columnWidth = (width - totalGapWidth) / columns; // ← even column width
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = (columnWidth + gap) * col;              // ← spaced x position
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height + gap;                  // ← vertical gap between rows
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, gap, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        gsap.fromTo(selector,
          { opacity: 0, x: initialPos.x, y: initialPos.y, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...animationProps, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger }
        );
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  // Mouse tracking — direct DOM manipulation, zero re-renders
  const handleMouseMove = useCallback(e => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty('--cx', `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty('--cy', `${e.clientY - rect.top}px`);
  }, [containerRef]);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--cx', '-9999px');
    containerRef.current.style.setProperty('--cy', '-9999px');
  }, [containerRef]);

  const hoverTimerRef = useRef(null);

  const handleItemMouseEnter = useCallback((item, e) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    }
    // Capture the DOM element synchronously before the timeout
    const el = e.currentTarget;
    
    // Start 2s hover timer for tooltip
    if (onItemHover) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        if (el) {
          const rect = el.getBoundingClientRect();
          onItemHover(item, { x: rect.left + rect.width / 2, y: rect.top });
        }
      }, 2000);
    }
  }, [scaleOnHover, hoverScale, onItemHover]);

  const handleItemMouseLeave = useCallback((item) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
    clearTimeout(hoverTimerRef.current);
    if (onItemHoverEnd) onItemHoverEnd();
  }, [scaleOnHover, onItemHoverEnd]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(item => item.y + item.h));
  }, [grid]);

  return (
    <div
      ref={containerRef}
      className="list"
      style={{ height: totalHeight, '--cx': '-9999px', '--cy': '-9999px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {grid.map(item => (
        <GridItem
          key={item.id}
          item={item}
          REVEAL_RADIUS={REVEAL_RADIUS}
          onItemClick={onItemClick}
          handleItemMouseEnter={handleItemMouseEnter}
          handleItemMouseLeave={handleItemMouseLeave}
        />
      ))}
    </div>
  );
};

export default Masonry;
