"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const API_BASE =
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:5000/api";

            const res = await fetch(`${API_BASE}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const json = await res.json();

            if (json.success) {
                setStatus("success");
                setStatusMessage(
                    json.message || "Message sent successfully!"
                );
                setForm({ name: "", email: "", company: "", message: "" });
            } else {
                setStatus("error");
                setStatusMessage(
                    json.message || "Something went wrong."
                );
            }
        } catch {
            setStatus("error");
            setStatusMessage(
                "Unable to connect to server. Please try again later."
            );
        }
    };

    return (
        <>
            {/* Hero */}
            <section className="bg-hero-gradient bg-grid-pattern py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Contact"
                            title="Let's Talk About Your Farm"
                            description="Get a free consultation with our agronomy and technology team. We'll help you find the right solution for your operation."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Form + Info */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Form */}
                        <AnimatedSection className="lg:col-span-3">
                            <div className="p-8 rounded-xl bg-surface border border-border/60">
                                <h3 className="text-xl font-semibold text-white mb-6">
                                    Send us a message
                                </h3>

                                {status === "success" && (
                                    <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm">
                                        {statusMessage}
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {statusMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-muted mb-1.5"
                                            >
                                                Name
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-muted mb-1.5"
                                            >
                                                Email
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                                                placeholder="you@company.com or personal email"
                                            />
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="block text-sm font-medium text-muted mb-1.5"
                                        >
                                            Company
                                        </label>
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={form.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                                            placeholder="Your company name, if you have a company."
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-muted mb-1.5"
                                        >
                                            Message
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                                            placeholder="Tell us about your farming operation and what you're looking for"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full sm:w-auto px-8 py-3 text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading"
                                            ? "Sending..."
                                            : "Send Message"}
                                    </button>
                                </form>
                            </div>
                        </AnimatedSection>

                        {/* Info sidebar */}
                        <AnimatedSection
                            className="lg:col-span-2"
                            delay={200}
                        >
                            <div className="space-y-6">
                                <div className="p-6 rounded-xl bg-surface border border-border/60">
                                    <h4 className="text-sm font-semibold text-white mb-3">
                                        Sales & Partnerships
                                    </h4>
                                    <p className="text-sm text-muted mb-1">
                                        main@kbonsite.com
                                    </p>
                                    <p className="text-sm text-muted">
                                        +66 65 275 2355
                                    </p>
                                </div>

                                <div className="p-6 rounded-xl bg-surface border border-border/60">
                                    <h4 className="text-sm font-semibold text-white mb-3">
                                        Technical Support
                                    </h4>
                                    <p className="text-sm text-muted mb-1">
                                        kbon.company@gmail.com
                                    </p>
                                    <p className="text-sm text-muted">
                                        24/7 for enterprise customers
                                    </p>
                                </div>

                                <div className="p-6 rounded-xl bg-surface border border-border/60">
                                    <h4 className="text-sm font-semibold text-white mb-3">
                                        Headquarters
                                    </h4>
                                    <p className="text-sm text-muted">
                                        82/24 Chonlaprathan Road
                                        <br />
                                        Khlong Hae, Hat Yai, Songkhla 90110
                                        <br />
                                        Thailand
                                    </p>
                                </div>

                                <div className="p-6 rounded-xl bg-surface border border-border/60">
                                    <h4 className="text-sm font-semibold text-white mb-3">
                                        Opening hours
                                    </h4>
                                    <p className="text-sm text-muted">
                                        We typically respond within 24 hours on
                                        business days. Enterprise inquiries get
                                        priority routing.
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
}