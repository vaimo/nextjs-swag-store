import { cacheLife } from 'next/cache';

async function CopyrightYear() {
  'use cache';
  cacheLife('daily');
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t bg-[#333] py-6 text-center text-[#f7f7f7] text-sm">
      <p>
        © <CopyrightYear /> {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}.
        All rights reserved.
      </p>
    </footer>
  );
}
