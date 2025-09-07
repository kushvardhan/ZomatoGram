// ZomatoGram Logo Variant 1 - Animated Fork & Spoon
import React from 'react';

const ZomatoGramLogo1 = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* Fork */}
      <g className={animate ? "animate-bounce-subtle" : ""}>
        <path
          d="M25 20 L25 45 L30 45 L30 20"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 15 L20 35"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M25 15 L25 35"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M30 15 L30 35"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M35 15 L35 35"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Spoon */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.2s' }}>
        <ellipse
          cx="70"
          cy="25"
          rx="8"
          ry="12"
          fill="url(#gradient1)"
        />
        <path
          d="M70 37 L70 55"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Plate */}
      <g className={animate ? "animate-pulse" : ""} style={{ animationDelay: '0.4s' }}>
        <ellipse
          cx="50"
          cy="75"
          rx="35"
          ry="8"
          fill="url(#gradient1)"
          fillOpacity="0.3"
        />
        <ellipse
          cx="50"
          cy="73"
          rx="30"
          ry="6"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
        />
      </g>

      {/* Decorative dots */}
      <g className={animate ? "animate-ping" : ""} style={{ animationDelay: '0.6s' }}>
        <circle cx="15" cy="60" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="85" cy="60" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="50" cy="10" r="2" fill="currentColor" fillOpacity="0.4" />
      </g>
    </svg>
  );
};

export default ZomatoGramLogo1;
