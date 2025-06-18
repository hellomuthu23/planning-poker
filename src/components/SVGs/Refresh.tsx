export const RefreshSVG: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 4v5h5M20 20v-5h-5M5.5 9A7 7 0 0112 5a7 7 0 017.5 4.5M18.5 15A7 7 0 0112 19a7 7 0 01-7.5-4.5'
      />
    </svg>
  );
};
