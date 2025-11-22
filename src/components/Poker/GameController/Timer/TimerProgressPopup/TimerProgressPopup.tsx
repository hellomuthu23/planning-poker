import { ChangeEvent, useEffect, useRef, useState, useCallback } from 'react';
import CircularProgressBar from '../../../../elements/CircularProgressBar';
import { useTranslation } from 'react-i18next';

type TimerProps = {
  isMod?: boolean;
  currentSeconds?: number;
  totalSeconds?: number;
  soundOn?: boolean;
  timerPaused?: boolean;
  onTimerClose: () => void;
  onTimerStateUpdate: (update: {
    currentSeconds: number;
    totalSeconds: number;
    soundOn: boolean;
    timerPaused: boolean;
  }) => void;
};

const getMinutesAndSeconds = (time: number) => [Math.floor(time / 60), time % 60];

const audio = typeof Audio !== 'undefined' ? new Audio('/timer-notification.mp3') : null;

export const TimerProgress: React.FC<TimerProps> = ({
  currentSeconds = 0,
  totalSeconds = 300,
  onTimerClose,
  isMod,
  onTimerStateUpdate,
  soundOn = true,
  timerPaused = false,
}) => {
  const [total, setTotal] = useState(totalSeconds);
  const [current, setCurrent] = useState(currentSeconds);
  const [inProgress, setInProgress] = useState(!isMod && !timerPaused);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [_soundOn, setSoundOn] = useState(soundOn);

  const { t } = useTranslation();

  useEffect(() => {
    if (!isMod) {
      setInProgress(false);
      setCurrent(currentSeconds);
      setTotal(totalSeconds);
      setSoundOn(soundOn);
    }
  }, [isMod, currentSeconds, totalSeconds, soundOn]);

  useEffect(() => {
    if (inProgress && isMod) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => {
          if (prev + 1 >= total) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setInProgress(false);
            if (audio && _soundOn) audio.play();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [inProgress, total, _soundOn, isMod]);

  useEffect(() => {
    if (isMod) {
      onTimerStateUpdate({
        totalSeconds: total,
        currentSeconds: current,
        timerPaused: !inProgress,
        soundOn: _soundOn,
      });
    }
  }, [current, total, inProgress, _soundOn, isMod, onTimerStateUpdate]);

  const startTimer = useCallback(() => setInProgress(true), []);
  const pauseTimer = useCallback(() => {
    setInProgress(false);
    clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);
  const handleReset = useCallback(() => {
    setCurrent(0);
    setInProgress(false);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = null;
  }, []);
  const onAddSeconds = useCallback(() => setTotal((prev) => prev + 60), []);
  const onReduceSeconds = useCallback(
    () => setTotal((prev) => (prev - 60 > 30 ? prev - 60 : prev)),
    [],
  );
  const onMinutesChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const minutes = Number(event.target.value.slice(-2));
      setTotal(minutes * 60 + (total % 60));
      setCurrent(0);
    },
    [total],
  );
  const onSecondsChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const seconds = Number(event.target.value.slice(-2));
      setTotal(Math.floor(total / 60) * 60 + seconds);
      setCurrent(0);
    },
    [total],
  );

  const [minutes, seconds] = getMinutesAndSeconds(total);
  const [runningMinutes, runningSeconds] = getMinutesAndSeconds(total - current);
  const percentage = total > 0 ? 100 - (current / total) * 100 : 100;
  const [currentMinutesRunning, currentSecondsRunning] = getMinutesAndSeconds(current);

  return (
    <div className='absolute top-13 right-2 shadow-xl rounded-lg bg-white p-4 w-[15rem] h-fit border-gray-200 border-1 dark:bg-gray-800 dark:border-gray-700 z-10'>
      <button
        title={
          _soundOn
            ? isMod
              ? t('GameController.Timer.soundEnabledMod')
              : t('GameController.Timer.soundEnabledPlayer')
            : isMod
            ? t('GameController.Timer.soundDisabledMod')
            : t('GameController.Timer.soundDisabledPlayer')
        }
        className={`absolute top-3 left-3 p-1 ${isMod ? 'cursor-pointer' : ''}`}
        onClick={() => isMod && setSoundOn((s) => !s)}
        type='button'
      >
        {_soundOn ? '🔊' : '🔇'}
      </button>
      {isMod && (
        <div
          className='absolute top-3 right-3 cursor-pointer'
          title={t('GameController.Timer.closeTimer')}
          onClick={onTimerClose}
        >
          X
        </div>
      )}
      <div className='flex h-full w-full justify-center items-center space-y-2 flex-col'>
        <CircularProgressBar percentage={percentage}>
          <div className='text-4xl flex flex-col items-center space-y-2'>
            <div
              title={
                isMod
                  ? `Set Time: ${minutes} Minutes, ${seconds} Seconds.\nReset to edit`
                  : `Running Time: ${runningMinutes} Minutes, ${runningSeconds} Seconds.`
              }
              className='flex items-center space-x-1 flex-grow dark:text-white'
            >
              <input
                type='text'
                value={
                  (intervalRef.current && inProgress) || !isMod
                    ? runningMinutes.toString().padStart(2, '0')
                    : minutes.toString().padStart(2, '0')
                }
                maxLength={3}
                pattern='[0-9]*'
                className='w-[2.5rem] border-none focus:outline-none'
                onChange={onMinutesChange}
                disabled={!!intervalRef.current || inProgress}
              />
              <span className='pb-[0.3rem]'>:</span>
              <input
                type='text'
                value={
                  (intervalRef.current && inProgress) || !isMod
                    ? runningSeconds.toString().padStart(2, '0')
                    : seconds.toString().padStart(2, '0')
                }
                maxLength={3}
                pattern='[0-9]*'
                className='w-[2.5rem] border-none focus:outline-none'
                onChange={onSecondsChange}
                disabled={!!intervalRef.current || inProgress}
              />
            </div>
            {isMod && !inProgress && (
              <div
                title={`Running Time: ${currentMinutesRunning} Minutes, ${currentSecondsRunning} Seconds.`}
                className='text-2xl dark:text-white'
              >
                <span>{currentMinutesRunning.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span>{currentSecondsRunning.toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>
        </CircularProgressBar>
        {isMod && (
          <>
            <hr className='h-px my-3 bg-gray-200 border-0 dark:bg-gray-700 w-full' />
            <div className='flex space-x-2 w-full'>
              <TimerControlButton
                title={t('GameController.Timer.resetTimer')}
                callback={handleReset}
                className='text-gray-400'
              >
                {'\u23F9'}
              </TimerControlButton>
              <div className='flex-grow w-full'>
                {!inProgress && (
                  <div className='flex justify-center items-center gap-x-2 w-full h-8' role='group'>
                    <TimerControlButton callback={onReduceSeconds} title='Minus 1 minute'>
                      -
                    </TimerControlButton>
                    <TimerControlButton callback={onAddSeconds} title='Add 1 minute'>
                      +
                    </TimerControlButton>
                  </div>
                )}
              </div>
              {!inProgress && (
                <TimerControlButton
                  title={t('GameController.Timer.startTimer')}
                  callback={startTimer}
                  disabled={total === 0}
                  className='text-gray-400'
                >
                  {'\u25B6'}
                </TimerControlButton>
              )}
              {inProgress && (
                <TimerControlButton
                  title={t('GameController.Timer.pauseTimer')}
                  callback={pauseTimer}
                  className='text-gray-400'
                >
                  {'\u23F8'}
                </TimerControlButton>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

type TimerControlButtonProps = {
  title: string;
  callback: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export const TimerControlButton: React.FC<TimerControlButtonProps> = ({
  title,
  callback,
  children,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      title={title}
      className={`p-2 border-2 border-gray-200 h-8 w-8 flex items-center justify-center text-xl hover:text-gray-600 hover:border-gray-600 pb-[0.7rem] ${className} dark:border-gray-700 dark:hover:border-gray-500 dark:hover:text-gray-300`}
      onClick={callback}
      type='button'
      disabled={disabled}
    >
      {children}
    </button>
  );
};
