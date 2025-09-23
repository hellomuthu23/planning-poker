import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CircularProgressBar from '../../../../elements/CircularProgressBar';

export const TimerProgress: React.FC<{
  timerInProgress: boolean;
  currentSeconds?: number;
  totalSeconds?: number;
  onTimerClose: () => void;
}> = ({ timerInProgress, currentSeconds = 0, totalSeconds = 300, onTimerClose }) => {
  const audio = new Audio('/timer-notification.mp3');

  const getMinutesandSeconds = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return [minutes, seconds];
  };

  const [_totalSeconds, setTotalSeconds] = useState(totalSeconds);
  const [_currentSeconds, setCurrentSeconds] = useState(currentSeconds);
  const [percentage, setPercentage] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const minutesUpdated = useRef(0);
  const secondsUpdated = useRef(0);
  const [isPaused, setPaused] = useState(true);

  const startTimer = () => {
    setPaused(false);
    intervalRef.current = setInterval(() => {
      setCurrentSeconds((prevTime) => {
        const updated = prevTime + 1;
        if (updated === _totalSeconds) {
          setPercentage(100);
          clearInterval(intervalRef.current as NodeJS.Timeout);
          setPaused(true);
          intervalRef.current = null;
          audio.play();
          return 0;
        }
        setPercentage(100 - (updated / _totalSeconds) * 100);
        return updated;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setPaused(true);
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  useEffect(() => {
    if (timerInProgress) {
      startTimer();
    } else if (!timerInProgress) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [timerInProgress]);

  const onAddSeconds = () => {
    setTotalSeconds((prev) => prev + 60);
  };

  const onReduceSeconds = () => {
    if (_totalSeconds - 60 > 30) {
      setTotalSeconds((prev) => prev - 60);
    }
  };

  const [minutes, seconds] = getMinutesandSeconds(_totalSeconds);
  const minutesFormated = minutes.toString().padStart(2, '0');
  const secondsFormated = seconds.toString().padStart(2, '0');

  const [runningMinutes, runningSeconds] = getMinutesandSeconds(_totalSeconds - _currentSeconds);
  const runningMinutesFormated = runningMinutes.toString().padStart(2, '0');
  const runningSecondsFormated = runningSeconds.toString().padStart(2, '0');

  const onMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(event.target.value.slice(-2));
    minutesUpdated.current = minutes;
    setTotalSeconds(minutesUpdated.current * 60 + secondsUpdated.current);
  };

  const onSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const seconds = Number(event.target.value.slice(-2));
    secondsUpdated.current = seconds;
    setTotalSeconds(minutesUpdated.current * 60 + secondsUpdated.current);
  };

  const handleReset = () => {
    setPaused(true);
    setPercentage(100);
    setCurrentSeconds(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className='absolute top-13 right-2 shadow-xl rounded-lg bg-white p-4 w-[15rem] h-fit border-gray-200 border-1'>
      <div
        className='absolute top-3 right-3 cursor-pointer'
        title='Close Timer'
        onClick={onTimerClose}
      >
        X
      </div>
      <div className='flex h-full w-full justify-center items-center space-y-2 flex-col'>
        <CircularProgressBar percentage={percentage}>
          <div className='flex space-x-2 items-center text-lg'>
            <div title={minutes + ' Minutes' + ', ' + seconds + ' Seconds'} className='text-4xl'>
              <input
                type='text'
                value={intervalRef.current ? runningMinutesFormated : minutesFormated}
                maxLength={3}
                pattern='[0-9]*'
                className='w-[2.5rem] border-none focus:outline-none'
                onChange={onMinutesChange}
                disabled={!!intervalRef.current}
              ></input>
              :
              <input
                type='text'
                value={intervalRef.current ? runningSecondsFormated : secondsFormated}
                maxLength={3}
                pattern='[0-9]*'
                className='w-[2.5rem] border-none focus:outline-none'
                onChange={onSecondsChange}
                disabled={!!intervalRef.current}
              ></input>
            </div>
          </div>
        </CircularProgressBar>
        <hr className='h-px my-3 bg-gray-200 border-0 dark:bg-gray-700 w-full'></hr>
        <div className='flex space-x-2'>
          <button
            title='Reset Timer'
            className='p-2 border-2 border-gray-400 h-8 w-8 flex items-center justify-center text-gray-400 pointer'
            onClick={handleReset}
          >
            {'\u23F9'}
          </button>
          <div className='flex-grow w-full'>
            {!intervalRef.current && (
              <div className='flex' role='group'>
                <button
                  type='button'
                  className='p-2 py-2 border border-gray-200 h-8 w-8 flex items-center justify-center text-xl align-middle'
                  onClick={onReduceSeconds}
                  title='Minus 1 minute'
                >
                  -
                </button>
                <button
                  type='button'
                  className='p-2 py-2 border border-gray-200 h-8 w-8 flex items-center justify-center text-xl align-middle'
                  onClick={onAddSeconds}
                  title='Add 1 minute'
                >
                  +
                </button>
              </div>
            )}
          </div>

          {(!intervalRef.current || isPaused) && (
            <button
              title='Start Timer'
              className='p-2 border-2 border-gray-400 h-8 w-8 flex items-center justify-center text-gray-400'
              onClick={startTimer}
              disabled={_totalSeconds == 0}
            >
              {'\u25B6'}
            </button>
          )}
          {intervalRef.current && !isPaused && (
            <button
              title='Pause Timer'
              className='p-2 border-2 border-gray-400 h-8 w-8 flex items-center justify-center text-gray-400'
              onClick={pauseTimer}
            >
              {'\u23F8'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
