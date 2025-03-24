import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { axe, toHaveNoViolations } from 'jest-axe';
import GameBoard from '../../components/GameBoard';

expect.extend(toHaveNoViolations);

describe('GameBoard Accessibility Tests', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<GameBoard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should be navigable with keyboard', () => {
    render(<GameBoard />);
    const startButton = screen.getByTestId('start-button');
    startButton.focus();
    fireEvent.keyDown(startButton, { key: 'Enter', code: 'Enter' });
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0');
  });

  test('should be compatible with screen readers', () => {
    render(<GameBoard />);
    const startButton = screen.getByTestId('start-button');
    expect(startButton).toHaveAccessibleName('Start Game');
  });
});