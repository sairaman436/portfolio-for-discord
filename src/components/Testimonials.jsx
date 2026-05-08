import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "AXZR's bot completely transformed our server. The audio quality is insane — you can hear every detail.",
    name: "Server Admin",
    role: "Discord Community",
    initial: "S",
  },
  {
    quote: "The UI work is on another level. Clean, fast, and it just feels premium. Best developer I've worked with.",
    name: "Client",
    role: "Web Project",
    initial: "C",
  },
  {
    quote: "Built us a custom moderation system in 3 days. Reliable, well-documented, and zero downtime since launch.",
    name: "Community Lead",
    role: "Gaming Server",
    initial: "G",
  },
];

const Testimonials = () => {
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
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
            What People <span className="text-gradient">Say.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3-custom gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                background: 'rgba(30, 31, 34, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Quote */}
              <p style={{ color: '#B5BAC1', fontWeight: 500, lineHeight: 1.7, fontSize: '0.95rem', fontStyle: 'italic', flex: 1 }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #5865F2, #4752C4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  color: 'white',
                  fontSize: '0.85rem',
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'white', fontSize: '0.85rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#949BA4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
