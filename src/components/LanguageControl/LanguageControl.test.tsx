import '@testing-library/jest-dom'; // for extended matchers
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageControl } from './LanguageControl';

describe('LanguageControl component', () => {
  test('should render with default language', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');

    expect(wrapperNode).toHaveTextContent('🇺🇸');
  });

  test('should changes language when selecting a flag option', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');

    fireEvent.mouseDown(wrapperNode);

    const option = await screen.findByRole('option', {
      name: new RegExp('🇧🇷'),
    });

    fireEvent.click(option);

    expect(wrapperNode).toHaveTextContent('🇧🇷');
  });
});
