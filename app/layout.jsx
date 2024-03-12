import { Helvetica } from 'next/font/google';
import './globals.css';

const inter = Helvetica({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: 'normal',
  display: 'swap',
});

export const metadata = {
  title: 'Krankenkassenformular',
  description: 'Formular für Krankenkassenabgleich',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
