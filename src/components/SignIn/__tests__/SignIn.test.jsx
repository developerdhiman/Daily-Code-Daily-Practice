import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../SignIn';
import auth from '../../../firebase/firebase.init'; // We'll need this for assertions
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

// Mock firebase/auth
// Note: Vitest hoists vi.mock calls, so this will apply to imports above too.
vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal(); // Import actual module to get other exports if needed
  return {
    ...actual, // Spread actual exports
    sendPasswordResetEmail: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  };
});

// Mock firebase.init.js if it's doing more than just exporting auth
// For now, assuming it just exports the auth object, so direct import might be fine
// If auth itself is initialized in a complex way in firebase.init.js, that might need mocking too.
// However, the component imports 'auth' directly, so we should be able to use it in assertions.

describe('SignIn Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  // Test initial render
  test('renders login form by default', () => {
    render(<SignIn />);
    expect(screen.getByText('Login now!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  // Test visibility of forgot password form
  test('shows forgot password form when "Forgot password?" is clicked', () => {
    render(<SignIn />);
    const forgotPasswordLink = screen.getByText('Forgot password?');
    fireEvent.click(forgotPasswordLink);

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Reset Email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  // Test successful password reset email
  test('calls sendPasswordResetEmail and shows success message on valid email', async () => {
    // sendPasswordResetEmail is already mocked via vi.mock at the top
    sendPasswordResetEmail.mockResolvedValueOnce(undefined); // Simulate successful email sending

    render(<SignIn />);
    fireEvent.click(screen.getByText('Forgot password?'));

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const sendButton = screen.getByRole('button', { name: /Send Reset Email/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'test@example.com');
    });
    await waitFor(() => {
      expect(screen.getByText('Password reset email sent. Check your inbox.')).toBeInTheDocument();
    });
    // Check if the form is hidden after success
    expect(screen.queryByPlaceholderText('Enter your email')).not.toBeInTheDocument();
  });

  // Test password reset email failure
  test('shows error message when sendPasswordResetEmail fails', async () => {
    const errorMessage = 'Firebase: Error (auth/user-not-found).';
    sendPasswordResetEmail.mockRejectedValueOnce({ message: errorMessage });

    render(<SignIn />);
    fireEvent.click(screen.getByText('Forgot password?'));

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const sendButton = screen.getByRole('button', { name: /Send Reset Email/i });

    fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'nonexistent@example.com');
    });
    await waitFor(() => {
      expect(screen.getByText(`Error sending password reset email: ${errorMessage}`)).toBeInTheDocument();
    });
    // Form should still be visible for user to retry or cancel
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  // Test password reset attempt with no email
  test('shows error message if no email is provided for password reset', async () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText('Forgot password?'));

    const sendButton = screen.getByRole('button', { name: /Send Reset Email/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
    });
    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  // Test cancelling the forgot password form
  test('hides forgot password form when "Cancel" is clicked', () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText('Forgot password?'));

    // Ensure form is visible first
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.queryByPlaceholderText('Enter your email')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Send Reset Email/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Cancel/i })).not.toBeInTheDocument();
  });
});
