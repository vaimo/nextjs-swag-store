import { cacheLife } from 'next/cache';

async function CopyrightYear() {
  'use cache';
  cacheLife('static');
  const year = await Promise.resolve(new Date().getFullYear());
  return <>{year}</>;
}

export async function Footer() {
  'use cache';
  cacheLife('static');
  await Promise.resolve();
  return (
    <footer className="border-t bg-[#333] py-6 text-center text-[#f7f7f7] text-sm">
      <p>
        © <CopyrightYear /> {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}.
        All rights reserved.
      </p>
    </footer>
  );
}
