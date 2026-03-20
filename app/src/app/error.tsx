'use client';

import { useEffect } from 'react';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      // biome-ignore lint/suspicious/noConsole: dev-only logging
      console.error('Marketing page error:', error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 font-bold text-3xl text-red-600">
          Oops! Something went wrong
        </h2>
        <p className="mb-6 text-gray-600">
          {error.message || 'We encountered an error loading this page.'}
        </p>
        {error.digest && (
          <p className="mb-4 font-mono text-red-400 text-xs">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex justify-center gap-4">
          <button
            className="rounded-md bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            onClick={reset}
            type="button"
          >
            Try Again
          </button>
          <a
            className="rounded-md border border-black px-6 py-3 font-medium text-black transition hover:bg-gray-50"
            href="/app/public"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
