import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Salad Factory - Fresh & Healthy Salads',
  description: 'Discover our handcrafted salads made with fresh, locally-sourced ingredients. Order online for delivery or pickup.',
  keywords: 'salad, healthy food, fresh ingredients, vegetarian, gluten-free, online ordering',
  authors: [{ name: 'Salad Factory Team' }],
  openGraph: {
    title: 'Salad Factory - Fresh & Healthy Salads',
    description: 'Discover our handcrafted salads made with fresh, locally-sourced ingredients.',
    images: ['/og-image.jpg'],
    url: 'https://saladfactory.com',
    siteName: 'Salad Factory',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salad Factory - Fresh & Healthy Salads',
    description: 'Discover our handcrafted salads made with fresh, locally-sourced ingredients.',
    images: ['/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#22C55E', // Green-500
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={`${poppins.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
