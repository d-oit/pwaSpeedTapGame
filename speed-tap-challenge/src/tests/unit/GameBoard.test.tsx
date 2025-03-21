import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import GameBoard from '../../components/GameBoard';

describe('GameBoard Component', () => {
  test('score increments on tap', () => {
    const { getByTestId } = render(<GameBoard />);
    const target = getByTestId('target');
    const scoreDisplay = getByTestId('score');

    fireEvent.click(target);
    expect(scoreDisplay.textContent).toBe('Score: 1');
  });

  test('score resets to zero on game restart', () => {
    const { getByTestId } = render(<GameBoard />);
    const target = getByTestId('target');
    const scoreDisplay = getByTestId('score');
    const startButton = getByTestId('start-button');

    fireEvent.click(target);
    fireEvent.click(startButton);
    expect(scoreDisplay.textContent).toBe('Score: 0');
  });

  test('timer decrements correctly', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<GameBoard />);
    const timerDisplay = getByTestId('timer');

    expect(timerDisplay.textContent).toBe('Time Left: 30');
    jest.advanceTimersByTime(1000);
    expect(timerDisplay.textContent).toBe('Time Left: 29');
  });

  test('game ends when timer reaches zero', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<GameBoard />);
    const timerDisplay = getByTestId('timer');

    jest.advanceTimersByTime(30000);
    expect(timerDisplay.textContent).toBe('Time Left: 0');
  });

  test('target moves to a new random position after each tap', () => {
    const { getByTestId } = render(<GameBoard />);
    const target = getByTestId('target');
    const initialPosition = target.style.transform;

    fireEvent.click(target);
    const newPosition = target.style.transform;
    expect(newPosition).not.toBe(initialPosition);
  });
});