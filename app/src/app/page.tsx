import type { Metadata } from "next";

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store",
    description: "Welcome to our platform - Building the future of web development",
};

export default function HomePage() {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="text-center py-16">
                <h1 className="text-6xl font-bold mb-6">
                    Welcome to {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}
                </h1>
                <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Build faster, ship smarter, and scale seamlessly with modern web technologies.
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="#"
                        className="px-8 py-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition"
                    >
                        Get Started
                    </a>
                    <a
                        href="/about"
                        className="px-8 py-4 border border-black text-black rounded-md font-medium text-lg hover:bg-gray-50 transition"
                    >
                        Learn More
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 border-t">
                <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 border rounded-lg hover:shadow-lg transition">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
                        <p className="text-gray-600">
                            Built on Next.js 16 with the latest optimizations for unmatched performance.
                        </p>
                    </div>
                    <div className="p-8 border rounded-lg hover:shadow-lg transition">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-semibold mb-4">Secure by Default</h3>
                        <p className="text-gray-600">
                            Enterprise-grade security features built into every layer of the stack.
                        </p>
                    </div>
                    <div className="p-8 border rounded-lg hover:shadow-lg transition">
                        <div className="text-4xl mb-4">📈</div>
                        <h3 className="text-2xl font-semibold mb-4">Scale with Ease</h3>
                        <p className="text-gray-600">
                            From startup to enterprise, our platform grows with your needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-bold mb-2">99.9%</div>
                        <div className="text-gray-600">Uptime</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold mb-2">50ms</div>
                        <div className="text-gray-600">Response Time</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold mb-2">10k+</div>
                        <div className="text-gray-600">Customers</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold mb-2">24/7</div>
                        <div className="text-gray-600">Support</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 border-t text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join thousands of developers building the next generation of web applications.
                </p>
                <a
                    href="#"
                    className="inline-block px-8 py-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition"
                >
                    Start Building Now
                </a>
            </section>
        </div>
    );
}

