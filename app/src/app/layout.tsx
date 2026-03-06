import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "%s | " + process.env.NEXT_PUBLIC_APP_NAME,
  description: "VAF Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">
      <div className="min-h-screen flex flex-col">
          {/* Marketing Header */}
          <header className="border-b bg-white">
              <nav className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                          <a href="/" className="font-bold text-xl">
                              {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}
                          </a>
                          <div className="hidden md:flex gap-6">
                              <a href="/" className="hover:text-gray-600 transition">
                                  Home
                              </a>
                              <a href="/about" className="hover:text-gray-600 transition">
                                  About
                              </a>
                              <a href="/gallery" className="hover:text-gray-600 transition">
                                  Gallery
                              </a>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <a
                              href="#"
                              className="px-4 py-2 text-sm font-medium hover:text-gray-600 transition"
                          >
                              Sign In
                          </a>
                          <a
                              href="#"
                              className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition"
                          >
                              Get Started
                          </a>
                      </div>
                  </div>
              </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">
              {children}
          </main>

          {/* Marketing Footer */}
          <footer className="border-t bg-gray-50">
              <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div>
                          <h3 className="font-bold mb-4">
                              {process.env.NEXT_PUBLIC_APP_NAME || "ACME"}
                          </h3>
                          <p className="text-sm text-gray-600">
                              Building the future of web applications.
                          </p>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-4">Product</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Features
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Pricing
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Documentation
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-4">Company</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                              <li>
                                  <a href="/about" className="hover:text-gray-900 transition">
                                      About
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Blog
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Careers
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-4">Legal</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Privacy
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Terms
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="hover:text-gray-900 transition">
                                      Contact
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
                      <p>© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}. All rights reserved.</p>
                  </div>
              </div>
          </footer>
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
      </body>
    </html>
  );
}
