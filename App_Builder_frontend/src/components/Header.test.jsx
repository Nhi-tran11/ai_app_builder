import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './Header';

const renderHeaderWithRouter = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

test('renders Header component', () => {
	renderHeaderWithRouter();
	const linkElement = screen.getByText(/Web App Generator/i);
	expect(linkElement).toBeInTheDocument();
});