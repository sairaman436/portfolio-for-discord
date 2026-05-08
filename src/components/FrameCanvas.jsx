import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShinyText from './ShinyText';

gsap.registerPlugin(ScrollTrigger);

const FrameCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const connectRef = useRef(null);
  const bigAxzrRef = useRef(null);
  const counterRef = useRef(null);
  const letterboxTopRef = useRef(null);
  const letterboxBottomRef = useRef(null);
  const lastFrameRef = useRef(-1);
  const lastOpacityRef = useRef(-1);
  const drawParamsRef = useRef({ offsetX: 0, offsetY: 0, drawWidth: 0, drawHeight: 0 });
  const rafIdRef = useRef(null);
  const pendingRenderRef = useRef(null);

  useEffect(() => {
    const images = window.preloadedImages;
    if (!images || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });

    // Disable image smoothing for faster draws
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'low';

    const recalcDrawParams = (img) => {
      if (!img) return;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let dw, dh, ox, oy;

      if (canvasRatio > imgRatio) {
        dw = canvas.width;
        dh = canvas.width / imgRatio;
        ox = 0;
        oy = (canvas.height - dh) / 2;
      } else {
        dh = canvas.height;
        dw = canvas.height * imgRatio;
        ox = (canvas.width - dw) / 2;
        oy = 0;
      }
      drawParamsRef.current = { offsetX: ox, offsetY: oy, drawWidth: dw, drawHeight: dh };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgs = window.preloadedImages;
      if (imgs && imgs[0]) {
        recalcDrawParams(imgs[0]);
      }

      // Force redraw after resize
      lastFrameRef.current = -1;
      lastOpacityRef.current = -1;
      render(Math.floor(obj.frame), obj.opacity);
    };

    const obj = { frame: 0, opacity: 1 };
    const frameCount = images.length;

    const render = (index, opacity) => {
      // Skip if nothing changed
      if (index === lastFrameRef.current && opacity === lastOpacityRef.current) return;
      lastFrameRef.current = index;
      lastOpacityRef.current = opacity;

      const clampedIndex = Math.max(0, Math.min(index, frameCount - 1));
      const img = images[clampedIndex];
      if (!img) return;

      const { offsetX, offsetY, drawWidth, drawHeight } = drawParamsRef.current;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Apply filters via canvas context (GPU-composited, no DOM repaint)
      const progress = clampedIndex / (frameCount - 1);
      const grayscalePercent = Math.max(0, 100 - (progress * 200));
      const contrast = 100 + progress * 15;

      context.save();
      context.globalAlpha = opacity;
      context.filter = `grayscale(${grayscalePercent}%) contrast(${contrast}%)`;
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      context.restore();

      // Update scroll counter
      if (counterRef.current) {
        const pct = Math.round(progress * 100);
        counterRef.current.textContent = `${String(pct).padStart(3, '0')}%`;
      }
    };

    // Batched render — coalesces multiple scroll ticks into one paint
    const scheduleRender = (frameIndex, opacity) => {
      pendingRenderRef.current = { frameIndex, opacity };
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          if (pendingRenderRef.current) {
            render(pendingRenderRef.current.frameIndex, pendingRenderRef.current.opacity);
            pendingRenderRef.current = null;
          }
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // AXZR identity fades out first
    tl.to(bigAxzrRef.current, {
      opacity: 0,
      scale: 1.2,
      filter: "blur(20px)",
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Letterbox bars shrink as video starts
    tl.to(letterboxTopRef.current, { height: '0%', duration: 1.5, ease: "power2.inOut" }, 0.5);
    tl.to(letterboxBottomRef.current, { height: '0%', duration: 1.5, ease: "power2.inOut" }, 0.5);

    // Frame scrubbing — render directly, no extra rAF wrapper
    tl.to(obj, {
      frame: frameCount - 1,
      opacity: 0.15,
      onUpdate: () => {
        const frameIndex = Math.floor(obj.frame);
        scheduleRender(frameIndex, obj.opacity);
      },
      duration: 5,
      ease: "none"
    }, 1);

    // CONNECT WITH ME fades in at the end
    tl.fromTo(connectRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      4
    );

    // Floating fragments fade in and move
    gsap.fromTo(".floating-fragment",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -10%",
          end: "top -30%",
          scrub: true,
        }
      }
    );

    gsap.to(".fragment-1", { y: -300, scrollTrigger: { scrub: 1 } });
    gsap.to(".fragment-2", { y: -500, scrollTrigger: { scrub: 1.5 } });
    gsap.to(".fragment-3", { y: -200, scrollTrigger: { scrub: 0.8 } });

    // Reticle brackets pulse
    gsap.to(".reticle", {
      borderColor: "rgba(88, 101, 242, 0.8)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    render(0, 1);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0B0C0E]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
        style={{ willChange: 'contents', backfaceVisibility: 'hidden' }} 
      />

      {/* Cinematic Overlays */}
      <div className="vignette-overlay" />
      <div className="scanline-overlay" />

      {/* Letterbox Bars */}
      <div ref={letterboxTopRef} className="letterbox-bar letterbox-top" style={{ height: '12%' }} />
      <div ref={letterboxBottomRef} className="letterbox-bar letterbox-bottom" style={{ height: '12%' }} />

      {/* Anime Reticle Brackets */}
      <div className="reticle reticle-tl" />
      <div className="reticle reticle-tr" />
      <div className="reticle reticle-bl" />
      <div className="reticle reticle-br" />

      {/* Scroll Counter */}
      <div ref={counterRef} className="scroll-counter">000%</div>

      {/* Anime HUD Parallax Fragments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="fragment-1 floating-fragment" style={{ top: '25%', left: '12%' }}>
          <div className="code-snippet" style={{ borderLeftColor: '#5865F2', color: '#5865F2', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
            <span style={{ opacity: 0.4 }}>SYSTEM://</span> DEPLOY_AXZR <br/>
            <span style={{ opacity: 0.4 }}>STATUS://</span> INITIALIZING_AUDIO
          </div>
        </div>
        <div className="fragment-2 floating-fragment" style={{ top: '55%', right: '15%' }}>
          <div className="status-fragment glass">
            <div className="status-dot" style={{ animation: 'pulse 2s ease infinite', boxShadow: '0 0 10px #23A55A' }} />
            NEURAL_LINK_STABLE
          </div>
        </div>
        <div className="fragment-3 floating-fragment" style={{ bottom: '25%', left: '18%' }}>
          <div className="code-snippet" style={{ borderLeftColor: 'white', color: 'white', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
            <span style={{ opacity: 0.4 }}>VIBE://</span> ANIME_AESTHETIC <br/>
            <span style={{ opacity: 0.4 }}>FREQ://</span> 44.1KHZ_MASTER
          </div>
        </div>
      </div>

      {/* Opening: Big AXZR */}
      <div ref={bigAxzrRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 7 }}>
        <h1 className="text-huge font-black uppercase tracking-tighter leading-none">
          <ShinyText
            text="AXZR"
            speed={3}
            delay={1}
            color="#ffffff"
            shineColor="#5865F2"
            spread={120}
            direction="left"
            yoyo={true}
          />
        </h1>
      </div>

      {/* Overlay: CONNECT WITH ME */}
      <div ref={connectRef} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0" style={{ zIndex: 7 }}>
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-center px-6">
          <ShinyText
            text="CONNECT WITH ME"
            speed={2.5}
            delay={0.5}
            color="#ffffff"
            shineColor="#5865F2"
            spread={100}
            direction="left"
            yoyo={true}
          />
        </h2>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2" style={{ transform: 'translateX(-50%)', zIndex: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(88,101,242,0.5)' }}>Scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, #5865F2, transparent)' }} />
      </div>
    </div>
  );
};

export default FrameCanvas;
