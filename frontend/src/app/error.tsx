"use client";

import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mx-auto mb-6">
                    <svg
                        className="h-8 w-8 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Something went wrong
                </h2>
                <p className="text-muted mb-6">{error.message || "An unexpected error occurred."}</p>
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2.5 text-sm font-semibold rounded-lg border border-border text-white hover:bg-surface transition-all"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
