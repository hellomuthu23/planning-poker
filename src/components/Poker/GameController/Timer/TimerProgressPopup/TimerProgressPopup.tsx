import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CircularProgressBar from '../../../../elements/CircularProgressBar';

export const TimerProgress: React.FC<{
  timerInProgress: boolean;
  currentSeconds?: number;
  totalSeconds?: number;
}> = ({ timerInProgress, currentSeconds = 0, totalSeconds = 300 }) => {
  const getMinutesandSeconds = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return [minutes, seconds];
  };

  const [_totalSeconds, setTotalSeconds] = useState(totalSeconds);
  const [_currentSeconds, setCurrentSeconds] = useState(currentSeconds);
  const [_timerInProgress, setTimerInprogress] = useState(timerInProgress);
  const [percentage, setPercentage] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const minutesUpdated = useRef(0);
  const secondsUpdated = useRef(0);

  useEffect(() => {
    if (_timerInProgress) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds((prevTime) => {
          const updated = prevTime + 1;
          if (updated === _totalSeconds) {
            setTimerInprogress(false);
            setPercentage(100);
            return 0;
          }
          setPercentage(100 - Math.round(updated / _totalSeconds));
          return updated;
        });
      }, 1000);
    } else if (!_timerInProgress) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [_timerInProgress]);

  const onAddSeconds = () => {
    setTotalSeconds((prev) => prev + 60);
  };

  const onReduceSeconds = () => {
    setTotalSeconds((prev) => prev - 60);
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

  const handleStartPause = () => {
    setTimerInprogress((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTimerInprogress(false);
    setCurrentSeconds(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className='absolute top-13 right-2 shadow-xl rounded-lg bg-white p-4 w-[15rem] h-fit border-gray-200 border-1'>
      <div className='flex h-full w-full justify-center items-center space-y-2 flex-col'>
        <CircularProgressBar percentage={percentage}>
          <div className='flex space-x-2 items-center text-lg'>
            <div title={minutes + ' Minutes' + ', ' + seconds + ' Seconds'} className='text-4xl'>
              <input
                type='text'
                value={_timerInProgress ? runningMinutesFormated : minutesFormated}
                maxLength={3}
                pattern='[0-9]*'
                className='w-[2.5rem] border-none focus:outline-none'
                onChange={onMinutesChange}
                disabled={_timerInProgress}
              ></input>
              :
              <input
                type='text'
                value={_timerInProgress ? runningSecondsFormated : secondsFormated}
                maxLength={3}
                pattern='[0-9]*'
                className='w-[2.5rem] border-none focus:outline-none'
                onChange={onSecondsChange}
                disabled={_timerInProgress}
              ></input>
            </div>
          </div>
        </CircularProgressBar>
        <hr className='h-px my-2 bg-gray-200 border-0 dark:bg-gray-700'></hr>
        <div className='flex space-x-2'>
          <button
            title='Stop'
            className='p-2 border-2 border-gray-400 h-8 w-8 flex items-center justify-center text-gray-400'
            disabled={!_timerInProgress}
            onClick={handleReset}
          >
            {'\u23F9'}
          </button>
          <div className='flex-grow w-full'>
            {!_timerInProgress && (
              <div className='flex' role='group'>
                <button
                  type='button'
                  className='p-2 py-2 border border-gray-200 h-8 w-8 flex items-center justify-center text-xl align-middle'
                  onClick={onReduceSeconds}
                >
                  -
                </button>
                <button
                  type='button'
                  className='p-2 py-2 border border-gray-200 h-8 w-8 flex items-center justify-center text-xl align-middle'
                  onClick={onAddSeconds}
                >
                  +
                </button>
              </div>
            )}
            {_timerInProgress && <button onClick={onAddSeconds}>+1 min</button>}
          </div>

          {!_timerInProgress && (
            <button
              title='Play'
              className='p-2 border-2 border-gray-400 h-8 w-8 flex items-center justify-center text-gray-400'
              onClick={handleStartPause}
            >
              {'\u25B6'}
            </button>
          )}
          {_timerInProgress && (
            <button
              title='Pause'
              className='p-2 border-2 border-gray-400 h-8 w-8 flex items-center justify-center text-gray-400'
              onClick={handleStartPause}
            >
              {'\u23F8'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
