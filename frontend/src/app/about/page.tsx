import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Kbon's mission to empower farmers with AI and IoT technology. Meet the team building the future of sustainable agriculture.",
};

const VALUES = [
    {
        title: "Innovation First",
        description: "We push the boundaries of what's possible in agriculture with cutting-edge AI, IoT, and data science research.",
        icon: "🔬",
    },
    {
        title: "Farmer-Centric",
        description: "Every feature we build starts with understanding the real challenges farmers face in the field every day.",
        icon: "🌾",
    },
    {
        title: "Sustainability",
        description: "Technology should help us produce more food with less impact. We build tools that make sustainable farming profitable.",
        icon: "♻️",
    },
    {
        title: "Transparency",
        description: "Our AI models are explainable, our data practices are transparent, and our pricing is straightforward.",
        icon: "🔍",
    },
];

const TEAM = [
    { name: "Tony Starks", role: "CEO & Co-Founder", bio: "Former ML Research Lead at DeepMind, PhD in Agricultural AI from Stanford." },
    { name: "Stephen Hawking", role: "CTO & Co-Founder", bio: "Ex-Google SRE, built IoT platforms serving 10M+ devices at scale." },
    { name: "Justin Bieber", role: "VP of Agronomy", bio: "20+ years in precision agriculture, previously led R&D at Bayer CropScience." },
    { name: "Logan Paul", role: "Head of AI", bio: "Published 40+ papers on computer vision for agriculture, ex-Microsoft Research." },
    { name: "Lebron James", role: "Head of Product", bio: "Previously at Climate Corp and Indigo Ag, expert in farmer-facing SaaS products." },
    { name: "Elon Musk", role: "VP of Engineering", bio: "15 years building enterprise SaaS platforms, Ex-AWS and Palantir." },
];

const MILESTONES = [
    { year: "2023", event: "Identified key agricultural challenges and conducted in-depth research to design the initial system architecture." },
    { year: "2024", event: "Designed and developed the first working prototype, transforming research into a functional solution." },
    { year: "2025", event: "Conducted extensive field testing and system validation to identify gaps, refine performance, and enhance reliability." },
    { year: "2026", event: "Launched the final product and initiated market trials to validate scalability and commercial readiness." },
    // { year: "2024", event: "500+ farm partners, 2M+ acres under management" },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-hero-gradient bg-grid-pattern py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="About Kbon"
                            title="Powered by Technology"
                            description="Grow more with less powered by AI and IoT."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection>
                            <span className="inline-block mb-4 text-xs font-semibold tracking-wider uppercase text-primary">
                                Our Mission
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                                Make Smart Farming Accessible to Every Grower on Earth
                            </h2>
                            <div className="space-y-4 text-muted leading-relaxed">
                                <p>
                                    To make smart farming accessible to every farmer on the planet. Agriculture
                                    feeds 8 billion people, yet most farms still rely on knowledge and intuition,
                                    on self-observation. Kbon was founded to change that, bringing the same
                                    data-driven precision that has transformed industries like manufacturing
                                    and logistics to the world's oldest and most important industries.
                                </p>
                                <p>
                                    Our platform integrates cost effective IoT sensors and AI analytics into a single
                                    dashboard that every farmer can use, whether they manage a small greenhouse or a
                                    100,000 acre farm.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={200}>
                            <div className="rounded-xl bg-surface border border-border/60 p-8">
                                <h3 className="text-lg font-semibold text-white mb-6">
                                    Company Timeline
                                </h3>
                                <div className="space-y-6">
                                    {MILESTONES.map((m) => (
                                        <div key={m.year} className="flex gap-4">
                                            <span className="text-sm font-bold text-primary whitespace-nowrap">
                                                {m.year}
                                            </span>
                                            <span className="text-sm text-muted">{m.event}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 lg:py-28 border-t border-border/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Values"
                            title="What Drives Us"
                        />
                    </AnimatedSection>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((v, i) => (
                            <AnimatedSection key={v.title} delay={i * 80}>
                                <div className="p-6 rounded-xl bg-surface border border-border/60 card-hover h-full text-center">
                                    <span className="text-3xl mb-4 block">{v.icon}</span>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {v.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        {v.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 lg:py-28 border-t border-border/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Team"
                            title="Meet the People Behind Kbon"
                            description="A world-class team of engineers, agronomists, and product builders on a mission to transform agriculture."
                        />
                    </AnimatedSection>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEAM.map((member, i) => (
                            <AnimatedSection key={member.name} delay={i * 80}>
                                <div className="p-6 rounded-xl bg-surface border border-border/60 card-hover">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
                                        {member.name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-primary font-medium mb-2">
                                        {member.role}
                                    </p>
                                    <p className="text-sm text-muted leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-28 border-t border-border/60">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Join Us in Building the Future of Farming
                        </h2>
                        <p className="text-muted mb-8">
                            We&apos;re always looking for talented people who share our passion
                            for agriculture and technology.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3.5 font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                        >
                            Get in Touch
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
