import { render, screen, fireEvent, act } from '@testing-library/react';
import { TimerProgress } from './TimerProgressPopup';

jest.mock('../../../../elements/CircularProgressBar', () => ({
  __esModule: true,
  default: ({ percentage, children }: any) => (
    <div data-testid='circular-progress-bar' data-percentage={percentage}>
      {children}
    </div>
  ),
}));

describe('TimerProgress', () => {
  const baseProps = {
    isMod: true,
    currentSeconds: 0,
    totalSeconds: 120,
    soundOn: true,
    timerPaused: false,
    onTimerClose: jest.fn(),
    onTimerStateUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders timer UI for mod', () => {
    render(<TimerProgress {...baseProps} />);
    expect(screen.getByTitle('Mute sound')).toBeInTheDocument();
    expect(screen.getByTitle('Close Timer')).toBeInTheDocument();
    expect(screen.getByTitle('Start Timer')).toBeInTheDocument();
    expect(screen.getByTitle('Reset Timer')).toBeInTheDocument();
    expect(screen.getByTestId('circular-progress-bar')).toBeInTheDocument();
  });

  it('toggles sound icon', () => {
    render(<TimerProgress {...baseProps} />);
    const soundBtn = screen.getByTitle('Mute sound');
    expect(soundBtn).toHaveTextContent('🔊');
    fireEvent.click(soundBtn);
    expect(screen.getByTitle('Unmute sound')).toHaveTextContent('🔇');
  });

  it('calls onTimerClose when close button clicked', () => {
    render(<TimerProgress {...baseProps} />);
    fireEvent.click(screen.getByTitle('Close Timer'));
    expect(baseProps.onTimerClose).toHaveBeenCalled();
  });

  it('calls onTimerStateUpdate on state change', () => {
    render(<TimerProgress {...baseProps} />);
    fireEvent.click(screen.getByTitle('Start Timer'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(baseProps.onTimerStateUpdate).toHaveBeenCalled();
  });

  it('increments timer only after clicking start (mod)', () => {
    render(<TimerProgress {...baseProps} />);
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('00');
    fireEvent.click(screen.getByTitle('Start Timer'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('58');
  });

  it('does not increment timer automatically for mod', () => {
    render(<TimerProgress {...baseProps} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('00');
  });

  it('pauses timer when pause button clicked', () => {
    render(<TimerProgress {...baseProps} />);
    fireEvent.click(screen.getByTitle('Start Timer'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByTitle('Pause Timer'));
    const secondsBefore = screen.getAllByRole('textbox')[1].getAttribute('value');
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getAllByRole('textbox')[1]).toHaveAttribute('value', secondsBefore);
  });

  it('resets timer when reset button clicked', () => {
    render(<TimerProgress {...baseProps} />);
    fireEvent.click(screen.getByTitle('Start Timer'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByTitle('Reset Timer'));
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('02');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('00');
  });

  it('does not render mod controls if not mod', () => {
    render(<TimerProgress {...baseProps} isMod={false} />);
    expect(screen.queryByTitle('Close Timer')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Start Timer')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Pause Timer')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Reset Timer')).not.toBeInTheDocument();
  });

  it('disables input fields when timer is running', () => {
    render(<TimerProgress {...baseProps} />);
    fireEvent.click(screen.getByTitle('Start Timer'));
    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
    expect(screen.getAllByRole('textbox')[1]).toBeDisabled();
  });

  it('enables input fields when timer is not running', () => {
    render(<TimerProgress {...baseProps} />);
    expect(screen.getAllByRole('textbox')[0]).not.toBeDisabled();
    expect(screen.getAllByRole('textbox')[1]).not.toBeDisabled();
  });

  it('shows pause button when timer is running', () => {
    render(<TimerProgress {...baseProps} />);
    fireEvent.click(screen.getByTitle('Start Timer'));
    expect(screen.getByTitle('Pause Timer')).toBeInTheDocument();
  });

  it('shows start button when timer is not running', () => {
    render(<TimerProgress {...baseProps} />);
    expect(screen.getByTitle('Start Timer')).toBeInTheDocument();
  });
});
