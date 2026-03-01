import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content?: string;
    cover_image: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
}

const FALLBACK_POSTS: Record<string, BlogPost> = {
    "the-future-of-ai-driven-crop-monitoring": {
        id: 1,
        title: "The Future of AI-Driven Crop Monitoring",
        slug: "the-future-of-ai-driven-crop-monitoring",
        excerpt: "Discover how artificial intelligence is revolutionizing the way farmers monitor crop health.",
        content: `## AI-Driven Crop Monitoring: A New Era

Artificial intelligence is transforming agriculture at an unprecedented pace. At Kbon, we leverage deep learning models trained on millions of satellite and drone images to detect early signs of crop stress, disease, and nutrient deficiency.

### How It Works

Our AI pipeline processes multi-spectral imagery captured by IoT-enabled drones and satellite feeds. The system analyzes:

- **Normalized Difference Vegetation Index (NDVI)** — measures plant health
- **Chlorophyll content estimation** — identifies nutrient stress
- **Thermal imaging** — detects water stress before visible wilting

### Real-World Impact

Farmers using Kbon's platform have reported:
- 30% reduction in pesticide usage
- 25% improvement in yield prediction accuracy
- 40% savings in water consumption

The future of farming is data-driven, and Kbon is leading the charge.`,
        cover_image: null,
        published: true,
        created_at: "2024-12-15T10:00:00",
        updated_at: "2024-12-15T10:00:00",
    },
    "iot-sensors-in-modern-agriculture-a-complete-guide": {
        id: 2,
        title: "IoT Sensors in Modern Agriculture: A Complete Guide",
        slug: "iot-sensors-in-modern-agriculture-a-complete-guide",
        excerpt: "Learn how IoT sensor networks are enabling real-time monitoring of soil conditions.",
        content: `## IoT Sensors: The Backbone of Smart Farming

The Internet of Things (IoT) has found one of its most impactful applications in agriculture. By deploying networks of low-power sensors across farmland, growers gain unprecedented visibility into environmental conditions.

### Types of Sensors

1. **Soil Moisture Sensors** — Capacitive and TDR-based sensors measure volumetric water content
2. **Weather Stations** — On-farm microclimate data including temperature, humidity, wind speed
3. **Leaf Wetness Sensors** — Early warning system for fungal disease conditions
4. **NPK Sensors** — Real-time soil nutrient monitoring

### Kbon's IoT Platform

Our edge-computing gateway aggregates data from up to 500 sensors per node, processes readings locally, and transmits summaries via LoRaWAN to the cloud. This architecture ensures:

- Ultra-low latency alerts
- Minimal bandwidth usage
- 3-year battery life on sensor nodes

Smart farming starts with smart sensing.`,
        cover_image: null,
        published: true,
        created_at: "2024-12-10T10:00:00",
        updated_at: "2024-12-10T10:00:00",
    },
    "sustainable-agriculture-through-precision-technology": {
        id: 3,
        title: "Sustainable Agriculture Through Precision Technology",
        slug: "sustainable-agriculture-through-precision-technology",
        excerpt: "Precision agriculture technologies are helping farmers reduce waste and minimize environmental impact.",
        content: `## Precision Agriculture for Sustainability

By 2050, the world will need to produce 60% more food. Precision agriculture is the key to meeting this demand without destroying the planet.

### Variable Rate Technology (VRT)

Kbon's VRT integration allows farmers to apply fertilizers, pesticides, and water at variable rates across a field based on real-time sensor data and AI recommendations.

### Carbon Footprint Tracking

Our platform includes built-in carbon accounting tools that help farms:
- Track emissions per acre
- Generate sustainability reports
- Qualify for carbon credit programs

### Results from the Field

A 10,000-acre corn operation in the Midwest reduced nitrogen fertilizer usage by 22% while maintaining yield — a $150,000 annual saving and 800 tons of CO₂ equivalent reduction.

Sustainability isn't just good ethics — it's good business.`,
        cover_image: null,
        published: true,
        created_at: "2024-12-05T10:00:00",
        updated_at: "2024-12-05T10:00:00",
    },
    "from-field-to-cloud-building-a-data-pipeline-for-agriculture": {
        id: 4,
        title: "From Field to Cloud: Building a Data Pipeline for Agriculture",
        slug: "from-field-to-cloud-building-a-data-pipeline-for-agriculture",
        excerpt: "A technical deep-dive into how Kbon's data pipeline processes millions of data points.",
        content: `## The Agricultural Data Pipeline

Modern smart farming generates enormous volumes of data. A single 1,000-acre farm with comprehensive sensor coverage produces over 2 million data points per day.

### Architecture Overview

Kbon's data pipeline follows a Lambda architecture:

1. **Ingestion Layer** — MQTT brokers receive sensor telemetry at the edge
2. **Stream Processing** — Apache Kafka streams for real-time alerting
3. **Batch Processing** — Spark jobs for historical analysis and model training
4. **Serving Layer** — PostgreSQL + TimescaleDB for fast time-series queries
5. **Presentation** — REST APIs serving the Kbon dashboard

### Data Quality

Raw sensor data is noisy. Our pipeline includes automated quality checks:
- Outlier detection using isolation forests
- Missing value imputation
- Sensor drift calibration

Clean data leads to better decisions.`,
        cover_image: null,
        published: true,
        created_at: "2024-11-28T10:00:00",
        updated_at: "2024-11-28T10:00:00",
    },
    "the-roi-of-smart-farming-what-the-numbers-say": {
        id: 5,
        title: "The ROI of Smart Farming: What the Numbers Say",
        slug: "the-roi-of-smart-farming-what-the-numbers-say",
        excerpt: "We break down the return on investment for farms adopting smart agriculture technology.",
        content: `## Smart Farming ROI: By the Numbers

Investing in agricultural technology isn't just about innovation — it's about profitability.

### Case Study: Midwest Corn & Soybean

- **Investment**: $45,000 (sensors + platform subscription)
- **Annual Savings**: $180,000 (reduced inputs, optimized irrigation)
- **ROI**: 300% in Year 1
- **Payback Period**: 3 months

### Case Study: California Vineyard

- **Investment**: $28,000
- **Annual Savings**: $95,000 (water savings, reduced crop loss)
- **ROI**: 239% in Year 1
- **Quality Improvement**: 15% increase in premium grape classification

### Industry Averages

According to recent studies, farms adopting precision agriculture see:
- 15-25% reduction in input costs
- 10-20% yield improvement
- 20-30% water savings

The question isn't whether you can afford to invest in smart farming — it's whether you can afford not to.`,
        cover_image: null,
        published: true,
        created_at: "2024-11-20T10:00:00",
        updated_at: "2024-11-20T10:00:00",
    },
};

