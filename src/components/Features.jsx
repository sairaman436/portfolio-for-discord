import React from 'react';
import { motion } from 'framer-motion';
import { Music, Zap, Shield, Crown } from 'lucide-react';
import BorderGlow from './BorderGlow';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Zupp Audio",
      description: "High-fidelity music bot with 24-bit lossless streaming and custom voice engine.",
    },
    {
      icon: Music,
      title: "Discord API",
      description: "Advanced implementation of Discord.js and Discord interactions for elite server tools.",
    },
    {
      icon: Shield,
      title: "Infrastructure",
      description: "Scalable Node.js architectures designed for high-concurrency environments.",
    },
    {
      icon: Crown,
      title: "Exclusive UI",
      description: "Crafting premium, industry-based interfaces for Discord-connected applications.",
    },
  ];

  return (
    <section id="archive" className="px-6 md:px-12 bg-[#0B0C0E]" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="section-line" />
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#5865F2', marginBottom: '1rem', display: 'block' }}>Project Archive</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              Engineering <br />
              <span className="text-gradient">The Connection.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#949BA4] max-w-sm text-right"
          >
            <p className="font-medium">
              Specializing in low-latency Discord integrations and high-fidelity audio engineering.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <BorderGlow
                backgroundColor="#1E1F22"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={0.8}
                edgeSensitivity={25}
                coneSpread={20}
                glowColor="235 70 65"
                colors={['#5865F2', '#7289DA', '#4752C4']}
              >
                <div style={{ padding: '2.5rem', position: 'relative' }}>
                  {/* Card Number */}
                  <span style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(88, 101, 242, 0.25)',
                    letterSpacing: '0.05em',
                  }}>
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: '#0B0C0E',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                  }}>
                    <feature.icon color="#5865F2" size={32} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.025em',
                    color: 'white',
                    marginBottom: '1rem',
                  }}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: '#949BA4',
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}>
                    {feature.description}
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
