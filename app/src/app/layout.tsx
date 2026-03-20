import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PromoBanner } from '@/components/widgets/promo-banner';
import { ReduxProvider } from '@/store/redux-provider';

import './globals.css';

// Variable font - all weights in single file
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
});

// Monospace font for code blocks
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={null}>
              <PromoBanner />
            </Suspense>
            <Header />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>

            <Footer />
          </div>
          {/* TODO: Convert to next/script (Section 4 Lesson 3) */}
          <script
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            async
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
            }}
          />
          <Analytics />
          <SpeedInsights />
        </ReduxProvider>
      </body>
    </html>
  );
}
