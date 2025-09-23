import { useEffect, useState } from 'react';
import { ClockSVG } from '../../../../SVGs/Clock';
import { TimerProgress } from '../TimerProgressPopup/TimerProgressPopup';
import { on } from 'node:events';
export const Timer: React.FC<{
  showTimer?: boolean;
  timerInprogress?: boolean;
  currentSeconds?: number;
}> = ({ showTimer = false, timerInprogress = false, currentSeconds }) => {
  const [_showTimer, setShowTimer] = useState(showTimer);

  const onTimerClose = () => {
    setShowTimer((prev) => !prev);
  };

  return (
    <>
      <button onClick={onTimerClose} title='Timer'>
        <ClockSVG className={`h-6 w-6 ${_showTimer ? 'text-green-500' : 'text-grey-500'}`} />
      </button>

      {_showTimer && (
        <TimerProgress
          currentSeconds={currentSeconds}
          timerInProgress={timerInprogress}
          onTimerClose={onTimerClose}
        />
      )}
    </>
  );
};
