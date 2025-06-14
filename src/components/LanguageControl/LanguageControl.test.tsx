import '@testing-library/jest-dom'; // for extended matchers
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageControl } from './LanguageControl';

describe('LanguageControl component', () => {
  test('should render with default language', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');
    expect(wrapperNode).toHaveValue('en-US');
  });

  test('should changes language when selecting a flag option', async () => {
    render(<LanguageControl />);

    const wrapperNode = screen.getByTestId('language-control');

    fireEvent.mouseDown(wrapperNode);

    fireEvent.change(wrapperNode, { target: { value: 'pt-BR' } });

    expect(wrapperNode).toHaveValue('pt-BR');
  });
});
