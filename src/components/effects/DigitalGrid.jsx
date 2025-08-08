import React from 'react';

const DigitalGrid = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 opacity-20 ${className}`}>
      <svg
        className="w-full h-full animate-grid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(15, 52, 96, 0.3)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="grid-glow"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="50"
              cy="50"
              r="2"
              fill="rgba(83, 52, 131, 0.5)"
              className="animate-glow"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#grid-glow)" />
      </svg>
    </div>
  );
};

export default DigitalGrid;