function CloseIcon({ size = 24, color = "#fff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="butt"
      strokeLinejoin="bevel"
    >
      <line x1="6" y1="12" x2="31" y2="12"></line>
      <line x1="6" y1="6" x2="31" y2="6"></line>
      <line x1="6" y1="18" x2="31" y2="18"></line>
    </svg>
  );
}

export default CloseIcon;
