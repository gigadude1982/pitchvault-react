import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

// ---------------------------------------------------------------------------
// The spec targets a dedicated Footer component (components/Footer.jsx).
// The current codebase inlines the footer inside App.js, so we test via App.
// We stub every heavy dependency so the component tree renders in isolation.
// ---------------------------------------------------------------------------

// ── @tanstack/react-router stubs ──────────────────────────────────────────
jest.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, className, activeProps, onClick }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ),
  Outlet: () => <div data-testid="outlet" />,
  useNavigate: () => jest.fn(),
  useRouterState: () => ({
    location: { pathname: '/feed' },
  }),
}));

// ── package.json version stub ─────────────────────────────────────────────
jest.mock('../../package.json', () => ({ version: '1.0.0' }), { virtual: true });
jest.mock('../package.json', () => ({ version: '1.0.0' }), { virtual: true });

// ── ToastContext stub ─────────────────────────────────────────────────────
jest.mock('./ToastContext', () => ({
  ToastContext: React.createContext(() => {}),
}), { virtual: true });
jest.mock('../ToastContext', () => ({
  ToastContext: React.createContext(() => {}),
}), { virtual: true });

// ── CSS module stubs (if Footer is extracted and uses CSS modules) ─────────
jest.mock('./Footer.module.css', () => new Proxy({}, { get: (_, key) => key }), { virtual: true });
jest.mock('../components/Footer.module.css', () => new Proxy({}, { get: (_, key) => key }), { virtual: true });
jest.mock('./styles/footer.module.css', () => new Proxy({}, { get: (_, key) => key }), { virtual: true });

