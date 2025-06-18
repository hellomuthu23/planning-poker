export const LinkSVG: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M20 12v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7'
      />

      <path strokeLinecap='round' strokeLinejoin='round' d='M8 12l4 4m0 0l4-4m-4 4V4' />
    </svg>
  );
};
