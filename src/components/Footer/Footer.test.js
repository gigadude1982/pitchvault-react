import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the text "A GigaCorp production" in the footer', () => {
    render(<Footer />);
    expect(screen.getByText(/A GigaCorp production/i)).toBeInTheDocument();
  });

  it('branding text element exists within the footer landmark', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    const branding = screen.getByText(/A GigaCorp production/i);
    expect(footer).toContainElement(branding);
  });

  it('branding text element has a CSS class for small-font and muted styling', () => {
    render(<Footer />);
    const branding = screen.getByText(/A GigaCorp production/i);
    const classList = Array.from(branding.classList);
    const hasExpectedClass = classList.some((cls) =>
      /branding|muted|small|gigacorp|footer-branding|footerBranding/i.test(cls)
    );
    expect(hasExpectedClass).toBe(true);
  });

  it('renders correctly when an optional version prop is supplied', () => {
    render(<Footer version="1.1.4" />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/A GigaCorp production/i)).toBeInTheDocument();
  });
});
