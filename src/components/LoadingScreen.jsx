import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadImages, getFrameUrl, TOTAL_FRAMES } from '../utils/preload';
import Lottie from 'react-lottie-player';
import loadingAnimation from '../assets/loading-animation.json';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const readyToExit = useRef(false);

  useEffect(() => {
    // Generate original sequential URLs
    const allUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) => ({
      url: getFrameUrl(i + 1),
      index: i
    }));

    const priority1 = allUrls.filter(item => item.index % 20 === 0 || item.index === TOTAL_FRAMES - 1);
    const priority2 = allUrls.filter(item => item.index % 5 === 0 && item.index % 20 !== 0);
    const remaining = allUrls.filter(item => item.index % 5 !== 0);
    
    const reorderedUrls = [...priority1, ...priority2, ...remaining];
    window.preloadedImages = new Array(TOTAL_FRAMES);
    
    preloadImages(reorderedUrls, (p, count, img, index) => {
      setProgress(p);
      if (img) window.preloadedImages[index] = img;
    }, 60).then(() => { 
      setIsPreloaded(true);
      readyToExit.current = true;
    });
  }, []);

  const triggerExit = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800);
  };

  // Handle Lottie loop completion
  const handleLoopComplete = () => {
    if (readyToExit.current) {
      triggerExit();
    }
  };

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
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(88, 101, 242, 0.12) 0%, transparent 70%)',
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

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', position: 'relative', zIndex: 1 }}>

            {/* Lottie Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              style={{ position: 'relative', width: '300px', height: '300px' }}
            >
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                play={true}
                onLoopComplete={handleLoopComplete}
                style={{ width: '100%', height: '100%' }}
              />
              
              {/* Circular progress track (around the animation) */}
              <svg width="300" height="300" viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)', pointerEvents: 'none' }}>
                <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                <motion.circle
                  cx="60" cy="60" r="58"
                  fill="none"
                  stroke="#5865F2"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 58 - (progress / 100) * (2 * Math.PI * 58) }}
                  transition={{ duration: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(88, 101, 242, 0.4))' }}
                />
              </svg>
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
