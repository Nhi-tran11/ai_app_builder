import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

test('renders HomePage component', () => {
  const { getByText } = render(<HomePage />);
  const linkElement = getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});