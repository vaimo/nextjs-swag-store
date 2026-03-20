export function Footer() {
  return (
    <footer className="border-t bg-[#333] py-6 text-center text-[#f7f7f7] text-sm">
      <p>
        © {new Date().getFullYear()}{' '}
        {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}. All rights reserved.
      </p>
    </footer>
  );
}
