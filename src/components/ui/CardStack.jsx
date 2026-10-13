import React, { createContext, useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CardStackContext = createContext(null);

export function CardStack({
  children,
  totalCards,
  scaleMultiplier = 0.04,
  className = '',
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <CardStackContext.Provider
      value={{
        progress: scrollYProgress,
        scaleMultiplier,
        totalCards: Math.max(totalCards, 1),
      }}
    >
      <div ref={containerRef} className={`card-stack-container ${className}`}>
        {children}
      </div>
    </CardStackContext.Provider>
  );
}

export function CardStackItem({
  children,
  index,
  totalCards,
  topOffset = 28,
  className = '',
  accentGlow = 'rgba(249, 69, 45, 0.15)',
}) {
  const context = useContext(CardStackContext);
  const effectiveTotal = context?.totalCards ?? totalCards ?? 3;
  const progress = context?.progress;
  const multiplier = context?.scaleMultiplier ?? 0.04;

  // The card scales down when subsequent cards scroll in over it
  // Index 0 scales down the most, the last index stays at 1
  const scaleTo = 1 - (effectiveTotal - 1 - index) * multiplier;
  const startProgress = Math.max(0, (index) / effectiveTotal);

  const scale = progress
    ? useTransform(progress, [startProgress, 1], [1, scaleTo])
    : 1;

  // Slight brightness dimming as cards stack underneath
  const brightnessTo = 1 - (effectiveTotal - 1 - index) * 0.08;
  const brightness = progress
    ? useTransform(progress, [startProgress, 1], [1, Math.max(0.78, brightnessTo)])
    : 1;

  // Responsive sticky top position
  const stickyTop = `calc(var(--header-height, 72px) + 1rem + ${index * topOffset}px)`;

  return (
    <motion.div
      className={`card-stack-item ${className}`}
      style={{
        position: 'sticky',
        top: stickyTop,
        scale,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        zIndex: index + 5,
        transformOrigin: 'top center',
        willChange: 'transform, filter',
      }}
    >
      <div className="card-stack-glow" style={{ background: accentGlow }} />
      {children}
    </motion.div>
  );
}
