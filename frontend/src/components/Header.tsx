"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/technology", label: "Technology" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition group-hover:bg-primary/20">
                        <svg
                            className="h-5 w-5 text-primary"
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
                    <span className="text-xl font-bold text-white">
                        Kb<span className="text-primary">on</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                    ? "text-primary bg-primary/10"
                                    : "text-muted hover:text-white hover:bg-surface"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-medium text-muted hover:text-white transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/contact"
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-colors"
                    >
                        Get a Demo
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <span
                        className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in-down">
                    <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? "text-primary bg-primary/10"
                                        : "text-muted hover:text-white hover:bg-surface"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 text-center text-sm font-medium text-muted hover:text-white rounded-lg hover:bg-surface transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 text-center text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-colors"
                            >
                                Get a Demo
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}
