import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './LogIn';

const renderLogInWithRouter = () => {
  return render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );
};

test('renders LogIn component', () => {
	renderLogInWithRouter();
	const linkElement = screen.getByText(/Welcome Back!/i);
	expect(linkElement).toBeInTheDocument();
  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/Password/i);
  expect(passwordInput).toBeInTheDocument();
  const signInButton = screen.getByRole('button', { name: /Sign In/i });
  expect(signInButton).toBeInTheDocument();
  const signUpPrompt = screen.getByText(/Don't have an account?/i);
  expect(signUpPrompt).toBeInTheDocument();
  
});