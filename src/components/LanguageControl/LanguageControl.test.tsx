import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers
import { LanguageControl } from './LanguageControl';

describe('LanguageControl component', () => {
  test('should render with default language', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');
    const combobox = await within(wrapperNode).findByRole('combobox');

    expect(combobox).toHaveTextContent('🇺🇸');
  });

  test('should changes language when selecting a flag option', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');
    const combobox = await within(wrapperNode).findByRole('combobox');

    fireEvent.mouseDown(combobox);

    const option = await screen.findByRole('option', {
      name: new RegExp('🇧🇷'),
    });

    fireEvent.click(option);

    expect(combobox).toHaveTextContent('🇧🇷');
  });
});
