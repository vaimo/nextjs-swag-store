import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our mission, values, and team.",
};

export default async function AboutPage() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're on a mission to build the future of web development with modern tools and best practices.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-12 border-t">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          At {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}, we believe in creating exceptional digital experiences that empower businesses and delight users. Our team is dedicated to pushing the boundaries of what's possible with modern web technologies.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We combine cutting-edge frameworks like Next.js with thoughtful design and engineering to deliver products that are fast, scalable, and maintainable.
        </p>
      </section>

      {/* Values Section */}
      <section className="py-12 border-t">
        <h2 className="text-3xl font-bold mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Innovation First</h3>
            <p className="text-gray-600">
              We embrace new technologies and methodologies to stay ahead of the curve.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-gray-600">
              We believe the best solutions come from diverse perspectives working together.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Performance</h3>
            <p className="text-gray-600">
              Every millisecond matters. We optimize for speed without compromising quality.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 border-t">
        <h2 className="text-3xl font-bold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Alex Chen", role: "CEO & Founder", emoji: "👨‍💼" },
            { name: "Sarah Williams", role: "CTO", emoji: "👩‍💻" },
            { name: "Michael Rodriguez", role: "Head of Design", emoji: "🎨" },
            { name: "Emily Taylor", role: "Lead Engineer", emoji: "⚙️" },
          ].map((member) => (
            <div key={member.name} className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 border-t text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We're always looking for talented individuals who share our passion for building great products.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            View Open Positions
          </a>
          <a
            href="#"
            className="px-6 py-3 border border-black text-black rounded-md font-medium hover:bg-gray-50 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

