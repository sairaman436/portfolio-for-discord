import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Archive', href: '#archive' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center glass"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5865F2] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(88,101,242,0.2)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L22 20H2L12 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
              <path d="M12 9L17 18H7L12 9Z" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-white">AXZR</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Desktop CTA */}
          <div className="hidden-block md:block">
            <Magnetic>
              <a href="https://discord.gg/vPfrJpfrRJ" target="_blank" rel="noopener noreferrer" className="btn-premium" style={{ textDecoration: 'none' }}>
                GET IN TOUCH
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 101,
            }}
            className="md:hidden-hamburger"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ width: '24px', height: '2px', background: 'white', display: 'block', borderRadius: '1px' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ width: '24px', height: '2px', background: 'white', display: 'block', borderRadius: '1px' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ width: '24px', height: '2px', background: 'white', display: 'block', borderRadius: '1px' }}
            />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div className="scroll-progress-container">
          <motion.div className="scroll-progress-bar" style={{ scaleX }} />
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(11, 12, 14, 0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                whileHover={{ color: '#5865F2' }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <a href="https://discord.gg/vPfrJpfrRJ" target="_blank" rel="noopener noreferrer" className="btn-premium" onClick={() => setMenuOpen(false)} style={{ padding: '1rem 2rem', textDecoration: 'none' }}>
                GET IN TOUCH
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
