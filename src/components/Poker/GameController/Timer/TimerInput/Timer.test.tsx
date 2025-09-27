import { render, screen, fireEvent } from '@testing-library/react';
import { Timer } from './Timer';

jest.mock('../TimerProgressPopup/TimerProgressPopup', () => ({
  TimerProgress: (props: any) => (
    <div data-testid='timer-progress'>
      TimerProgress
      <button onClick={props.onTimerClose}>Close</button>
    </div>
  ),
}));

jest.mock('../../../../SVGs/Clock', () => ({
  ClockSVG: (props: any) => <svg data-testid='clock-svg' {...props} />,
}));

describe('Timer', () => {
  const defaultProps = {
    timerProps: {
      isMod: true,
      timerVisible: false,
      timerPaused: false,
      currentSeconds: 0,
      totalSeconds: 300,
      soundOn: true,
    },
    onTimerUpdate: jest.fn(),
  };

  it('does not render clock or timer for non-mod', () => {
    render(<Timer timerProps={{ isMod: false }} onTimerUpdate={jest.fn()} />);
    expect(screen.queryByTestId('clock-svg')).not.toBeInTheDocument();
    expect(screen.queryByTestId('timer-progress')).not.toBeInTheDocument();
  });

  it('renders clock button for mod', () => {
    render(<Timer {...defaultProps} />);
    expect(screen.getByTestId('clock-svg')).toBeInTheDocument();
  });

  it('shows TimerProgress when clock button is clicked', () => {
    const onTimerUpdate = jest.fn();
    render(<Timer {...defaultProps} onTimerUpdate={onTimerUpdate} />);
    fireEvent.click(screen.getByTestId('clock-svg').parentElement!);
    // Simulate parent updating timerVisible to true
    render(
      <Timer
        {...defaultProps}
        timerProps={{ ...defaultProps.timerProps, timerVisible: true }}
        onTimerUpdate={onTimerUpdate}
      />,
    );
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
  });

  it('closes TimerProgress when onTimerClose is called', () => {
    const onTimerUpdate = jest.fn();
    render(
      <Timer
        {...defaultProps}
        timerProps={{ ...defaultProps.timerProps, timerVisible: true }}
        onTimerUpdate={onTimerUpdate}
      />,
    );
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(onTimerUpdate).toHaveBeenCalledWith({
      currentSeconds: 0,
      totalSeconds: 300,
      soundOn: true,
      timerPaused: false,
      timerVisible: false,
    });
  });

  it('shows TimerProgress if timerVisible is true', () => {
    render(
      <Timer {...defaultProps} timerProps={{ ...defaultProps.timerProps, timerVisible: true }} />,
    );
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
  });

  it('does not show TimerProgress if timerVisible is false', () => {
    render(<Timer {...defaultProps} />);
    expect(screen.queryByTestId('timer-progress')).not.toBeInTheDocument();
  });

  it('toggles TimerProgress on clock button click and close', () => {
    let timerVisible = false;
    const onTimerUpdate = jest.fn((update) => {
      timerVisible = update.timerVisible;
    });

    const { rerender } = render(
      <Timer
        {...defaultProps}
        timerProps={{ ...defaultProps.timerProps, timerVisible }}
        onTimerUpdate={onTimerUpdate}
      />,
    );
    // Open
    fireEvent.click(screen.getByTestId('clock-svg').parentElement!);
    expect(onTimerUpdate).toHaveBeenCalledWith({
      currentSeconds: 0,
      totalSeconds: 300,
      soundOn: true,
      timerPaused: false,
      timerVisible: true,
    });

    // Simulate parent updating timerVisible to true
    rerender(
      <Timer
        {...defaultProps}
        timerProps={{ ...defaultProps.timerProps, timerVisible: true }}
        onTimerUpdate={onTimerUpdate}
      />,
    );
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();

    // Close
    fireEvent.click(screen.getByText('Close'));
    expect(onTimerUpdate).toHaveBeenCalledWith({
      currentSeconds: 0,
      totalSeconds: 300,
      soundOn: true,
      timerPaused: false,
      timerVisible: false,
    });
  });
});
