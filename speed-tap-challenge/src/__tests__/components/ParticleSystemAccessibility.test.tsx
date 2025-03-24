import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { axe, toHaveNoViolations } from 'jest-axe';
import ParticleSystem from '../../components/ParticleSystem';

expect.extend(toHaveNoViolations);

describe('ParticleSystem Accessibility Tests', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<ParticleSystem position={{ x: 0, y: 0 }} score={0} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should be compatible with screen readers', () => {
    render(<ParticleSystem position={{ x: 0, y: 0 }} score={0} />);
    const canvas = screen.getByRole('canvas');
    expect(canvas).toHaveAccessibleName('Particle System');
  });
});