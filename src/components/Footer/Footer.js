import PropTypes from 'prop-types';
import styles from './Footer.module.css';

export default function Footer({ version, year }) {
  return (
    <footer className={styles.footer}>
      <span className={styles.version}>
        v{version} &nbsp;&middot;&nbsp; &copy; {year} PitchVault
      </span>
      <span className={styles.tagline} data-testid="footer-tagline">
        A GigaCorp production
      </span>
    </footer>
  );
}

Footer.propTypes = {
  version: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};
