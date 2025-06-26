export const InfoSVG = ({ className = 'h-5 w-5' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 16v-4m0-4h.01' />
    </svg>
  );
};
