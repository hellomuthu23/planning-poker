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
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders timer UI correctly for mod', () => {
    render(<TimerProgress {...baseProps} />);

    expect(screen.getByTitle('Disable sound')).toBeInTheDocument();
    expect(screen.getByTitle('Close Timer')).toBeInTheDocument();
    expect(screen.getByTitle('Start Timer')).toBeInTheDocument();
    expect(screen.getByTitle('Reset Timer')).toBeInTheDocument();
    expect(screen.getByTestId('circular-progress-bar')).toBeInTheDocument();

    // Initial values
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('02');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('00');
  });

  it('handles sound toggle correctly', () => {
    render(<TimerProgress {...baseProps} />);
    const soundBtn = screen.getByTitle('Disable sound');

    // Initial state
    expect(soundBtn).toHaveTextContent('🔊');

    // Toggle sound
    fireEvent.click(soundBtn);
    expect(screen.getByTitle('Enable sound')).toHaveTextContent('🔇');

    // Toggle back
    fireEvent.click(screen.getByTitle('Enable sound'));
    expect(screen.getByTitle('Disable sound')).toHaveTextContent('🔊');
  });

  it('prevents sound toggle for non-mod', () => {
    render(<TimerProgress {...baseProps} isMod={false} />);
    const soundBtn = screen.getByTitle('Sound Enabled');

    expect(soundBtn).toHaveTextContent('🔊');
    fireEvent.click(soundBtn);
    expect(screen.getByTitle('Sound Enabled')).toHaveTextContent('🔊');
  });

  it('handles timer controls correctly', () => {
    render(<TimerProgress {...baseProps} />);

    // Start timer
    fireEvent.click(screen.getByTitle('Start Timer'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTitle('Pause Timer')).toBeInTheDocument();

    // Pause timer
    fireEvent.click(screen.getByTitle('Pause Timer'));
    expect(screen.getByTitle('Start Timer')).toBeInTheDocument();

    // Reset timer
    fireEvent.click(screen.getByTitle('Reset Timer'));
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('02');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('00');
  });

  it('updates parent component state correctly', () => {
    render(<TimerProgress {...baseProps} />);

    fireEvent.click(screen.getByTitle('Start Timer'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(baseProps.onTimerStateUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        currentSeconds: expect.any(Number),
        totalSeconds: 120,
        timerPaused: false,
        soundOn: true,
      }),
    );
  });

  it('handles input field changes correctly', () => {
    render(<TimerProgress {...baseProps} />);

    const minutesInput = screen.getAllByRole('textbox')[0];
    const secondsInput = screen.getAllByRole('textbox')[1];

    fireEvent.change(minutesInput, { target: { value: '03' } });
    fireEvent.change(secondsInput, { target: { value: '30' } });

    expect(minutesInput).toHaveValue('03');
    expect(secondsInput).toHaveValue('30');
  });

  it('disables controls appropriately', () => {
    render(<TimerProgress {...baseProps} />);

    fireEvent.click(screen.getByTitle('Start Timer'));

    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
    expect(screen.getAllByRole('textbox')[1]).toBeDisabled();
    expect(screen.queryByTitle('Start Timer')).not.toBeInTheDocument();
  });
});
