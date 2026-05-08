import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import FrameCanvas from './components/FrameCanvas';
import MarqueeText from './components/MarqueeText';
import About from './components/About';
import TechStack from './components/TechStack';
import Features from './components/Features';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import CustomCursor from './components/CustomCursor';
import Magnetic from './components/Magnetic';
import { SpeedInsights } from "@vercel/speed-insights/react";
import AntiScrape from './components/AntiScrape';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger — single unified tick
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0B0C0E] min-h-screen relative">
      <AntiScrape />
      <div className="noise-overlay" />
      <CustomCursor />

      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          <Navbar />
          <FrameCanvas />

          {/* Spacer */}
          <div style={{ height: '6rem', background: '#0B0C0E' }} />

          {/* Marquee Divider */}
          <MarqueeText />

          {/* Spacer */}
          <div style={{ height: '4rem', background: '#0B0C0E' }} />

          {/* About Section */}
          <About />

          {/* Tech Stack */}
          <TechStack />

          {/* Spacer */}
          <div style={{ height: '4rem', background: '#0B0C0E' }} />

          {/* Marquee Divider 2 */}
          <MarqueeText />

          {/* Spacer */}
          <div style={{ height: '4rem', background: '#0B0C0E' }} />

          {/* Features / Archive */}
          <Features />

          {/* Spacer */}
          <div style={{ height: '6rem', background: '#0B0C0E' }} />

          {/* ═══════════════════════════════════════════
              CONTACT SECTION
              ═══════════════════════════════════════════ */}
          <section id="contact" style={{ padding: '10rem 1.5rem' }} className="bg-[#0B0C0E] relative overflow-hidden md:px-12">
            <div className="max-w-4xl mx-auto" style={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="section-line" style={{ margin: '0 auto 1rem' }} />
                <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#5865F2', marginBottom: '1rem', display: 'block' }}>
                  Get In Touch
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-8">
                  Let's Build<br />
                  <span className="text-gradient">Something Legendary.</span>
                </h2>
                <p style={{ color: '#B5BAC1', fontWeight: 500, lineHeight: 1.8, fontSize: '1.05rem', maxWidth: '32rem', margin: '0 auto 3rem' }}>
                  Whether it's a high-performance Discord bot, a cinematic web experience,
                  or something entirely new — I'm ready to make it happen.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Magnetic>
                    <a href="https://discord.gg/vPfrJpfrRJ" target="_blank" rel="noopener noreferrer" className="btn-premium" style={{ padding: '1.2rem 2.5rem', fontSize: '1rem', textDecoration: 'none' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/></svg>
                      JOIN DISCORD
                    </a>
                  </Magnetic>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              FOOTER
              ═══════════════════════════════════════════ */}
          <footer className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '6rem 1.5rem 3rem' }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="footer-watermark">AXZR</span>
            </div>

            <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <div className="flex items-center gap-3">
                  <div style={{ width: '2rem', height: '2rem', background: '#5865F2', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L22 20H2L12 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                      <path d="M12 9L17 18H7L12 9Z" fill="rgba(255,255,255,0.3)" />
                    </svg>
                  </div>
                  <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: 'white', fontSize: '0.9rem' }}>
                    AXZR | Portfolio
                  </span>
                </div>

                <Magnetic>
                  <button className="back-to-top" onClick={scrollToTop}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                </Magnetic>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div style={{ color: '#4E5058', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  © {new Date().getFullYear()} AXZR. All rights reserved.
                </div>
                <div style={{ color: '#4E5058', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Engineered with obsession.
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
      <SpeedInsights />
    </main>
  );
}

export default App;
