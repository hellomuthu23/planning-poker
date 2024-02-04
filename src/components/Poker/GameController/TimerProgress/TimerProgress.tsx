import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './TimerProgress.css';

interface TimerProgressProps {
  timerValue: number;
  startTimer: boolean;
  onTimerEnd: () => void;
}

export const TimerProgress: React.FC<TimerProgressProps> = ({
  timerValue,
  startTimer,
  onTimerEnd,
}) => {
  const milliseconds = timerValue * 1000;
  const [progress, setProgress] = useState(milliseconds);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTimer) {
      setProgress(milliseconds);
      timer = setInterval(() => {
        setProgress((prevProgress: number) => {
          const currentProgress = prevProgress - 1000;
          if (prevProgress < 0 || prevProgress === 0) {
            clearInterval(timer);
            setProgress(milliseconds);
            onTimerEnd();
          }
          return currentProgress;
        });
      }, 1000);
    } else {
      setProgress(milliseconds);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTimer]);

  useEffect(() => {
    setProgress(timerValue * 1000);
  }, [timerValue]);
  const percentageProgress = (progress / milliseconds) * 100;
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress
        variant='determinate'
        value={percentageProgress}
        className={`custom-progress ${
          percentageProgress > 50
            ? 'green-progress'
            : percentageProgress > 25 || progress === 0
            ? ''
            : 'red-progress'
        }`}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
        textOverflow=''
      >
        <Typography
          variant='caption'
          component='div'
          color='textSecondary'
          className='progress-time-text'
          title={(progress / 1000).toFixed() + ' Seconds'}
          data-testid='timer-seconds'
        >
          {(progress / 1000).toFixed()}s
        </Typography>
      </Box>
    </Box>
  );
};
