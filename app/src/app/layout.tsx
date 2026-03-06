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
      <body>
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
                              <a href="/blog" className="hover:text-gray-600 transition">
                                  Blog
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
          <footer className="border-t" style={{ backgroundColor: "#333", color: "#f7f7f7" }}>
              <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                      <div>
                          <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Services</h4>
                          <ul className="space-y-2 text-sm" style={{ color: "#ccc" }}>
                              <li><a href="#" className="hover:opacity-75 transition">Tool Rental</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Goods Delivery</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Wood Cutting</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Trailer Rental</a></li>
                         </ul>
                      </div>
                      <div>
                          <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Pro Tips</h4>
                          <ul className="space-y-2 text-sm" style={{ color: "#ccc" }}>
                              <li><a href="#" className="hover:opacity-75 transition">Construction &amp; Renovation</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Garden &amp; Leisure</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Renovate &amp; Modernise</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Sanitary &amp; Heating</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Tools &amp; Machinery</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Expert Centres</h4>
                          <ul className="space-y-2 text-sm" style={{ color: "#ccc" }}>
                              <li><a href="#" className="hover:opacity-75 transition">Opening Hours</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">How to Find Us</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Kids Club</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Drive-in Arena</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Garden Centre</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Customer Centre</h4>
                          <ul className="space-y-2 text-sm" style={{ color: "#ccc" }}>
                              <li><a href="#" className="hover:opacity-75 transition">Returns &amp; Complaints</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Warranties &amp; Guarantees</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Contact Form</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Downloads</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Loyalty Programme</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">About Us</h4>
                          <ul className="space-y-2 text-sm" style={{ color: "#ccc" }}>
                              <li><a href="#" className="hover:opacity-75 transition">Careers</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Job Openings</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Downloads</a></li>
                              <li><a href="#" className="hover:opacity-75 transition">Corporate Responsibility</a></li>
                          </ul>
                      </div>
                  </div>
                  <div className="mt-8 pt-8 border-t text-center text-sm" style={{ color: "#f7f7f7", borderColor: "#555" }}>
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
