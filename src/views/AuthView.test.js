import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthView from './AuthView';

const mockNavigate = jest.fn();

jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('AuthView', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Login screen (signin mode — default)', () => {
    it('renders the heading "A UGC Marketplace" on the login screen', () => {
      render(<AuthView />);
      expect(screen.getByText('A UGC Marketplace')).toBeInTheDocument();
    });

    it('does NOT render the heading "Welcome Back" on the login screen', () => {
      render(<AuthView />);
      expect(screen.queryByText('Welcome Back')).not.toBeInTheDocument();
      expect(screen.queryByText('Welcome back.')).not.toBeInTheDocument();
    });

    it('renders the Sign In submit button confirming signin mode is active', () => {
      render(<AuthView />);
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  describe('Signup screen (signup mode)', () => {
    const renderSignup = () => {
      render(<AuthView />);
      fireEvent.click(screen.getByRole('button', { name: /create one/i }));
    };

    it('renders the heading "A UGC Marketplace" on the signup screen', () => {
      renderSignup();
      expect(screen.getByText('A UGC Marketplace')).toBeInTheDocument();
    });

    it('does NOT render the heading "Welcome Back" on the signup screen', () => {
      renderSignup();
      expect(screen.queryByText('Welcome Back')).not.toBeInTheDocument();
      expect(screen.queryByText('Welcome back.')).not.toBeInTheDocument();
    });

    it('renders the Create Account submit button confirming signup mode is active', () => {
      renderSignup();
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });
  });

  describe('Heading element typography consistency', () => {
    it('heading is rendered inside an element with the className "auth-tagline" (consistent tag/class)', () => {
      const { container } = render(<AuthView />);
      const taglineEl = container.querySelector('.auth-tagline');
      expect(taglineEl).toBeInTheDocument();
      expect(taglineEl).toHaveTextContent('A UGC Marketplace');
    });

    it('heading element retains the "auth-tagline" className on the signup screen', () => {
      const { container } = render(<AuthView />);
      fireEvent.click(screen.getByRole('button', { name: /create one/i }));
      const taglineEl = container.querySelector('.auth-tagline');
      expect(taglineEl).toBeInTheDocument();
      expect(taglineEl).toHaveTextContent('A UGC Marketplace');
    });

    it('only one auth-tagline element is present in the DOM (no duplicate headings)', () => {
      const { container } = render(<AuthView />);
      const taglineEls = container.querySelectorAll('.auth-tagline');
      expect(taglineEls).toHaveLength(1);
    });
  });

  describe('Heading visibility and DOM presence', () => {
    it('heading is present and visible in the DOM on initial render (login screen)', () => {
      render(<AuthView />);
      const heading = screen.getByText('A UGC Marketplace');
      expect(heading).toBeVisible();
    });

    it('heading is present and visible in the DOM after switching to signup screen', () => {
      render(<AuthView />);
      fireEvent.click(screen.getByRole('button', { name: /create one/i }));
      const heading = screen.getByText('A UGC Marketplace');
      expect(heading).toBeVisible();
    });

    it('heading is present and visible after switching back to login from signup', () => {
      render(<AuthView />);
      fireEvent.click(screen.getByRole('button', { name: /create one/i }));
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
      const heading = screen.getByText('A UGC Marketplace');
      expect(heading).toBeVisible();
    });

    it('heading is not hidden via aria-hidden attribute', () => {
      render(<AuthView />);
      const heading = screen.getByText('A UGC Marketplace');
      expect(heading).not.toHaveAttribute('aria-hidden', 'true');
    });

    it('heading text is unique and queryable by exact text match', () => {
      render(<AuthView />);
      const results = screen.getAllByText('A UGC Marketplace');
      expect(results).toHaveLength(1);
    });
  });

  describe('Auth card structural integrity', () => {
    it('renders the auth-card wrapper containing the heading', () => {
      const { container } = render(<AuthView />);
      const card = container.querySelector('.auth-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('A UGC Marketplace');
    });

    it('renders the Pitch Vault logo section alongside the heading', () => {
      render(<AuthView />);
      expect(screen.getByText('Pitch Vault')).toBeInTheDocument();
      expect(screen.getByAltText('PitchVault')).toBeInTheDocument();
    });

    it('heading coexists with role selection buttons (Brand / Creator)', () => {
      render(<AuthView />);
      expect(screen.getByText('A UGC Marketplace')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /brand/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /creator/i })).toBeInTheDocument();
    });
  });
});
