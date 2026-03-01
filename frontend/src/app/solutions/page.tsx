import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Kbon Solutions",
    description:
        "Explore Kbon's smart farming solutions — crop monitoring, IoT sensor networks, precision irrigation, and AI-driven advisory for modern agriculture.",
};

const SOLUTIONS = [
    {
        title: "Crop Health Monitoring",
        description:
            "Multi-spectral satellite and drone imagery analyzed by deep learning models to detect stress, disease, and nutrient deficiency before they become visible to the naked eye.",
        features: ["NDVI Analysis", "Disease Detection", "Growth Tracking", "Yield Forecasting"],
        icon: "🌾",
    },
    {
        title: "Smart Irrigation",
        description:
            "Soil moisture sensors combined with weather forecasts and evapotranspiration models to deliver precisely the right amount of water at the right time.",
        features: ["Soil Moisture Mapping", "Weather Integration", "Automated Scheduling", "Water Usage Analytics"],
        icon: "💧",
    },
    {
        title: "Precision Nutrient Management",
        description:
            "Variable-rate technology powered by real-time soil nutrient data and AI recommendations. Apply exactly what each zone needs — no more, no less.",
        features: ["NPK Monitoring", "Variable Rate Maps", "Fertilizer Optimization", "Cost Reduction"],
        icon: "🧪",
    },
    {
        title: "Environment",
        description:
            "Environmental monitoring for crop cultivation includes air quality, temperature, humidity, and plant growth tracking via IoT sensors.",
        features: ["Herd Tracking", "Climate Monitoring", "Health Alerts", "Feed Optimization"],
        icon: "🌍",
    },
    {
        title: "Supply Chain Intelligence",
        description:
            "End-to-end visibility from field to market with real-time logistics tracking, quality monitoring, and demand forecasting powered by ML.",
        features: ["Harvest Logistics", "Quality Assurance", "Market Pricing", "Demand Forecasting"],
        icon: "🚚",
    },
    {
        title: "Carbon & Sustainability",
        description:
            "Automated carbon footprint tracking, sustainability reporting, and carbon credit qualification tools for environmentally conscious farming.",
        features: ["Carbon Accounting", "ESG Reporting", "Credit Programs", "Impact Analytics"],
        icon: "♻️",
    },
];

export default function SolutionsPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-hero-gradient bg-grid-pattern py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Solutions"
                            title="Smart Solutions for Every Farm"
                            description="AI powered tools for modern agriculture from the field to the supply chain."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Solutions grid */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SOLUTIONS.map((solution, i) => (
                            <AnimatedSection key={solution.title} delay={i * 80}>
                                <div className="h-full p-6 rounded-xl bg-surface border border-border/60 card-hover flex flex-col">
                                    <span className="text-3xl mb-4">{solution.icon}</span>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {solution.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                                        {solution.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {solution.features.map((f) => (
                                            <span
                                                key={f}
                                                className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
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
                            Not Sure Which Solution Fits?
                        </h2>
                        <p className="text-muted mb-8">
                            Get expert help selecting the right solutions. Book a free consultation.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3.5 font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                        >
                            Talk to an Expert
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
