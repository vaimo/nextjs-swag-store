import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Page Not Found | ${process.env.NEXT_PUBLIC_APP_NAME ?? 'SWAG Store'}`,
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 font-bold text-9xl text-gray-200">404</h1>
        <h2 className="mb-4 font-bold text-3xl">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <a
            className="rounded-md bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            href="/"
          >
            Go Home
          </a>
          <a
            className="rounded-md border border-black px-6 py-3 font-medium text-black transition hover:bg-gray-50"
            href="/about"
          >
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}
