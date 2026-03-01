import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.573.097c-3.764.636-7.559.636-11.324 0l-.573-.097c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "AI Crop Monitoring",
    description: "Deep learning models analyze satellite and drone imagery to detect crop stress, disease, and nutrient deficiencies in real-time.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 20.5h.01" />
      </svg>
    ),
    title: "IoT Sensor Networks",
    description: "Deploy low-power sensor arrays across your fields for continuous monitoring of soil moisture, temperature, humidity, and more.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Predictive Analytics",
    description: "Machine learning models forecast yields, predict weather impacts, and recommend optimal planting and harvesting schedules.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: "Sustainability Tracking",
    description: "Built-in carbon accounting and sustainability reporting tools help farms qualify for carbon credits and meet ESG goals.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: "Precision Mapping",
    description: "High-resolution field maps generated from drone and satellite data enable variable-rate application of fertilizers and pesticides.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with end-to-end encryption, role-based access control, and comprehensive audit logging.",
  },
];

const STATS = [
  { value: "1", label: "Farms Monitored" },
  { value: "80%", label: "Average Yield Increase" },
  { value: "99%", label: "Water Savings" },
  { value: "1", label: "Farm Partners" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient bg-grid-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Next-Gen Smart Farming by Kbon
              </span>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                Grow Smarter with
                <span className="block mt-2">
                  <span className="text-gradient">AI-Powered</span>{" "}
                  Agriculture
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                Kbon combines IoT sensors, satellite imagery, and
                artificial intelligence to give farmers real-time insights
                that boost yields, cut costs, and protect the planet.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  Request a Demo
                </Link>
                <Link
                  href="/solutions"
                  className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-lg border border-border text-white hover:bg-surface transition-all"
                >
                  Explore Solutions
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-16 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-gradient">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              badge="Platform"
              title="Everything for Smart Farming"
              description="One platform combining sensors, AI, and analytics for real-world farming."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 80}>
                <div className="p-6 rounded-xl bg-surface border border-border/60 card-hover h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-surface to-surface border border-primary/20 p-10 sm:p-16 text-center">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Farm?
                </h2>
                <p className="text-lg text-muted max-w-xl mx-auto mb-8">
                  Join 500+ farms already using Kbon to increase yields,
                  reduce costs, and build a more sustainable future.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 text-base font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/solutions"
                    className="px-8 py-3.5 text-base font-semibold rounded-lg border border-border text-white hover:bg-surface-light transition-all"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
