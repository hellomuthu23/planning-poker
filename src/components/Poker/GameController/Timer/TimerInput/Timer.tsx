import { useCallback, useState } from 'react';
import { ClockSVG } from '../../../../SVGs/Clock';
import { TimerProgress } from '../TimerProgressPopup/TimerProgressPopup';
import { TimerProps as GameTimerProps } from '../../../../../types/game';

type TimerProps = {
  timerProps: {
    isMod?: boolean;
    currentSeconds?: number;
    totalSeconds?: number;
    soundOn?: boolean;
    timerVisible?: boolean;
    timerPaused?: boolean;
  };
  onTimerUpdate: (timer: GameTimerProps) => void;
};

export const Timer: React.FC<TimerProps> = ({ timerProps, onTimerUpdate }) => {
  const {
    isMod = false,
    timerVisible = false,
    timerPaused = false,
    currentSeconds = 0,
    totalSeconds = 300,
    soundOn = true,
  } = timerProps;

  const onTimerStateUpdate = useCallback(
    (update) => {
      onTimerUpdate(update);
    },
    [onTimerUpdate],
  );

  const onTimerClose = useCallback(() => {
    onTimerStateUpdate({
      currentSeconds: 0,
      totalSeconds: 300,
      soundOn: true,
      timerPaused: false,
      timerVisible: false,
    });
  }, [onTimerStateUpdate]);

  return (
    <>
      {isMod && (
        <button
          onClick={() =>
            onTimerStateUpdate({
              currentSeconds: 0,
              totalSeconds: 300,
              soundOn: true,
              timerPaused: false,
              timerVisible: true,
            })
          }
          title='Timer'
          className='cursor-pointer'
        >
          <ClockSVG className={`h-6 w-6 ${timerVisible ? 'text-green-500' : 'text-grey-500'}`} />
        </button>
      )}

      {timerVisible && (
        <TimerProgress
          currentSeconds={currentSeconds}
          totalSeconds={totalSeconds}
          onTimerClose={onTimerClose}
          isMod={isMod}
          onTimerStateUpdate={(update) => {
            onTimerStateUpdate({ ...update, timerVisible });
          }}
          soundOn={soundOn}
          timerPaused={timerPaused}
        />
      )}
    </>
  );
};
