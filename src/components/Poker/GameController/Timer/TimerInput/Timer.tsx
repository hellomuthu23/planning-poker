import { useCallback, useState } from 'react';
import { ClockSVG } from '../../../../SVGs/Clock';
import { TimerProgress } from '../TimerProgressPopup/TimerProgressPopup';

type TimerProps = {
  timerProps: {
    isMod?: boolean;
    currentSeconds?: number;
    totalSeconds?: number;
    soundOn?: boolean;
    timerVisible?: boolean;
    timerPaused?: boolean;
  };
};

export const Timer: React.FC<TimerProps> = ({ timerProps }) => {
  const {
    isMod = false,
    timerVisible = false,
    timerPaused = false,
    currentSeconds = 0,
    totalSeconds = 300,
    soundOn = true,
  } = timerProps;

  const [_showTimer, setShowTimer] = useState(timerVisible);

  const onTimerStateUpdate = useCallback((update) => {
    console.log(update);
  }, []);

  const onTimerClose = useCallback(() => {
    setShowTimer(false);
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
          onClick={() => setShowTimer((prev) => !prev)}
          title='Timer'
          className='cursor-pointer'
        >
          <ClockSVG className={`h-6 w-6 ${_showTimer ? 'text-green-500' : 'text-grey-500'}`} />
        </button>
      )}

      {(_showTimer || timerVisible) && (
        <TimerProgress
          currentSeconds={currentSeconds}
          totalSeconds={totalSeconds}
          onTimerClose={onTimerClose}
          isMod={isMod}
          onTimerStateUpdate={(update) => {
            onTimerStateUpdate({ ...update, timerVisible: _showTimer });
          }}
          soundOn={soundOn}
          timerPaused={timerPaused}
        />
      )}
    </>
  );
};
