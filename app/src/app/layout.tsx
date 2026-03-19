import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import './globals.css'

// Variable font - all weights in single file
const inter = Inter({
                        subsets: ['latin'],
                        variable: '--font-inter',
                        display: 'swap',
                        adjustFontFallback: true,
                    })

// Monospace font for code blocks
const jetbrainsMono = JetBrains_Mono({
                                         subsets: ['latin'],
                                         variable: '--font-mono',
                                         display: 'swap',
                                     })

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME || 'Vercel Academy Foundation - Web',
    description: 'VAF Web',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
      <div className="min-h-screen flex flex-col">
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
      </body>
    </html>
  );
}
