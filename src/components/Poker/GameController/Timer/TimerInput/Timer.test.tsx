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
  it('renders nothing if not mod', () => {
    render(<Timer timerProps={{ isMod: false }} />);
    expect(screen.queryByTestId('clock-svg')).not.toBeInTheDocument();
    expect(screen.queryByTestId('timer-progress')).not.toBeInTheDocument();
  });

  it('shows clock button if isMod', () => {
    render(<Timer timerProps={{ isMod: true }} />);
    expect(screen.getByTestId('clock-svg')).toBeInTheDocument();
  });

  it('shows TimerProgress when clock button is clicked', () => {
    render(<Timer timerProps={{ isMod: true }} />);
    fireEvent.click(screen.getByTestId('clock-svg').parentElement!);
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
  });

  it('closes TimerProgress when onTimerClose is called', () => {
    render(<Timer timerProps={{ isMod: true }} />);
    fireEvent.click(screen.getByTestId('clock-svg').parentElement!);
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('timer-progress')).not.toBeInTheDocument();
  });

  it('shows TimerProgress if timerVisible is true even if _showTimer is false', () => {
    render(<Timer timerProps={{ isMod: true, timerVisible: true }} />);
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
  });

  it('does not show TimerProgress if timerVisible is false and _showTimer is false', () => {
    render(<Timer timerProps={{ isMod: true, timerVisible: false }} />);
    expect(screen.queryByTestId('timer-progress')).not.toBeInTheDocument();
  });

  it('toggles TimerProgress on clock button click', () => {
    render(<Timer timerProps={{ isMod: true }} />);
    const clockBtn = screen.getByTestId('clock-svg').parentElement!;
    fireEvent.click(clockBtn);
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('timer-progress')).not.toBeInTheDocument();
    fireEvent.click(clockBtn);
    expect(screen.getByTestId('timer-progress')).toBeInTheDocument();
  });
});
