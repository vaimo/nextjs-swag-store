export function Footer() {
    return (
        <footer className="border-t text-center text-sm py-6" style={{ backgroundColor: "#333", color: "#f7f7f7" }}>
            <p>© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}. All rights reserved.</p>
        </footer>
    );
}
