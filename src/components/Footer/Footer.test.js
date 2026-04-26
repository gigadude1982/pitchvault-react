import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock the CSS module with all keys the component actually uses
jest.mock('./Footer.module.css', () => ({
  footer: 'footer',
  logo: 'logo',
  version: 'version',
  tagline: 'tagline',
}));

const defaultProps = {
  version: '1.0.0',
  year: 2024,
};

describe('Footer', () => {
  describe('Shield image removal', () => {
    it('renders no <img> element whose src contains "shield"', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const allImages = container.querySelectorAll('img');
      allImages.forEach((img) => {
        expect(img.getAttribute('src')).not.toMatch(/shield/i);
      });
    });

    it('renders no element with an alt attribute containing "shield"', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const allImages = container.querySelectorAll('img');
      allImages.forEach((img) => {
        const alt = img.getAttribute('alt') || '';
        expect(alt).not.toMatch(/shield/i);
      });
    });

    it('renders no element with a className containing "shield"', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const allElements = container.querySelectorAll('*');
      allElements.forEach((el) => {
        expect(el.className).not.toMatch(/shield/i);
      });
    });

    it('contains no broken image references — every img src is non-empty and does not reference shield', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const allImages = container.querySelectorAll('img');
      allImages.forEach((img) => {
        const src = img.getAttribute('src') || '';
        expect(src.length).toBeGreaterThan(0);
        expect(src).not.toMatch(/shield/i);
      });
    });
  });

  describe('Footer renders without errors after shield removal', () => {
    it('renders the footer container without throwing', () => {
      expect(() => render(<Footer {...defaultProps} />)).not.toThrow();
    });

    it('renders a semantic <footer> element (contentinfo landmark)', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('footer element carries the footer CSS module class', () => {
      const { container } = render(<Footer {...defaultProps} />);
      expect(container.querySelector('.footer')).not.toBeNull();
    });
  });

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
      it(`renders correctly at ${label} viewport width with no shield images`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        window.dispatchEvent(new Event('resize'));

        const { container } = render(<Footer {...defaultProps} />);

        expect(screen.getByText(/A GigaCorp production/i)).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();

        const allImages = container.querySelectorAll('img');
        allImages.forEach((img) => {
          expect(img.getAttribute('src')).not.toMatch(/shield/i);
        });
      });
    });
  });

  describe('GigaCorp hyperlink', () => {
    it('renders "GigaCorp" as a clickable anchor element', () => {
      render(<Footer {...defaultProps} />);
      const link = screen.getByRole('link', { name: /GigaCorp/i });
      expect(link).toBeInTheDocument();
    });

    it('anchor href points to https://www.gigacorp.co', () => {
      render(<Footer {...defaultProps} />);
      const link = screen.getByRole('link', { name: /GigaCorp/i });
      expect(link).toHaveAttribute('href', 'https://www.gigacorp.co');
    });

    it('anchor target is "_blank" so the link opens in a new tab', () => {
      render(<Footer {...defaultProps} />);
      const link = screen.getByRole('link', { name: /GigaCorp/i });
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('anchor rel is "noopener noreferrer" for security', () => {
      render(<Footer {...defaultProps} />);
      const link = screen.getByRole('link', { name: /GigaCorp/i });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('GigaCorp link is contained within the footer tagline span', () => {
      const { container } = render(<Footer {...defaultProps} />);
      const taglineEl = container.querySelector('.tagline');
      expect(taglineEl).not.toBeNull();
      const linkInsideTagline = taglineEl.querySelector('a');
      expect(linkInsideTagline).not.toBeNull();
      expect(linkInsideTagline).toHaveTextContent('GigaCorp');
    });

    it('the rest of the tagline text is preserved alongside the link', () => {
      render(<Footer {...defaultProps} />);
      const tagline = screen.getByTestId('footer-tagline');
      expect(tagline).toHaveTextContent('A GigaCorp production');
    });
  });

  describe('Snapshot regression', () => {
    it('matches the snapshot (shield-free footer with GigaCorp hyperlink)', () => {
      const { container } = render(<Footer {...defaultProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
