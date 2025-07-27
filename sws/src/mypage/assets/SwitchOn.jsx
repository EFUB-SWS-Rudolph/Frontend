export default function SwitchOn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="32" viewBox="0 0 52 32" fill="none">
      <rect width="52" height="32" rx="16" fill="#13997B" />
      <mask
        id="mask0_801_3596"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="52"
        height="32"
      >
        <rect width="52" height="32" rx="16" fill="white" />
      </mask>
      <g mask="url(#mask0_801_3596)">
        <g filter="url(#filter0_ddd_801_3596)">
          <rect x="22" y="2" width="28" height="28" rx="14" fill="white" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_ddd_801_3596"
          x="14"
          y="-3"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_801_3596" />
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
            in2="effect1_dropShadow_801_3596"
            result="effect2_dropShadow_801_3596"
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
            in2="effect2_dropShadow_801_3596"
            result="effect3_dropShadow_801_3596"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_801_3596"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
