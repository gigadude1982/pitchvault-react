import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  it('displays the "Pitch Vault" wordmark text in the DOM', () => {
    render(<Footer />);
    expect(screen.getByText(/pitch vault/i)).toBeInTheDocument();
  });

  it('displays the "A UGC Marketplace" tagline text in the DOM', () => {
    render(<Footer />);
    expect(screen.getByText(/a ugc marketplace/i)).toBeInTheDocument();
  });

  it('renders the tagline inside the same branding container as the wordmark', () => {
    render(<Footer />);
    const wordmark = screen.getByText(/pitch vault/i);
    const tagline = screen.getByText(/a ugc marketplace/i);
    // Both elements must share a common ancestor container
    expect(wordmark.closest('[class]') || wordmark.parentElement).toBeTruthy();
    const wordmarkContainer =
      wordmark.closest('[class]') || wordmark.parentElement;
    expect(wordmarkContainer.contains(tagline) ||
      tagline.closest('[class]') === wordmarkContainer ||
      wordmark.parentElement === tagline.parentElement ||
      wordmark.parentElement.contains(tagline) ||
      tagline.parentElement.contains(wordmark)
    ).toBe(true);
  });

  it('applies a subordinate styling class to the tagline element', () => {
    render(<Footer />);
    const tagline = screen.getByText(/a ugc marketplace/i);
    // The tagline must carry at least one CSS class for subordinate/secondary styling
    expect(tagline.className).toBeTruthy();
    expect(tagline.className.length).toBeGreaterThan(0);
  });
});
