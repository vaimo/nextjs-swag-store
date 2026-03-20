export function Footer() {
  return (
    <footer className="border-t text-center text-sm py-6 bg-[#333] text-[#f7f7f7]">
      <p>
        © {new Date().getFullYear()}{' '}
        {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}. All rights reserved.
      </p>
    </footer>
  );
}
