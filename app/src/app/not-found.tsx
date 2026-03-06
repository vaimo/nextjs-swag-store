import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | ' + (process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'),
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            Go Home
          </a>
          <a
            href="/about"
            className="px-6 py-3 border border-black text-black rounded-md font-medium hover:bg-gray-50 transition"
          >
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}

