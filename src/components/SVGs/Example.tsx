export const ExampleSVG = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <circle cx='6' cy='7' r='1.5' />
      <circle cx='6' cy='12' r='1.5' />
      <circle cx='6' cy='17' r='1.5' />
      <line
        x1='10'
        y1='7'
        x2='20'
        y2='7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='10'
        y1='12'
        x2='20'
        y2='12'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='10'
        y1='17'
        x2='20'
        y2='17'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};
