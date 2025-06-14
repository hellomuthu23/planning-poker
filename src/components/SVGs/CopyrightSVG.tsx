interface CopyrightSVGProps {
  className?: string;
}

export const CopyrightSVG = ({ className }: CopyrightSVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 32 32'
    width='20'
    height='20'
    fill='none'
    aria-hidden='true'
  >
    <circle cx='16' cy='16' r='13' stroke='#2563eb' strokeWidth='2.5' fill='none' />
    <text
      x='16'
      y='18'
      textAnchor='middle'
      fontSize='18'
      fontWeight='bold'
      fill='#2563eb'
      fontFamily='Arial, Helvetica, sans-serif'
      letterSpacing='1'
      dominantBaseline='middle'
    >
      C
    </text>
  </svg>
);
