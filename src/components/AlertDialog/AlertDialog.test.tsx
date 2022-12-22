import { render, screen, fireEvent } from '@testing-library/react';
import { AlertDialog } from './AlertDialog';

describe('AlertDialog component', () => {
  
  const onConfirmFunction = jest.fn();
  const onCancelFunction = jest.fn();

  beforeEach(() => {
    render(
      <AlertDialog title="title test" message="message test" onConfirm={onConfirmFunction} onCancel={onCancelFunction}>
        <button data-testid="alert-dialog-button">AlertDialog button</button>
      </AlertDialog>
    );
    const button = screen.getByTestId('alert-dialog-button');
    fireEvent.click(button);
  });

  it('should render and open by click on children', () => {
    const element = screen.getByTestId('alert-dialog');
    expect(element).toBeInTheDocument();
  });

  it('should execute function on confirm button', () => {
    onConfirmFunction.mockClear();
    const element = screen.getByTestId('alert-dialog-confirm');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onConfirmFunction).toHaveBeenCalled();
  });

  it('should close by click on cancel button', () => {
    onCancelFunction.mockClear();
    const element = screen.getByTestId('alert-dialog-cancel');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onCancelFunction).toHaveBeenCalledWith();
  });
});
