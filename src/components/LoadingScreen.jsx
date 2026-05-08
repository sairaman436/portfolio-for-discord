import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadImages, getFrameUrl, getLowResFrameUrl, TOTAL_FRAMES } from '../utils/preload';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const lowResUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) => getLowResFrameUrl(i + 1));
    const highResUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i + 1));

    // Phase 1: Load low-res frames
    preloadImages(lowResUrls, (p) => {
      setProgress(p);
    }, 100).then(({ images: lowResImages }) => {
      // We resolve after 100 low-res frames to be even faster, 
      // the rest of low-res will continue to fill in.
      window.lowResImages = lowResImages;
      
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      }, 500);

      // Phase 2: Start high-res stream immediately
      // Setting earlyResolveCount to 1 so the array becomes available to the canvas right away
      preloadImages(highResUrls, null, 1).then(({ images: highResImages }) => {
        window.preloadedImages = highResImages;
      });
    });
  }, [onComplete]);

  // SVG circular progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#0B0C0E',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            overflow: 'hidden',
          }}
        >
          {/* Ambient background glow */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(88, 101, 242, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Subtle grid lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(88, 101, 242, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(88, 101, 242, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', position: 'relative', zIndex: 1 }}>

            {/* Circular Progress + Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              style={{ position: 'relative', width: '140px', height: '140px' }}
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', inset: '-8px' }}
              >
                <svg width="156" height="156" viewBox="0 0 156 156" style={{ display: 'block' }}>
                  <circle cx="78" cy="78" r="76" fill="none" stroke="rgba(88, 101, 242, 0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
                </svg>
              </motion.div>

              {/* Circular progress track */}
              <svg width="140" height="140" viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                <motion.circle
                  cx="60" cy="60" r={radius}
                  fill="none"
                  stroke="#5865F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 6px rgba(88, 101, 242, 0.6))' }}
                />
              </svg>

              {/* Center Logo */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #5865F2, #4752C4)',
                  borderRadius: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(88, 101, 242, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L22 20H2L12 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                    <path d="M12 9L17 18H7L12 9Z" fill="rgba(255,255,255,0.3)" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Brand Name + Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <h1 className="text-shimmer" style={{
                fontSize: '2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                AXZR
              </h1>
              <p style={{
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: '#949BA4',
              }}>
                Developer Portfolio
              </p>
            </motion.div>

            {/* Progress Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '2.5rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                background: 'linear-gradient(180deg, #FFFFFF 30%, rgba(88, 101, 242, 0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
              }}>
                {String(progress).padStart(2, '0')}
                <span style={{ fontSize: '1.5rem', opacity: 0.8 }}>%</span>
              </div>
              <p style={{
                fontSize: '9px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#4E5058',
              }}>
                Loading Assets
              </p>
            </motion.div>

          </div>

          {/* Bottom corners — decorative lines */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', width: '30px', height: '30px', borderLeft: '1px solid rgba(88,101,242,0.2)', borderBottom: '1px solid rgba(88,101,242,0.2)' }} />
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '30px', height: '30px', borderRight: '1px solid rgba(88,101,242,0.2)', borderBottom: '1px solid rgba(88,101,242,0.2)' }} />
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', width: '30px', height: '30px', borderLeft: '1px solid rgba(88,101,242,0.2)', borderTop: '1px solid rgba(88,101,242,0.2)' }} />
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '30px', height: '30px', borderRight: '1px solid rgba(88,101,242,0.2)', borderTop: '1px solid rgba(88,101,242,0.2)' }} />

          {/* Bottom Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              fontSize: '8px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              color: '#313338',
            }}
          >
            Engineered by AXZR
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
