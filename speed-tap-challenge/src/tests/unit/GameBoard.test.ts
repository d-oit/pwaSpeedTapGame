import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameBoard from '@/components/GameBoard';

test('score increments on tap', () => {
  const { getByTestId } = render(<GameBoard />);
  const target = getByTestId('target');
  const scoreDisplay = getByTestId('score');

  fireEvent.pointerDown(target);
  expect(scoreDisplay.textContent).toBe('1');
});

test('score resets to zero on game restart', () => {
  const { getByTestId } = render(<GameBoard />);
  const target = getByTestId('target');
  const scoreDisplay = getByTestId('score');
  const restartButton = getByTestId('restart-button');

  fireEvent.pointerDown(target);
  fireEvent.click(restartButton);
  expect(scoreDisplay.textContent).toBe('0');
});

test('timer decrements correctly', () => {
  const { getByTestId } = render(<GameBoard />);
  const timerDisplay = getByTestId('timer');

  // Assuming the timer starts at 60 seconds
  expect(timerDisplay.textContent).toBe('60');
  // Simulate time passing (this is a mock, actual implementation may vary)
  jest.advanceTimersByTime(1000);
  expect(timerDisplay.textContent).toBe('59');
});

test('game ends when timer reaches zero', () => {
  const { getByTestId } = render(<GameBoard />);
  const timerDisplay = getByTestId('timer');
  const gameOverMessage = getByTestId('game-over');

  // Simulate timer running out
  jest.advanceTimersByTime(60000);
  expect(timerDisplay.textContent).toBe('0');
  expect(gameOverMessage).toBeInTheDocument();
});

test('target moves to a new random position after each tap', () => {
  const { getByTestId } = render(<GameBoard />);
  const target = getByTestId('target');
  const initialPosition = target.style.transform;

  fireEvent.pointerDown(target);
  const newPosition = target.style.transform;
  expect(newPosition).not.toBe(initialPosition);
});

test('environment variables are loaded correctly', () => {
  const { getByTestId } = render(<GameBoard />);
  const gameDuration = getByTestId('game-duration');
  const targetSize = getByTestId('target-size');

  expect(gameDuration.textContent).toBe('60'); // Assuming default game duration is 60 seconds
  expect(targetSize.textContent).toBe('50'); // Assuming default target size is 50 pixels
});