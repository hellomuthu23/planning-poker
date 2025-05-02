import { render, screen, fireEvent } from '@testing-library/react';
import { InfoDialog } from './InfoDialog';

describe('InfoDialog component', () => {
  const onOkFunction = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <InfoDialog title='title test' message='message test' onOk={onOkFunction}>
        <button data-testid='info-dialog-button'>InfoDialog button</button>
      </InfoDialog>
    );
    const button = screen.getByTestId('info-dialog-button');
    fireEvent.click(button);
  });

  it('should render and open by click on children', () => {
    const element = screen.getByTestId('info-dialog');
    expect(element).toBeInTheDocument();
  });

  it('should close by click on ok button', () => {
    onOkFunction.mockClear();
    const element = screen.getByTestId('info-dialog-ok');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onOkFunction).toHaveBeenCalledWith();
  });
});
