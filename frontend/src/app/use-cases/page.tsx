import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Use Cases",
    description:
        "See how farms and agribusinesses use Kbon's AI-powered platform to increase yields, reduce costs, and achieve sustainability goals.",
};

const USE_CASES = [
    {
        title: "Aeroponics",
        region: "Thailand",
        crop: "Cannabis",
        acreage: "5 harvest",
        results: [
            { metric: "Yield Increase", value: "+60%" },
            { metric: "Input Cost Reduction", value: "-35%" },
            { metric: "Water Savings", value: "80%" },
            { metric: "ROI (Year 1)", value: "200%" },
        ],
        description:
            "Precision mist scheduling, automated climate control, and root zone analytics accelerate plant growth while maximizing water and resource efficiency.",
    },
    {
        title: "Organic hydroponics",
        region: "Thailand",
        crop: "Lettuce",
        acreage: "4 harvest",
        results: [
            { metric: "Water Savings", value: "20%" },
            { metric: "Premium Grade", value: "+89%" },
            { metric: "Disease Prevention", value: "72%" },
            { metric: "ROI (Year 1)", value: "280%" },
        ],
        description:
            "Intelligent nutrient control, real time water monitoring, and automated system management ensure consistent, chemical-free crop yields in organic hydroponic operations.",
    },
    {
        title: "Vertical farming",
        region: "Thailand",
        crop: "Lettuce",
        acreage: "3 harvest",
        results: [
            { metric: "Yield per m²", value: "+60%" },
            { metric: "Water Use Efficiency", value: "-70%" },
            { metric: "Energy Optimization", value: "-40%" },
            { metric: "Space Utilization", value: "4x Layers" },
        ],
        description:
            "User friendly controls, automated environmental management, and space efficient multi-layer design enable high quality crop production within a minimal footprint.",
    },
    {
        title: "Nutrient deficiency",
        region: "Thailand",
        crop: "Cannabis & Tomatoes",
        acreage: "version 2.2.1",
        results: [
            { metric: "Deficiency Detection Accuracy", value: "96%" },
            { metric: "Fertilizer Cost Reduction", value: "-18%" },
            { metric: "Crop Loss Reduction", value: "-30%" },
            { metric: "EC/pH Stability", value: "±3%" },
        ],
        description:
            "AI driven control systems continuously regulate nutrient balance by adjusting dosing and optimizing root zone conditions to sustain peak crop performance in real time.",
    },
];

export default function UseCasesPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-hero-gradient bg-grid-pattern py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Use Cases"
                            title="Real Results from Real Farms"
                            description="Let kbon make farming easier for you."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Case studies */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
                    {USE_CASES.map((uc, i) => (
                        <AnimatedSection key={uc.title} delay={i * 100}>
                            <div className="rounded-xl bg-surface border border-border/60 card-hover overflow-hidden">
                                <div className="grid lg:grid-cols-3 gap-0">
                                    {/* Info */}
                                    <div className="lg:col-span-2 p-8">
                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {uc.region}
                                            </span>
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-surface-light text-muted">
                                                {uc.crop}
                                            </span>
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-surface-light text-muted">
                                                {uc.acreage}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">
                                            {uc.title}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
                                            {uc.description}
                                        </p>
                                    </div>

                                    {/* Metrics */}
                                    <div className="bg-background/50 p-8 grid grid-cols-2 gap-6 content-center">
                                        {uc.results.map((r) => (
                                            <div key={r.metric}>
                                                <p className="text-2xl font-bold text-gradient">
                                                    {r.value}
                                                </p>
                                                <p className="text-xs text-muted mt-1">
                                                    {r.metric}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-28 border-t border-border/60">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            See What Kbon Can Do for Your Operation
                        </h2>
                        <p className="text-muted mb-8">
                            Every farm is different. Let us build a custom ROI projection
                            based on your specific operation.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3.5 font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                        >
                            Get a Custom Analysis
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
