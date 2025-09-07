// ZomatoGram Logo Variant 3 - Animated Food Bowl with Steam
import React from 'react';

const ZomatoGramLogo3 = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="radial3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      
      {/* Bowl */}
      <g className={animate ? "animate-bounce-subtle" : ""}>
        <path
          d="M20 50 Q20 70 50 70 Q80 70 80 50 L75 50 Q75 65 50 65 Q25 65 25 50 Z"
          fill="url(#gradient3)"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="8"
          fill="url(#radial3)"
        />
      </g>

      {/* Food Items */}
      <g className={animate ? "animate-pulse" : ""} style={{ animationDelay: '0.2s' }}>
        <circle cx="40" cy="48" r="4" fill="currentColor" fillOpacity="0.7" />
        <circle cx="55" cy="52" r="3" fill="currentColor" fillOpacity="0.6" />
        <circle cx="48" cy="45" r="2" fill="currentColor" fillOpacity="0.8" />
        <ellipse cx="60" cy="48" rx="3" ry="2" fill="currentColor" fillOpacity="0.5" />
      </g>

      {/* Steam Waves */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.4s' }}>
        <path
          d="M35 35 Q37 30 35 25 Q33 20 35 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.6"
        />
        <path
          d="M45 35 Q47 30 45 25 Q43 20 45 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.6"
        />
        <path
          d="M55 35 Q57 30 55 25 Q53 20 55 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.6"
        />
        <path
          d="M65 35 Q67 30 65 25 Q63 20 65 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.6"
        />
      </g>

      {/* Chopsticks */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.6s' }}>
        <path
          d="M75 25 L85 15"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M78 28 L88 18"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Decorative Ring */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="url(#gradient3)"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="5,5"
        className={animate ? "animate-spin" : ""}
        style={{ animationDuration: '15s' }}
      />

      {/* Corner Decorations */}
      <g className={animate ? "animate-ping" : ""} style={{ animationDelay: '0.8s' }}>
        <circle cx="15" cy="15" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="85" cy="15" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="15" cy="85" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="85" cy="85" r="2" fill="currentColor" fillOpacity="0.4" />
      </g>
    </svg>
  );
};

export default ZomatoGramLogo3;
