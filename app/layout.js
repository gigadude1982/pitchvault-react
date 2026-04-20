import '../src/styles.css';
import { LayoutShell } from './LayoutShell';

export const metadata = {
  title: 'Pitch Vault',
  description: 'Pitch Vault — the creator marketplace connecting brands with top content creators.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700;900&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: '#0a0806' }}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
