export const MenuSVG: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
      aria-hidden='true'
    >
      <line
        x1='4'
        y1='6'
        x2='20'
        y2='6'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='4'
        y1='12'
        x2='20'
        y2='12'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='4'
        y1='18'
        x2='20'
        y2='18'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};
