import '@testing-library/jest-dom'; // for extended matchers
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    waitFor(() => expect(wrapperNode).toHaveValue('pt-BR'), { timeout: 1000 });
  });

  test('should show loading indicator when changing language', async () => {
    render(<LanguageControl />);
    const select = screen.getByTestId('language-control');
    fireEvent.change(select, { target: { value: 'fr-FR' } });

    // Loading indicator should appear

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for loading to finish
    await new Promise((r) => setTimeout(r, 60));
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
  });

  test('should render all language options', () => {
    render(<LanguageControl />);
    const select = screen.getByTestId('language-control');
    expect(select).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
    expect(screen.getByText(/Français/)).toBeInTheDocument();
    expect(screen.getByText(/Deutsch/)).toBeInTheDocument();
    expect(screen.getByText(/Dutch/)).toBeInTheDocument();
    expect(screen.getByText(/Português/)).toBeInTheDocument();
    expect(screen.getByText(/繁體中文/)).toBeInTheDocument();
    expect(screen.getByText(/Русский/)).toBeInTheDocument();
    expect(screen.getByText(/हिंदी/)).toBeInTheDocument();
    expect(screen.getByText(/தமிழ்/)).toBeInTheDocument();
  });
});
