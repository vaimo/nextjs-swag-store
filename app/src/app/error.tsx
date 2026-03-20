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
    console.error('Marketing page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'We encountered an error loading this page.'}
        </p>
        {error.digest && (
          <p className="mb-4 font-mono text-red-400 text-xs">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            Try Again
          </button>
          <a
            href="/app/public"
            className="px-6 py-3 border border-black text-black rounded-md font-medium hover:bg-gray-50 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
