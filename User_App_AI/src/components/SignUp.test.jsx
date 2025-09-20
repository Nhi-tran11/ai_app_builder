import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';

const renderSignUpWithRouter = () => {
  return render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
};

test('renders SignUp component', () => {
    renderSignUpWithRouter();
    const linkElement = screen.getByText(/sign up/i);
    expect(linkElement).toBeInTheDocument();
});