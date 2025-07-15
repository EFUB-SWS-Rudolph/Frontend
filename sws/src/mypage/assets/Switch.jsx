import React from 'react';

export default function Switch() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="44"
        viewBox="0 0 58 44"
        fill="none"
      >
        <path
          d="M42 3C50.8366 3 58 10.1634 58 19C58 27.8366 50.8366 35 42 35H22C13.1634 35 6 27.8366 6 19C6 10.1634 13.1634 3 22 3H42ZM22 5C14.268 5 8 11.268 8 19C8 26.732 14.268 33 22 33H42C49.732 33 56 26.732 56 19C56 11.268 49.732 5 42 5H22Z"
          fill="#D9D9D9"
        />
        <g filter="url(#filter0_ddd_301_15451)">
          <rect x="8" y="5" width="28" height="28" rx="14" fill="white" />
        </g>
        <defs>
          <filter
            id="filter0_ddd_301_15451"
            x="0"
            y="0"
            width="44"
            height="44"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_301_15451" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_301_15451"
              result="effect2_dropShadow_301_15451"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_301_15451"
              result="effect3_dropShadow_301_15451"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_301_15451"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
