import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '@/App';

test('renders the game board', () => {
  render(<App />);
  const scoreElement = screen.getByText(/Score:/i);
  const timerElement = screen.getByText(/Time Left:/i);
  const tapButton = screen.getByText(/Tap Me!/i);
  const startButton = screen.getByText(/Start Game/i);

  expect(scoreElement).toBeInTheDocument();
  expect(timerElement).toBeInTheDocument();
  expect(tapButton).toBeInTheDocument();
  expect(startButton).toBeInTheDocument();
});

test('starts the game and updates the score', () => {
  render(<App />);
  const startButton = screen.getByText(/Start Game/i);
  const tapButton = screen.getByText(/Tap Me!/i);

  fireEvent.click(startButton);
  fireEvent.click(tapButton);

  const scoreElement = screen.getByText(/Score: 1/i);
  expect(scoreElement).toBeInTheDocument();
});

test('counts down the timer', async () => {
  jest.useFakeTimers();
  render(<App />);
  const startButton = screen.getByText(/Start Game/i);

  fireEvent.click(startButton);

  jest.advanceTimersByTime(1000);
  const timerElement = screen.getByText(/Time Left: 29/i);
  expect(timerElement).toBeInTheDocument();

  jest.advanceTimersByTime(29000);
  const finalTimerElement = screen.getByText(/Time Left: 0/i);
  expect(finalTimerElement).toBeInTheDocument();
});