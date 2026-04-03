import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PromoBanner } from '@/components/widgets/promo-banner';
import { ReduxProvider } from '@/store/redux-provider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: process.env.NEXT_PUBLIC_APP_NAME ?? 'SWAG Store',
  },
  description: `${process.env.NEXT_PUBLIC_APP_NAME} - Building the future of web development`,
  colorScheme: 'only light',
} as Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable}`} lang="en">
      <body>
        <ReduxProvider>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={null}>
              <PromoBanner />
            </Suspense>
            <Header />

            {/* Main Content */}
            <main className="container mx-auto flex-1 px-4 py-8">
              {children}
            </main>

            <Footer />
          </div>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}</Script>
          <Analytics />
          <SpeedInsights />
        </ReduxProvider>
      </body>
    </html>
  );
}
