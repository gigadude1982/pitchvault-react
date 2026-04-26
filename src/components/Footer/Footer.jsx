import PropTypes from 'prop-types';
import './Footer.css';

export default function Footer({ version }) {
  return (
    <footer className="footer">
      <img src="/logo.png" alt="PitchVault" className="footer-logo" />
      <span className="footer-version">
        v{version} &nbsp;·&nbsp; © {new Date().getFullYear()} PitchVault
      </span>
      <span
        className="footer-branding"
        data-testid="footer-tagline"
      >
        A GigaCorp production
      </span>
    </footer>
  );
}

Footer.propTypes = {
  version: PropTypes.string,
};

Footer.defaultProps = {
  version: '',
};
