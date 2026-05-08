import React from 'react';
import { motion } from 'framer-motion';

const techIcons = {
  React: (
    <svg viewBox="0 0 24 24" fill="#61DAFB" width="28" height="28">
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="#68A063" width="28" height="28">
      <path d="M12 1.85l9.5 5.5v11l-9.5 5.5-9.5-5.5v-11l9.5-5.5zm0 1.15L3.5 8.15v7.7L12 21l8.5-5.15v-7.7L12 3z"/>
      <path d="M12 7v10l-4.5-2.5V9.5L12 7z" opacity="0.6"/>
    </svg>
  ),
  'Discord.js': (
    <svg viewBox="0 0 24 24" fill="#5865F2" width="28" height="28">
      <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.618-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.099.246.198.373.291a.077.077 0 01-.006.128 12.3 12.3 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.031-.056c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 00-.031-.028z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="#F7DF1E" width="28" height="28">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <text x="7" y="18" fontSize="12" fontWeight="bold" fill="#000">JS</text>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="#3178C6" width="28" height="28">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <text x="7" y="18" fontSize="12" fontWeight="bold" fill="#fff">TS</text>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="#47A248" width="28" height="28">
      <path d="M12 2C8.5 2 6 5.5 6 10c0 4 2.5 8 5.5 11.5.2.2.5.5.5.5s.3-.3.5-.5C15.5 18 18 14 18 10c0-4.5-2.5-8-6-8zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
    </svg>
  ),
  FFmpeg: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="#5cb85c" strokeWidth="1.5"/>
      <polygon points="9,7 17,12 9,17" fill="#5cb85c"/>
    </svg>
  ),
  GSAP: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#88CE02" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-6" stroke="#88CE02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'HTML/CSS': (
    <svg viewBox="0 0 24 24" fill="#E34F26" width="28" height="28">
      <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4zm13.5 5H8.3l.2 2.5h8.8l-.7 7.5L12 18.5l-4.6-1.5-.3-3.5h2.4l.2 1.8 2.3.6 2.3-.6.3-2.8H7.5L6.8 5h10.4l-.2 2z"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="#F05032" width="28" height="28">
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.06l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.06V8.74a1.838 1.838 0 01-.998-2.41L7.636 3.6.454 10.78a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.426-10.43a1.55 1.55 0 000-2.187z"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <path d="M12 2c-1.7 0-3.2.2-4.4.6C5.5 3.3 5 4.5 5 6v2h7v1H5H3.5c-1.5 0-2.8 1-3.2 2.8-.5 2.1-.5 3.4 0 5.5C.7 19 1.7 20 3.2 20H5v-2.5c0-1.7 1.4-3.2 3.2-3.2h6.5c1.4 0 2.5-1.2 2.5-2.5V6c0-1.4-1.2-2.4-2.5-2.7C13.6 2.2 12.8 2 12 2zm-3.5 2.4c.5 0 1 .4 1 1s-.4 1-1 1-.9-.4-.9-1 .4-1 .9-1z" fill="#3776AB"/>
      <path d="M19 6.5v2.3c0 1.8-1.5 3.3-3.2 3.3h-6.5c-1.4 0-2.5 1.1-2.5 2.5v4.7c0 1.4 1.2 2.2 2.5 2.5 1.6.4 3.1.5 5 0 1.2-.3 2.5-1 2.5-2.5V18h-5v-1h7.5c1.5 0 2-1 2.5-2.5.5-1.6.5-3.1 0-5.5-.4-1.7-1.1-2.5-2.5-2.5H19zm-3.5 11.1c.5 0 1 .4 1 1s-.4 1-1 1-.9-.4-.9-1 .4-1 .9-1z" fill="#FFD43B"/>
    </svg>
  ),
  Linux: (
    <svg viewBox="0 0 24 24" fill="#FCC624" width="28" height="28">
      <path d="M12 2C9 2 7 5 7 8c0 2 .5 3.5 1.5 5-1.5 1-3 2.5-3 4 0 1 .5 1.5 1.5 2h10c1 0 1.5-1 1.5-2 0-1.5-1.5-3-3-4 1-1.5 1.5-3 1.5-5 0-3-2-6-5-6z"/>
      <circle cx="10" cy="8" r="1" fill="#333"/>
      <circle cx="14" cy="8" r="1" fill="#333"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <rect x="6" y="2" width="5" height="7" rx="2.5" fill="#F24E1E"/>
      <rect x="13" y="2" width="5" height="7" rx="2.5" fill="#FF7262"/>
      <rect x="6" y="9" width="5" height="7" rx="2.5" fill="#A259FF"/>
      <circle cx="15.5" cy="12.5" r="2.5" fill="#1ABCFE"/>
      <rect x="6" y="16" width="5" height="7" rx="2.5" fill="#0ACF83"/>
    </svg>
  ),
};

const techs = [
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Discord.js' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Python' },
  { name: 'FFmpeg' },
  { name: 'GSAP' },
  { name: 'HTML/CSS' },
  { name: 'Git' },
  { name: 'Linux' },
  { name: 'Figma' },
];

const TechStack = () => {
  return (
    <section className="px-6 md:px-12 bg-[#0B0C0E]" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-line" style={{ margin: '0 auto 1rem' }} />
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#5865F2', marginBottom: '1rem', display: 'block' }}>
            Tech Arsenal
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
            Tools I <span className="text-gradient">Master.</span>
          </h2>
        </motion.div>

        <div className="tech-grid">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, borderColor: 'rgba(88, 101, 242, 0.3)' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.5rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                background: 'rgba(30, 31, 34, 0.3)',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {techIcons[tech.name]}
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#949BA4' }}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