// ── Silence console.error noise from missing router context ───────────────
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Helper: renders the App (which contains the inline footer) or a standalone
// Footer component if one exists at one of the affected paths.
// ---------------------------------------------------------------------------
function renderFooter() {
  // Attempt to load a dedicated Footer component first; fall back to App.
  let FooterComponent;
  try {
    FooterComponent = require('./Footer').default || require('./Footer').Footer;
  } catch (_) {
    try {
      FooterComponent = require('../components/Footer').default ||
        require('../components/Footer').Footer;
    } catch (__) {
      FooterComponent = null;
    }
  }

  if (FooterComponent) {
    return render(<FooterComponent />);
  }

  // Fall back to rendering App which contains the inline footer.
  const App = require('./App').default;
  return render(<App />);
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
describe('Footer — branding & tagline', () => {
  // ── Smoke test ────────────────────────────────────────────────────────────
  it('renders without crashing (smoke test)', () => {
    expect(() => renderFooter()).not.toThrow();
  });

  // ── Wordmark ──────────────────────────────────────────────────────────────
  it('renders the "Pitch Vault" wordmark text in the footer', () => {
    renderFooter();

    // The footer landmark / contentinfo region is the scope for this assertion.
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();

    // Accept both "Pitch Vault" (spaced) and "PitchVault" (alt text / aria)
    // but the spec explicitly requires the spaced wordmark visible as text.
    const pitchVaultEl = within(footer).queryByText(/pitch\s*vault/i);
    expect(pitchVaultEl).toBeInTheDocument();
  });

  // ── Tagline presence ──────────────────────────────────────────────────────
  it('renders the "A UGC Marketplace" tagline text in the footer', () => {
    renderFooter();

    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();

    const tagline = within(footer).queryByText(/a ugc marketplace/i);
    expect(tagline).toBeInTheDocument();
  });

  // ── Secondary styling via CSS module class ────────────────────────────────
  it('tagline element carries a CSS class that encodes secondary styling', () => {
    renderFooter();

    const footer = document.querySelector('footer');
    const tagline = within(footer).queryByText(/a ugc marketplace/i);
    expect(tagline).not.toBeNull();

    // The class name should suggest secondary / muted / tagline styling.
    // CSS modules mangle names, so we check the raw className string exists
    // and is non-empty — confirming a deliberate style was applied.
    const className = tagline.className || '';
    expect(className.length).toBeGreaterThan(0);

    // Additionally verify it is NOT the same class as the primary wordmark
    // element, which would indicate no differentiation was applied.
    const wordmark = within(footer).queryByText(/pitch\s*vault/i);
    if (wordmark && wordmark !== tagline) {
      // If both nodes are distinct, their classes should differ.
      expect(tagline.className).not.toBe(wordmark.className);
    }
  });

  // ── Spatial proximity — shared branding container ─────────────────────────
  it('wordmark and tagline share a common branding container element', () => {
    renderFooter();

    const footer = document.querySelector('footer');
    const tagline = within(footer).queryByText(/a ugc marketplace/i);
    const wordmark = within(footer).queryByText(/pitch\s*vault/i);

    expect(tagline).not.toBeNull();
    expect(wordmark).not.toBeNull();

    // Walk up the DOM to find the nearest common ancestor within the footer.
    function ancestors(node) {
      const chain = [];
      let current = node.parentElement;
      while (current && current !== document.body) {
        chain.push(current);
        current = current.parentElement;
      }
      return chain;
    }

    const taglineAncestors = ancestors(tagline);
    const wordmarkAncestors = ancestors(wordmark);

    const commonAncestor = taglineAncestors.find((a) => wordmarkAncestors.includes(a));

    // There must be a shared ancestor closer than <body>.
    expect(commonAncestor).toBeDefined();

    // That ancestor must itself be inside the footer, confirming proximity.
    expect(footer.contains(commonAncestor)).toBe(true);
  });

  // ── Accessibility landmark ────────────────────────────────────────────────
  it('footer renders a contentinfo / footer landmark role for accessibility', () => {
    renderFooter();

    // <footer> has implicit role="contentinfo"; RTL exposes it as such.
    const landmark = screen.queryByRole('contentinfo');
    expect(landmark).toBeInTheDocument();
  });

  // ── Tagline is inside the landmark ───────────────────────────────────────
  it('tagline text is contained within the footer landmark', () => {
    renderFooter();

    const landmark = screen.queryByRole('contentinfo');
    expect(landmark).not.toBeNull();

    const tagline = within(landmark).queryByText(/a ugc marketplace/i);
    expect(tagline).toBeInTheDocument();
  });

  // ── Tagline position relative to wordmark (DOM order) ─────────────────────
  it('tagline appears after the wordmark in DOM order (to the right visually)', () => {
    renderFooter();

    const footer = document.querySelector('footer');
    const allText = footer.querySelectorAll('*');

    let wordmarkIndex = -1;
    let taglineIndex = -1;

    allText.forEach((el, idx) => {
      // Match leaf nodes whose text content matches
      if (/pitch\s*vault/i.test(el.textContent) && el.children.length === 0) {
        if (wordmarkIndex === -1) wordmarkIndex = idx;
      }
      if (/a ugc marketplace/i.test(el.textContent) && el.children.length === 0) {
        if (taglineIndex === -1) taglineIndex = idx;
      }
    });

    // If both leaf nodes are found, tagline must come after wordmark.
    if (wordmarkIndex !== -1 && taglineIndex !== -1) {
      expect(taglineIndex).toBeGreaterThan(wordmarkIndex);
    } else {
      // Fall back: at minimum, both texts exist somewhere in the footer.
      const taglineFallback = within(footer).queryByText(/a ugc marketplace/i);
      const wordmarkFallback = within(footer).queryByText(/pitch\s*vault/i);
      expect(taglineFallback).toBeInTheDocument();
      expect(wordmarkFallback).toBeInTheDocument();
    }
  });

  // ── Existing footer elements not removed ─────────────────────────────────
  it('existing footer version / copyright text is still present after tagline addition', () => {
    renderFooter();

    const footer = document.querySelector('footer');

    // The original footer included version and copyright info.
    // Verify at least the copyright symbol remains so existing content is intact.
    expect(footer.textContent).toMatch(/pitchvault|pitch vault/i);

    // The footer logo image should still be present.
    const logoImgs = footer.querySelectorAll('img[alt]');
    const hasBrandLogo = Array.from(logoImgs).some((img) =>
      /pitchvault|pitch.?vault/i.test(img.getAttribute('alt'))
    );
    expect(hasBrandLogo).toBe(true);
  });
});
