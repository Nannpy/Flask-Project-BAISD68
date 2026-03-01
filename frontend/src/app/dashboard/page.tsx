import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function DashboardPage() {
    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-6">
                        <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">Dashboard</h1>
                    <p className="text-muted mb-8">
                        Welcome to the Kbon dashboard. This is a protected page.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-2.5 text-sm font-semibold rounded-lg border border-border text-white hover:bg-surface transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
