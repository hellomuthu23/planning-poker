import { useEffect, useState } from 'react';
import { ClockSVG } from '../../../../SVGs/Clock';
import { TimerProgress } from '../TimerProgressPopup/TimerProgressPopup';
import { on } from 'node:events';
export const Timer: React.FC<{
  isMod: boolean;
  showTimer?: boolean;
  timerInprogress?: boolean;
  currentSeconds?: number;
  totalSeconds?: number;
}> = ({ showTimer, timerInprogress, currentSeconds, totalSeconds, isMod }) => {
  const [_showTimer, setShowTimer] = useState(showTimer);

  const onTimerClose = () => {
    setShowTimer((prev) => !prev);
  };

  return (
    <>
      {isMod && (
        <button onClick={onTimerClose} title='Timer' className='cursor-pointer'>
          <ClockSVG className={`h-6 w-6 ${_showTimer ? 'text-green-500' : 'text-grey-500'}`} />
        </button>
      )}

      {(_showTimer || timerInprogress) && (
        <TimerProgress
          currentSeconds={currentSeconds}
          totalSeconds={totalSeconds}
          timerInProgress={timerInprogress}
          onTimerClose={onTimerClose}
          isMod={isMod}
          onTimerStateUpdate={(update) => console.log(update)}
        />
      )}
    </>
  );
};
