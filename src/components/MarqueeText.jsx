import React from 'react';

const words = [
  'DEVELOPER', '•', 'ENGINEER', '•', 'ANIME', '•', 'CREATIVE', '•',
  'AXZR', '•', 'DISCORD', '•', 'NODE.JS', '•', 'REACT', '•',
  'INFRASTRUCTURE', '•', 'LOW-LATENCY', '•', 'PREMIUM', '•', 'ELITE', '•',
];

const MarqueeText = () => {
  return (
    <div className="marquee-strip">
      <div className="marquee-content">
        {/* Duplicate content for seamless loop */}
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className={word === '•' ? '' : (i % 4 === 0 ? 'accent' : '')}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;
