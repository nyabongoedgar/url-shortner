import React from "react";

function Icon({stroke}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={stroke || "#A5A5A5"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.287 8.82L4.108 10a4.167 4.167 0 105.893 5.892l1.179-1.179M7.644 12.357l4.714-4.714M14.714 11.178L15.893 10A4.167 4.167 0 1010 4.107L8.822 5.286"
      ></path>
    </svg>
  );
}

export default Icon;