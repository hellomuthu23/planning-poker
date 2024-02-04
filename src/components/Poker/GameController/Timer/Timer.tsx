import {
  IconButton,
  Popper,
  Fade,
  Paper,
  ClickAwayListener,
  Input,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import { useRef, useState } from 'react';
import TimerIcon from '@material-ui/icons/Timer';
import './Timer.css';

export const TimerController: React.FC<{
  isTimer: boolean;
  setIsTimer: (timer: boolean) => void;
  timerValue: number | null;
  setTimerValue: (time: string) => void;
}> = ({ isTimer, setIsTimer, timerValue, setTimerValue }) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>();

  const [open, setOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handlePopoverChange = (event: any) => {
    if (isTimer) {
      setIsTimer(false);
      return;
    }
    setIsTimer(true);
    const updatePopover = popoverAnchor ? null : event.currentTarget;
    setPopoverAnchor(updatePopover);
    setOpen(Boolean(updatePopover));
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 10);
  };

  const id = open ? 'spring-popper' : undefined;

  return (
    <div className='GameControllerButtonContainer'>
      <div className='GameControllerButton' onClick={handlePopoverChange} data-testid='timer-pop'>
        <IconButton data-testid='timer-button'>
          <TimerIcon fontSize='large' style={{ color: isTimer ? green[500] : grey[500] }} />
        </IconButton>
      </div>
      <Popper
        id={id}
        open={open}
        anchorEl={popoverAnchor}
        placement='top'
        transition
        className={classes.popper}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={50}>
            <Paper>
              <ClickAwayListener
                onClickAway={() => {
                  setOpen(false);
                  setPopoverAnchor(null);
                  if (!timerValue) {
                    setIsTimer(false);
                  }
                }}
              >
                <Paper className={classes.popoverRoot}>
                  <span className={classes.arrow} ref={setArrowRef} />
                  <div className='timerPopoverContainer'>
                    <Input
                      type='number'
                      value={timerValue}
                      className='timerInput'
                      data-testid='timer-input'
                      onChange={(e) => {
                        setTimerValue(e.target.value);
                      }}
                      inputRef={inputRef}
                    ></Input>
                    <label className='seconds-label'>secs</label>
                  </div>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Typography variant='caption'>Timer</Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    popoverRoot: {
      backgroundColor: '#75a1de21',
      maxWidth: 1000,
    },
    content: {
      padding: theme.spacing(10),
    },
    popper: {
      zIndex: 2000,
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '0 100%',
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '100% 0',
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '100% 100%',
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '0 0',
        },
      },
    },
    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: '1em',
      height: '0.71em',
      boxSizing: 'border-box',
      color: '#75a1de21',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        boxShadow: theme.shadows[1],
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)',
      },
    },
  };
});
