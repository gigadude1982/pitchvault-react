import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock CSS modules so className assertions work predictably
jest.mock('./Footer.module.css', () => ({
  footer: 'footer',
  brand: 'brand',
  tagline: 'tagline',
}), { virtual: true });

describe('Footer', () => {
  // ---------------------------------------------------------------------------
  // Helper – render once and reuse within each describe block
  // ---------------------------------------------------------------------------
  const renderFooter = () => render(<Footer />);

  // ---------------------------------------------------------------------------
  // 1. Brand text
  // ---------------------------------------------------------------------------
  describe('brand text', () => {
    it('renders "Pitch Vault" text', () => {
      renderFooter();
      expect(screen.getByText(/pitch vault/i)).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Tagline text
  // ---------------------------------------------------------------------------
  describe('tagline text', () => {
    it('renders "A UGC Marketplace" text', () => {
      renderFooter();
      expect(screen.getByText(/a ugc marketplace/i)).toBeInTheDocument();
    });

    it('tagline text is not empty', () => {
      renderFooter();
      const tagline = screen.getByText(/a ugc marketplace/i);
      expect(tagline.textContent.trim()).toBeTruthy();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. DOM ordering – tagline appears after brand text
  // ---------------------------------------------------------------------------
  describe('element ordering', () => {
    it('renders the tagline element after the brand text element in the DOM', () => {
      const { container } = renderFooter();
      const allText = container.textContent;
      const brandIndex = allText.indexOf('Pitch Vault');
      const taglineIndex = allText.indexOf('A UGC Marketplace');
      expect(brandIndex).toBeGreaterThanOrEqual(0);
      expect(taglineIndex).toBeGreaterThanOrEqual(0);
      expect(taglineIndex).toBeGreaterThan(brandIndex);
    });

    it('tagline node appears after brand node in the DOM tree', () => {
      const { container } = renderFooter();
      const brandEl = screen.getByText(/pitch vault/i);
      const taglineEl = screen.getByText(/a ugc marketplace/i);
      // Node.DOCUMENT_POSITION_FOLLOWING === 4
      const position = brandEl.compareDocumentPosition(taglineEl);
      // eslint-disable-next-line no-bitwise
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Semantic <footer> root element
  // ---------------------------------------------------------------------------
  describe('semantic HTML', () => {
    it('renders a <footer> element as the root (contentinfo landmark)', () => {
      renderFooter();
      // getByRole('contentinfo') matches the <footer> landmark
      const footerEl = screen.getByRole('contentinfo');
      expect(footerEl).toBeInTheDocument();
      expect(footerEl.tagName.toLowerCase()).toBe('footer');
    });

    it('brand text and tagline are both inside the <footer> landmark', () => {
      renderFooter();
      const footerEl = screen.getByRole('contentinfo');
      expect(footerEl).toContainElement(screen.getByText(/pitch vault/i));
      expect(footerEl).toContainElement(screen.getByText(/a ugc marketplace/i));
    });
  });

  // ---------------------------------------------------------------------------
  // 5. CSS module class on tagline
  // ---------------------------------------------------------------------------
  describe('CSS module class on tagline', () => {
    it('applies the scoped tagline CSS module class to the tagline element', () => {
      renderFooter();
      const taglineEl = screen.getByText(/a ugc marketplace/i);
      // The mocked module maps 'tagline' -> 'tagline'
      expect(taglineEl.className).toMatch(/tagline/);
    });

    it('does NOT apply the tagline class to the brand element', () => {
      renderFooter();
      const brandEl = screen.getByText(/pitch vault/i);
      expect(brandEl.className).not.toMatch(/tagline/);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Flex container wraps brand + tagline
  // ---------------------------------------------------------------------------
  describe('flex container layout', () => {
    it('brand text and tagline share the same parent container', () => {
      renderFooter();
      const brandEl = screen.getByText(/pitch vault/i);
      const taglineEl = screen.getByText(/a ugc marketplace/i);
      expect(brandEl.parentElement).toBe(taglineEl.parentElement);
    });

    it('the shared parent container is inside the <footer> landmark', () => {
      renderFooter();
      const footerEl = screen.getByRole('contentinfo');
      const brandEl = screen.getByText(/pitch vault/i);
      // parentElement is the flex container; it should be a descendant of footer
      expect(footerEl).toContainElement(brandEl.parentElement);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Snapshot regression
  // ---------------------------------------------------------------------------
  describe('snapshot', () => {
    it('matches the full footer snapshot', () => {
      const { container } = renderFooter();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
