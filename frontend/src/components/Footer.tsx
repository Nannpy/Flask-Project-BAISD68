import Link from "next/link";

const FOOTER_LINKS = {
    Platform: [
        { href: "/solutions", label: "Solutions" },
        { href: "/technology", label: "Technology" },
        { href: "/use-cases", label: "Use Cases" },
    ],
    Company: [
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ],
    Resources: [
        { href: "/blog", label: "Documentation" },
        { href: "/contact", label: "Support" },
        { href: "/login", label: "Partner Portal" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-border/60 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <svg
                                    className="h-4 w-4 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-white">
                                Kb<span className="text-primary">on</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed">
                            AI-powered smart farming platform for modern agriculture.
                            Empowering growers worldwide.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold text-white mb-4">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted">
                        &copy; {new Date().getFullYear()} Kbon. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="#"
                            className="text-xs text-muted hover:text-primary transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-xs text-muted hover:text-primary transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
