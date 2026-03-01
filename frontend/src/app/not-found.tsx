import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                <p className="text-6xl font-bold text-gradient mb-4">404</p>
                <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
                <p className="text-muted mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
