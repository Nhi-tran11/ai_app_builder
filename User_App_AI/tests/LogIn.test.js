import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LogIn from '../src/components/LogIn';

// Mock fetch for API calls
global.fetch = jest.fn();

// Helper function to render LogIn component with Router
const renderLogInWithRouter = () => {
  return render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );
};

describe('LogIn Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders login component with all elements', () => {
    renderLogInWithRouter();
    
    // Check if main elements are rendered
    expect(screen.getByText('Welcome Back! 🍋')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    
    // Check form elements
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up here' })).toBeInTheDocument();
  });

  test('renders email input field with correct attributes', () => {
    renderLogInWithRouter();
    
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
    expect(emailInput).toHaveAttribute('name', 'email');
  });

  test('renders password input field with correct attributes', () => {
    renderLogInWithRouter();
    
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');
    expect(passwordInput).toHaveAttribute('name', 'pswd');
  });

  test('renders remember me checkbox', () => {
    renderLogInWithRouter();
    
    const checkbox = screen.getByLabelText('Remember me');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', 'remember');
  });

  test('allows user to type in email input', () => {
    renderLogInWithRouter();
    
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('allows user to type in password input', () => {
    renderLogInWithRouter();
    
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  test('displays error message when login fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    renderLogInWithRouter();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('calls fetch with correct parameters on form submission', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Login successful' }),
    });

    renderLogInWithRouter();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        })
      });
    });
  });

  test('renders signup link text', () => {
    renderLogInWithRouter();
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  test('has correct CSS classes applied', () => {
    renderLogInWithRouter();
    
    // Check main container classes
    const container = screen.getByText('Welcome Back! 🍋').closest('.login-container');
    expect(container).toBeInTheDocument();
    
    const card = screen.getByText('Welcome Back! 🍋').closest('.login-card');
    expect(card).toBeInTheDocument();
  });
});
