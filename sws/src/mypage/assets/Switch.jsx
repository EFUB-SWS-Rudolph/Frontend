export default function Switch() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="32" viewBox="-1 -1 54 34" fill="none">
      <rect width="52" height="32" rx="16" fill="#FFF" stroke="#D9D9D9" strokeWidth="1px" />
      <mask
        id="mask0_switch_off"
        maskType="luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="52"
        height="32"
      >
        <rect width="52" height="32" rx="16" fill="white" />
      </mask>
      <g mask="url(#mask0_switch_off)">
        <g filter="url(#filter0_ddd_switch_off)">
          <rect x="2" y="2" width="28" height="28" rx="14" fill="white" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_ddd_switch_off"
          x="-6"
          y="-3"
          width="44"
          height="44"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="0.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_switch_off" />
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
            in2="effect1_dropShadow_switch_off"
            result="effect2_dropShadow_switch_off"
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
            in2="effect2_dropShadow_switch_off"
            result="effect3_dropShadow_switch_off"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_switch_off"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
