import { useEffect, useState } from 'react';
import { ClockSVG } from '../../../../SVGs/Clock';
import { TimerProgress } from '../TimerProgressPopup/TimerProgressPopup';
export const Timer: React.FC<{
  timerProps: {
    isMod?: boolean;
    timerInProgress?: boolean;
    currentSeconds?: number;
    totalSeconds?: number;
    soundOn?: boolean;
  };
}> = ({ timerProps }) => {
  const [_showTimer, setShowTimer] = useState(false);

  const onTimerClose = () => {
    setShowTimer((prev) => !prev);
  };

  return (
    <>
      {timerProps.isMod && (
        <button onClick={onTimerClose} title='Timer' className='cursor-pointer'>
          <ClockSVG className={`h-6 w-6 ${_showTimer ? 'text-green-500' : 'text-grey-500'}`} />
        </button>
      )}

      {(_showTimer || timerProps.timerInProgress) && (
        <TimerProgress
          currentSeconds={timerProps.currentSeconds}
          totalSeconds={timerProps.totalSeconds}
          timerInProgress={timerProps.timerInProgress}
          onTimerClose={onTimerClose}
          isMod={timerProps.isMod}
          onTimerStateUpdate={(update) => console.log(update)}
          soundOn={timerProps.soundOn}
        />
      )}
    </>
  );
};
