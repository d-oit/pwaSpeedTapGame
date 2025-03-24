import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import GameBoard from '../components/GameBoard';

test('meets accessibility standards', async () => {
  const { container } = render(<GameBoard />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('keyboard navigation works', () => {
  const { getByTestId } = render(<GameBoard />);
  const target = getByTestId('target');

  target.focus();
  fireEvent.keyDown(target, { key: 'Enter' });

  expect(getByTestId('score').textContent).toBe('Score: 1');
});