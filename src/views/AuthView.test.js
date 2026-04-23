import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthView from './AuthView';

jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => jest.fn(),
}));

describe('AuthView heading', () => {
  it('displays "A UGC Marketplace" on the login (signin) screen', () => {
    render(<AuthView />);
    expect(screen.getByText('A UGC Marketplace')).toBeInTheDocument();
  });

  it('does not display "Welcome back." on the login screen', () => {
    render(<AuthView />);
    expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
  });

  it('displays "A UGC Marketplace" on the signup screen', async () => {
    render(<AuthView />);
    await userEvent.click(screen.getByRole('button', { name: /create one/i }));
    expect(screen.getByText('A UGC Marketplace')).toBeInTheDocument();
  });

  it('does not display "Welcome back." on the signup screen', async () => {
    render(<AuthView />);
    await userEvent.click(screen.getByRole('button', { name: /create one/i }));
    expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
  });
});
