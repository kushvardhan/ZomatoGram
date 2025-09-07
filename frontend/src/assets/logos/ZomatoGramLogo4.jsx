// ZomatoGram Logo Variant 4 - Animated Pizza Slice & Delivery
import React from 'react';

const ZomatoGramLogo4 = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Pizza Slice */}
      <g className={animate ? "animate-bounce-subtle" : ""}>
        <path
          d="M50 20 L30 60 Q40 65 50 60 Q60 65 70 60 Z"
          fill="url(#gradient4)"
          fillOpacity="0.8"
        />
        {/* Pizza Toppings */}
        <circle cx="45" cy="40" r="3" fill="currentColor" fillOpacity="0.6" />
        <circle cx="55" cy="45" r="2" fill="currentColor" fillOpacity="0.7" />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" fillOpacity="0.5" />
        <ellipse cx="42" cy="52" rx="2" ry="1" fill="currentColor" fillOpacity="0.6" />
        <ellipse cx="58" cy="38" rx="1.5" ry="2" fill="currentColor" fillOpacity="0.7" />
      </g>

      {/* Delivery Scooter */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.3s' }}>
        {/* Scooter Body */}
        <path
          d="M15 75 L25 75 L30 70 L35 75 L40 75"
          stroke="url(#gradient4)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Wheels */}
        <circle 
          cx="20" 
          cy="80" 
          r="5" 
          fill="none" 
          stroke="url(#gradient4)" 
          strokeWidth="2"
          className={animate ? "animate-spin" : ""}
          style={{ animationDuration: '1s' }}
        />
        <circle 
          cx="35" 
          cy="80" 
          r="5" 
          fill="none" 
          stroke="url(#gradient4)" 
          strokeWidth="2"
          className={animate ? "animate-spin" : ""}
          style={{ animationDuration: '1s' }}
        />
        {/* Delivery Box */}
        <rect
          x="25"
          y="65"
          width="8"
          height="6"
          rx="1"
          fill="url(#gradient4)"
          fillOpacity="0.7"
        />
      </g>

      {/* Speed Lines */}
      <g className={animate ? "animate-pulse" : ""} style={{ animationDelay: '0.5s' }}>
        <path d="M5 70 L15 70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M8 75 L18 75" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M6 80 L16 80" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Floating Hearts (Love for Food) */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.7s' }}>
        <path
          d="M75 25 Q77 23 79 25 Q81 23 83 25 Q83 27 81 29 L79 31 L77 29 Q75 27 75 25"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <path
          d="M80 35 Q81 34 82 35 Q83 34 84 35 Q84 36 83 37 L82 38 L81 37 Q80 36 80 35"
          fill="currentColor"
          fillOpacity="0.4"
        />
      </g>

      {/* Circular Motion Path */}
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="url(#gradient4)"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="3,3"
        className={animate ? "animate-spin" : ""}
        style={{ animationDuration: '12s', animationDirection: 'reverse' }}
      />

      {/* Corner Stars */}
      <g className={animate ? "animate-ping" : ""} style={{ animationDelay: '1s' }}>
        <path
          d="M10 10 L12 15 L17 15 L13 18 L15 23 L10 20 L5 23 L7 18 L3 15 L8 15 Z"
          fill="currentColor"
          fillOpacity="0.3"
          transform="scale(0.3)"
        />
        <path
          d="M85 10 L87 15 L92 15 L88 18 L90 23 L85 20 L80 23 L82 18 L78 15 L83 15 Z"
          fill="currentColor"
          fillOpacity="0.3"
          transform="scale(0.3)"
        />
      </g>
    </svg>
  );
};

export default ZomatoGramLogo4;
