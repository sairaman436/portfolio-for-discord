import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

const projects = [
  {
    number: '01',
    title: 'Zupp Audio Bot',
    category: 'Discord • Node.js',
    description: 'A high-fidelity music bot with 24-bit lossless streaming, custom voice engine, and synced lyrics display.',
    tags: ['Discord.js', 'FFmpeg', 'Node.js'],
    status: 'Live',
  },
  {
    number: '02',
    title: 'Protocol-X',
    category: 'Discord • AI',
    description: 'An intelligent chatbot powered by advanced AI, delivering context-aware conversations, moderation assistance, and interactive server experiences.',
    tags: ['Discord.js', 'AI/ML', 'Node.js'],
    status: 'Live',
  },
  {
    number: '03',
    title: 'AXZR Portfolio',
    category: 'Web • React',
    description: 'This cinematic developer portfolio featuring scroll-scrubbed anime sequences and premium micro-interactions.',
    tags: ['React', 'GSAP', 'Framer Motion'],
    status: 'Live',
  },
  {
    number: '04',
    title: 'Server Dashboard',
    category: 'Full Stack • API',
    description: 'A real-time analytics dashboard for Discord servers with member insights, activity tracking, and moderation tools.',
    tags: ['React', 'MongoDB', 'Express'],
    status: 'In Progress',
  },
];

const Projects = () => {
  return (
    <section className="px-6 md:px-12 bg-[#0B0C0E]" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-line" />
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#5865F2', marginBottom: '1rem', display: 'block' }}>
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
            Project <span className="text-gradient">Showcase.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <BorderGlow
                backgroundColor="#1E1F22"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={0.7}
                edgeSensitivity={25}
                glowColor="235 70 65"
                colors={['#5865F2', '#7289DA', '#4752C4']}
              >
                <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="md:flex-row">
                  {/* Left: Number + Title */}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: 'rgba(88,101,242,0.4)', letterSpacing: '0.05em' }}>
                      {project.number}
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: 'white', marginTop: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5865F2', marginTop: '0.25rem' }}>
                      {project.category}
                    </p>
                  </div>

                  {/* Middle: Description */}
                  <div style={{ flex: 2 }}>
                    <p style={{ color: '#B5BAC1', fontWeight: 500, lineHeight: 1.7, fontSize: '0.95rem' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(88, 101, 242, 0.2)',
                          color: '#5865F2',
                          background: 'rgba(88, 101, 242, 0.05)',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '9999px',
                      background: project.status === 'Live' ? 'rgba(35, 165, 90, 0.1)' : 'rgba(88, 101, 242, 0.1)',
                      color: project.status === 'Live' ? '#23A55A' : '#5865F2',
                      border: `1px solid ${project.status === 'Live' ? 'rgba(35, 165, 90, 0.2)' : 'rgba(88, 101, 242, 0.2)'}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {project.status === 'Live' ? '● ' : '◐ '}{project.status}
                    </span>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
