import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const LocationIcon: React.FC<IconProps> = (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 11C19 15.4183 15.4183 19 11 19M19 11C19 6.58172 15.4183 3 11 3M19 11H21M11 19C6.58172 19 3 15.4183 3 11M11 19V21M3 11C3 6.58172 6.58172 3 11 3M3 11H1M11 3V1M14 11C14 12.6569 12.6569 14 11 14C9.34315 14 8 12.6569 8 11C8 9.34315 9.34315 8 11 8C12.6569 8 14 9.34315 14 11Z"
      stroke="#3F697B"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LocationIcon;
