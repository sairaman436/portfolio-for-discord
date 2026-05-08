import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import BorderGlow from './BorderGlow';

const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target);
    const incrementTime = (duration * 1000) / end;
    const step = Math.max(1, Math.floor(end / 60));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime * step);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
  { value: '3', suffix: '+', label: 'Years Experience' },
  { value: '10', suffix: '+', label: 'Projects Shipped' },
  { value: '50', suffix: 'K+', label: 'Lines of Code' },
  { value: '99', suffix: '%', label: 'Uptime SLA' },
];

const About = () => {
  return (
    <section className="px-6 md:px-12 bg-[#0B0C0E] relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="max-w-7xl mx-auto">

        {/* Top Row: Heading left + Description right */}
        <div className="flex flex-col md:flex-row" style={{ gap: '3rem', marginBottom: '5rem', alignItems: 'flex-end' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            style={{ flex: 1 }}
          >
            <div className="section-line" />
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#5865F2', marginBottom: '1rem', display: 'block' }}>
              About AXZR
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              Building<br />
              <span className="text-gradient">The Future.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            <p style={{ color: '#B5BAC1', fontWeight: 500, lineHeight: 1.8, fontSize: '1.05rem' }}>
              I craft high-performance digital experiences that push the boundaries of what's possible.
              From low-latency Discord infrastructure to cinematic web interfaces — every line of code
              is engineered for impact.
            </p>
            <p style={{ color: '#949BA4', fontWeight: 500, lineHeight: 1.8, marginTop: '1rem', fontSize: '0.95rem' }}>
              Obsessed with anime aesthetics, clean architecture, and making things that feel
              impossibly smooth.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid: Full width, 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <BorderGlow
                  backgroundColor="rgba(30, 31, 34, 0.3)"
                  borderRadius={16}
                  glowRadius={25}
                  glowIntensity={0.6}
                  edgeSensitivity={25}
                  glowColor="235 70 65"
                  colors={['#5865F2', '#7289DA', '#4752C4']}
                >
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div className="stat-value">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
