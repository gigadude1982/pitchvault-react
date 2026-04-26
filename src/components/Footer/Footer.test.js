import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock the CSS module with the keys the component actually uses
jest.mock('./Footer.module.css', () => ({
  footer: 'footer',
  tagline: 'tagline',
}));

const defaultProps = {
  version: '1.0.0',
  year: 2024,
};

describe('Footer', () => {
  describe('Branding text rendering', () => {
    it('renders the branding text "A GigaCorp production"', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByText(/A GigaCorp production/i)).toBeInTheDocument();
    });

    it('branding element carries the tagline CSS module class', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const brandingEl = container.querySelector('.tagline');
      expect(brandingEl).not.toBeNull();
      expect(brandingEl).toHaveTextContent('A GigaCorp production');
    });
  });

  describe('Semantic structure', () => {
    it('renders a semantic <footer> element', () => {
      render(<Footer {...defaultProps} />);
      const footerEl = screen.getByRole('contentinfo');
      expect(footerEl).toBeInTheDocument();
    });

    it('footer element carries the footer CSS module class', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const footerEl = container.querySelector('.footer');
      expect(footerEl).not.toBeNull();
    });
  });

  describe('Version and year props', () => {
    it('renders the passed version string', () => {
      render(<Footer version="2.5.3" year={2024} />);
      expect(screen.getByText(/2\.5\.3/)).toBeInTheDocument();
    });

    it('renders the passed year', () => {
      render(<Footer version="1.0.0" year={2030} />);
      expect(screen.getByText(/2030/)).toBeInTheDocument();
    });
  });

  describe('Responsive rendering', () => {
    const viewports = [
      { label: '320px (mobile)', width: 320 },
      { label: '768px (tablet)', width: 768 },
      { label: '1024px (desktop)', width: 1024 },
    ];

    viewports.forEach(({ label, width }) => {
      it(`renders branding text correctly at ${label} viewport width`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        window.dispatchEvent(new Event('resize'));

        render(<Footer {...defaultProps} />);
        expect(screen.getByText(/A GigaCorp production/i)).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      });
    });
  });

  describe('Snapshot regression', () => {
    it('matches the snapshot', () => {
      const { container } = render(<Footer {...defaultProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
