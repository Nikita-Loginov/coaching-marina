import { SVGProps } from "react";

export const LogoAccent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 566.93 566.93"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <style>
          {`
            .cls-1 { fill: url(#gradient-1); }
            .cls-2 { fill: url(#gradient-2); }
            .cls-3 { fill: url(#gradient-3); }
          `}
        </style>

        <linearGradient
          id="gradient-1"
          x1="190.75"
          y1="91.86"
          x2="190.8"
          y2="478.24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a1e5f4" />
          <stop offset="1" stopColor="#006" />
        </linearGradient>

        <linearGradient
          id="gradient-2"
          x1="204.04"
          y1="86.11"
          x2="204.04"
          y2="478.23"
          xlinkHref="#gradient-1"
        />

        <linearGradient
          id="gradient-3"
          x1="374.53"
          y1="86.11"
          x2="374.53"
          y2="478.05"
          xlinkHref="#gradient-1"
        />
      </defs>

      <path
        className="cls-1"
        d="M202.93,246.66l-97.17,1v40.84c0,37.35,25.49,67.54,65.62,67.18l33.07-.33c27.67-.28,54,13.87,71.35,38.42v-80C275.8,276.49,243.06,246.3,202.93,246.66Z"
      />

      <path
        className="cls-2"
        d="M265,401.45c-14.77-20.86-36.54-32.82-59.72-32.82h-.66L171.5,369h-.83a82,82,0,0,1-29.54-5.37,63.06,63.06,0,0,1-8.84-3.56v52.52c0,37.17,21.52,67.23,55.38,66.87H275.8V449.82c0-5.34-.32-19.63-1.24-24.82C272.47,413.21,269.34,407.62,265,401.45Z"
      />

      <path
        className="cls-3"
        d="M423.73,87.49A135.85,135.85,0,0,0,287.89,223.32V479.43A147.73,147.73,0,0,0,435.62,331.71V165.17a130.9,130.9,0,0,1,25.55-77.68Zm-52.18,58.75A10.46,10.46,0,1,1,382,135.78,10.47,10.47,0,0,1,371.55,146.24Z"
      />
    </svg>
  );
};
