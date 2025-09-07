// ZomatoGram Logo Variant 5 - Animated Restaurant Building
import React from 'react';

const ZomatoGramLogo5 = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* Restaurant Building */}
      <g className={animate ? "animate-bounce-subtle" : ""}>
        {/* Main Building */}
        <rect
          x="25"
          y="40"
          width="50"
          height="40"
          rx="2"
          fill="url(#gradient5)"
          fillOpacity="0.8"
        />
        
        {/* Roof */}
        <path
          d="M20 40 L50 25 L80 40 Z"
          fill="url(#gradient5)"
        />
        
        {/* Door */}
        <rect
          x="45"
          y="60"
          width="10"
          height="20"
          rx="1"
          fill="currentColor"
          fillOpacity="0.6"
        />
        
        {/* Windows */}
        <rect x="30" y="45" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="62" y="45" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="30" y="58" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="62" y="58" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.4" />
      </g>

      {/* Chimney Smoke */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.3s' }}>
        <rect x="60" y="25" width="4" height="15" fill="url(#gradient5)" fillOpacity="0.7" />
        <path
          d="M62 20 Q64 15 62 10 Q60 5 62 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fillOpacity="0.5"
        />
        <path
          d="M64 18 Q66 13 64 8 Q62 3 64 -2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fillOpacity="0.4"
        />
      </g>

      {/* Restaurant Sign */}
      <g className={animate ? "animate-pulse" : ""} style={{ animationDelay: '0.5s' }}>
        <rect
          x="35"
          y="35"
          width="30"
          height="8"
          rx="2"
          fill="url(#gradient5)"
          fillOpacity="0.9"
        />
        <text
          x="50"
          y="40"
          textAnchor="middle"
          fontSize="4"
          fill="currentColor"
          fontWeight="bold"
        >
          ZG
        </text>
      </g>

      {/* Delivery Person */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.7s' }}>
        {/* Person */}
        <circle cx="15" cy="70" r="3" fill="url(#gradient5)" fillOpacity="0.8" />
        <rect x="13" y="73" width="4" height="8" rx="1" fill="url(#gradient5)" fillOpacity="0.7" />
        
        {/* Delivery Bag */}
        <rect x="10" y="75" width="6" height="4" rx="1" fill="currentColor" fillOpacity="0.6" />
      </g>

      {/* Flying Food Icons */}
      <g className={animate ? "animate-bounce-subtle" : ""} style={{ animationDelay: '0.9s' }}>
        {/* Burger */}
        <circle cx="85" cy="30" r="3" fill="currentColor" fillOpacity="0.5" />
        <rect x="83" y="28" width="4" height="1" fill="currentColor" fillOpacity="0.6" />
        <rect x="83" y="31" width="4" height="1" fill="currentColor" fillOpacity="0.6" />
        
        {/* Pizza Slice */}
        <path
          d="M80 50 L85 45 L90 50 Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </g>

      {/* Orbiting Elements */}
      <g className={animate ? "animate-spin" : ""} style={{ animationDuration: '20s', transformOrigin: '50px 50px' }}>
        <circle cx="20" cy="20" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="80" cy="80" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="20" cy="80" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="80" cy="20" r="2" fill="currentColor" fillOpacity="0.3" />
      </g>

      {/* Base Ground */}
      <rect
        x="0"
        y="85"
        width="100"
        height="15"
        fill="url(#gradient5)"
        fillOpacity="0.2"
      />

      {/* Decorative Border */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="5"
        fill="none"
        stroke="url(#gradient5)"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="2,2"
        className={animate ? "animate-pulse" : ""}
        style={{ animationDuration: '3s' }}
      />
    </svg>
  );
};

export default ZomatoGramLogo5;
