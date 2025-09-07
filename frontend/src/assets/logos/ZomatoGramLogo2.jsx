// ZomatoGram Logo Variant 2 - Animated Chef Hat & Utensils
import React from 'react';

const ZomatoGramLogo2 = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Chef Hat */}
      <g className={animate ? "animate-bounce-subtle" : ""}>
        <path
          d="M30 45 Q30 25 50 25 Q70 25 70 45 L70 55 Q70 60 65 60 L35 60 Q30 60 30 55 Z"
          fill="url(#gradient2)"
          fillOpacity="0.9"
        />
        <path
          d="M35 60 L65 60 L65 70 Q65 75 60 75 L40 75 Q35 75 35 70 Z"
          fill="url(#gradient2)"
        />
        {/* Hat decorations */}
        <circle cx="45" cy="40" r="3" fill="currentColor" fillOpacity="0.3" />
        <circle cx="55" cy="35" r="2" fill="currentColor" fillOpacity="0.3" />
      </g>

      {/* Crossed Utensils */}
      <g className={animate ? "animate-spin" : ""} style={{ animationDelay: '0.3s', transformOrigin: '50px 50px', animationDuration: '8s' }}>
        {/* Knife */}
        <path
          d="M20 20 L35 35"
          stroke="url(#gradient2)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M35 35 L40 40"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Spatula */}
        <path
          d="M80 20 L65 35"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="60"
          y="30"
          width="8"
          height="12"
          rx="2"
          fill="url(#gradient2)"
          transform="rotate(45 64 36)"
        />
      </g>

      {/* Steam Animation */}
      <g className={animate ? "animate-pulse" : ""} style={{ animationDelay: '0.5s' }}>
        <path
          d="M45 15 Q47 10 45 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.4"
        />
        <path
          d="M50 15 Q52 10 50 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.4"
        />
        <path
          d="M55 15 Q57 10 55 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.4"
        />
      </g>

      {/* Base Circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#gradient2)"
        strokeWidth="1"
        strokeOpacity="0.2"
        className={animate ? "animate-spin" : ""}
        style={{ animationDuration: '20s', animationDirection: 'reverse' }}
      />
    </svg>
  );
};

export default ZomatoGramLogo2;
