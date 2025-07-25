import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const UploadCloudIcon: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="3" y="3" width="40" height="40" rx="20" fill="#F5F5F5" />
    <rect
      x="3"
      y="3"
      width="40"
      height="40"
      rx="20"
      stroke="#FAFAFA"
      strokeWidth="6"
    />
    <g clipPath="url(#clip0_1289_11782)">
      <path
        d="M26.3335 26.3332L23.0002 22.9999M23.0002 22.9999L19.6669 26.3332M23.0002 22.9999V30.4999M29.9919 28.3249C30.8047 27.8818 31.4467 27.1806 31.8168 26.3321C32.1868 25.4835 32.2637 24.5359 32.0354 23.6388C31.807 22.7417 31.2865 21.9462 30.5558 21.3778C29.8251 20.8094 28.9259 20.5005 28.0002 20.4999H26.9502C26.698 19.5243 26.2278 18.6185 25.5752 17.8507C24.9225 17.0829 24.1042 16.4731 23.182 16.0671C22.2597 15.661 21.2573 15.4694 20.2503 15.5065C19.2433 15.5436 18.2578 15.8085 17.3679 16.2813C16.4779 16.7541 15.7068 17.4225 15.1124 18.2362C14.518 19.05 14.1158 19.9879 13.936 20.9794C13.7563 21.9709 13.8036 22.9903 14.0746 23.961C14.3455 24.9316 14.8329 25.8281 15.5002 26.5832"
        stroke="#535862"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1289_11782">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(13 13)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default UploadCloudIcon;
