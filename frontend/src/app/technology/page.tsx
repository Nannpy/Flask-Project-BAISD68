import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Technology",
    description:
        "Discover the technology behind Kbon — edge-computing IoT gateways, computer vision, ML pipelines, and a cloud-native data platform built for agriculture.",
};

const TECH_STACK = [
    {
        layer: "Iot Sensors Network",
        description: "Low power distributed IoT sensors deployed across fields to continuously collect environmental and operational data.",
        items: [
            { name: "Soil Monitoring Sensors", detail: "Monitoring and Analytics moisture pH EC and temperature." },
            { name: "Weather & Climate", detail: "Measure Temperature humidity rainfall solar." },
            { name: "Water & Irrigation", detail: "Monitoring Flow pressure tank level pH EC dissolved oxygen." },
            { name: "Gateway and Edge Connectivity", detail: "LoRaWAN/NB-IoT communication with secure cloud data transmission." },
        ],
    },
    {
        layer: "Smart Dashboard",
        description: "A centralized control interface for real time monitoring analytics visualization, and farm operations management.",
        items: [
            { name: "Real-Time Monitoring Panel", detail: "Live sensor data & alerts" },
            { name: "Interactive Data Visualization", detail: "Visualize from Charts heatmaps historical trends" },
            { name: "Field Management Module", detail: "Zone control & irrigation scheduling" },
            { name: "Reporting System", detail: "Exportable insights & performance reports" },
        ],
    },
    {
        layer: "AI & Machine Learning",
        description: "Advanced predictive models and intelligent analytics trained on agricultural datasets.",
        items: [
            { name: "Crop Disease Detection", detail: "Image-based diagnosis" },
            { name: "Yield Prediction Models", detail: "Forecasting with statistical & ML models" },
            { name: "Weather-Based Optimization", detail: "AI-driven irrigation & nutrient planning" },
            { name: "Recommendation Engine", detail: "Actionable farming strategies" },
        ],
    },
    {
        layer: "Jarvis",
        description: "An intelligent AI agent assistant that manages farm operations and provides support for fully automated decision-making.",
        items: [
            { name: "Cognitive Farm Management", detail: "Understands full farm context soil crop stage and weather" },
            { name: "Autonomous Decision Engine", detail: "Makes irrigation fertilization and treatment decisions" },
            { name: "Adaptive Planning System", detail: "Continuously adjusts farm strategy based on real-time data" },
            { name: "Command & Automation Control", detail: "Executes actions via IoT systems and edge devices" },
        ],
    },
];

export default function TechnologyPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-hero-gradient bg-grid-pattern py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Technology"
                            title="Scalable by Design, Field-Driven."
                            description="From field devices to cloud intelligence, Kbon powers agriculture at scale."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Stack layers */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                    {TECH_STACK.map((layer, li) => (
                        <AnimatedSection key={layer.layer} delay={li * 100}>
                            <div className="grid lg:grid-cols-5 gap-8 items-start">
                                {/* Layer header */}
                                <div className="lg:col-span-2">
                                    <span className="inline-block mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
                                        Layer {li + 1}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        {layer.layer}
                                    </h3>
                                    <p className="text-muted leading-relaxed">
                                        {layer.description}
                                    </p>
                                </div>

                                {/* Items */}
                                <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
                                    {layer.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="p-4 rounded-xl bg-surface border border-border/60 card-hover"
                                        >
                                            <h4 className="text-sm font-semibold text-white mb-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-muted">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {li < TECH_STACK.length - 1 && (
                                <div className="mt-16 flex justify-center">
                                    <div className="h-12 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                                </div>
                            )}
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-28 border-t border-border/60">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Want a Deep Dive?
                        </h2>
                        <p className="text-muted mb-8">
                            Let's talk to our engineering team to see the detailed system architecture.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3.5 font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                        >
                            Talk to us
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
