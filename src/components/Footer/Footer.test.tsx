import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Footer component', () => {
  it('should render copyright', () => {
    render(<Footer />);
    const element = screen.getByText('hellomuthu23');
    expect(element).toBeInTheDocument();
  });
  it('should render feedback', () => {
    render(<Footer />);
    const element = screen.getByText('Feedback: hellomuthu23@gmail.com');
    expect(element).toBeInTheDocument();
  });
  it('should show link to submit issue', () => {
    render(<Footer />);
    const element = screen.getByText('Submit an Issue');
    expect(element).toBeInTheDocument();
  });
});