async function getPost(slug: string): Promise<BlogPost | null> {
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${API_BASE}/blog/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (json.success && json.data) return json.data;
        return FALLBACK_POSTS[slug] || null;
    } catch {
        return FALLBACK_POSTS[slug] || null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: post.title,
        description: post.excerpt || undefined,
        openGraph: {
            title: post.title,
            description: post.excerpt || undefined,
            type: "article",
            publishedTime: post.created_at,
        },
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function renderMarkdown(content: string) {
    // Simple markdown-to-HTML for headings, bold, lists, paragraphs
    const lines = content.split("\n");
    const html: string[] = [];
    let inList = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            if (inList) { html.push("</ul>"); inList = false; }
            continue;
        }
        if (trimmed.startsWith("### ")) {
            if (inList) { html.push("</ul>"); inList = false; }
            html.push(`<h3 class="text-xl font-semibold text-white mt-8 mb-3">${trimmed.slice(4)}</h3>`);
        } else if (trimmed.startsWith("## ")) {
            if (inList) { html.push("</ul>"); inList = false; }
            html.push(`<h2 class="text-2xl font-bold text-white mt-10 mb-4">${trimmed.slice(3)}</h2>`);
        } else if (trimmed.startsWith("- ")) {
            if (!inList) { html.push('<ul class="list-disc list-inside space-y-2 text-muted">'); inList = true; }
            const item = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
            html.push(`<li>${item}</li>`);
        } else if (/^\d+\.\s/.test(trimmed)) {
            if (!inList) { html.push('<ol class="list-decimal list-inside space-y-2 text-muted">'); inList = true; }
            const item = trimmed.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
            html.push(`<li>${item}</li>`);
        } else {
            if (inList) { html.push("</ul>"); inList = false; }
            const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
            html.push(`<p class="text-muted leading-relaxed mb-4">${formatted}</p>`);
        }
    }
    if (inList) html.push("</ul>");
    return html.join("\n");
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    return (
        <article className="py-16 lg:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-8"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <time className="text-sm text-muted">{formatDate(post.created_at)}</time>
                    <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="mt-4 text-lg text-muted leading-relaxed">{post.excerpt}</p>
                    )}
                </header>

                <div className="h-px bg-border/60 mb-10" />

                {/* Content */}
                <div
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || "") }}
                />

                <div className="h-px bg-border/60 mt-12 mb-8" />

                {/* Footer nav */}
                <div className="flex justify-between items-center">
                    <Link
                        href="/blog"
                        className="text-sm text-primary hover:text-primary-light transition-colors"
                    >
                        ← All Posts
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-primary text-background hover:bg-primary-dark transition-all"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </article>
    );
}
