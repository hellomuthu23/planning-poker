import { FC } from 'react';

interface Props {
  strokeWidth?: number;
  sqSize?: number;
  percentage: number;
}

const CircularProgressBar: FC<Props> = (props) => {
  const { strokeWidth = 8, sqSize = 160, percentage, children } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;

  return (
    <div className='relative h-fit bg-white'>
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className='fill-none stroke-gray-200'
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className='fill-none stroke-blue-400 transition-all delay-200 ease-in'
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeLinecap='round'
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
      <div className='flex w-full h-full justify-center items-center left-0 top-0 absolute'>
        {children}
      </div>
    </div>
  );
};

export default CircularProgressBar;
