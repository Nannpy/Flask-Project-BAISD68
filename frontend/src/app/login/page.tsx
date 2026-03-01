"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });
            const json = await res.json();

            if (json.success) {
                router.push("/dashboard");
            } else {
                setStatus("error");
                setErrorMessage(json.message || "Invalid credentials");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Unable to connect to server. Please try again later.");
        }
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center py-16 bg-hero-gradient bg-grid-pattern">
            <div className="w-full max-w-md px-4">
                <AnimatedSection>
                    <div className="p-8 rounded-xl bg-surface border border-border/60 shadow-xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-4">
                                <svg
                                    className="h-6 w-6 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                            <p className="text-sm text-muted mt-1">
                                Sign in to your Kbon dashboard
                            </p>
                        </div>

                        {/* Error */}
                        {status === "error" && (
                            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-muted mb-1.5">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                                    placeholder="you@company.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-muted mb-1.5">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full py-3 text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-muted">
                            Don&apos;t have an account?{" "}
                            <Link href="/contact" className="text-primary hover:text-primary-light transition-colors">
                                Request access
                            </Link>
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
