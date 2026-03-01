import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Insights, guides, and industry analysis from the Kbon team on AI-driven agriculture, IoT sensors, and sustainable farming.",
};

/**
 * Map slug -> image file inside /public/blog
 * IMPORTANT:
 * Files must exist in: frontend/public/blog/
 */
const SLUG_IMAGE_MAP: Record<string, string> = {
    "the-future-of-ai-driven-crop-monitoring": "/blog/aicrop.png",
    "iot-sensors-in-modern-agriculture-a-complete-guide": "/blog/iotsensor.jpg",
    "sustainable-agriculture-through-precision-technology": "/blog/sustain.webp",
    "from-field-to-cloud-building-a-data-pipeline-for-agriculture":
        "/blog/fieldtocloud.png",
    "the-roi-of-smart-farming-what-the-numbers-say": "/blog/Roi.jpg",
};

// Fallback blog data when API is unavailable
const FALLBACK_POSTS = [
    {
        id: 1,
        title: "The Future of AI-Driven Crop Monitoring",
        slug: "the-future-of-ai-driven-crop-monitoring",
        excerpt:
            "Discover how artificial intelligence is revolutionizing the way farmers monitor crop health, predict yields, and optimize resource usage across thousands of hectares.",
        cover_image: null,
        published: true,
        created_at: "2024-12-15T10:00:00",
        updated_at: "2024-12-15T10:00:00",
    },
    {
        id: 2,
        title: "IoT Sensors in Modern Agriculture: A Complete Guide",
        slug: "iot-sensors-in-modern-agriculture-a-complete-guide",
        excerpt:
            "Learn how IoT sensor networks are enabling real-time monitoring of soil moisture, temperature, humidity, and more — transforming farms into smart, connected ecosystems.",
        cover_image: null,
        published: true,
        created_at: "2024-12-10T10:00:00",
        updated_at: "2024-12-10T10:00:00",
    },
    {
        id: 3,
        title: "Sustainable Agriculture Through Precision Technology",
        slug: "sustainable-agriculture-through-precision-technology",
        excerpt:
            "Precision agriculture technologies are helping farmers reduce waste, minimize environmental impact, and increase profitability — all while feeding a growing global population.",
        cover_image: null,
        published: true,
        created_at: "2024-12-05T10:00:00",
        updated_at: "2024-12-05T10:00:00",
    },
    {
        id: 4,
        title:
            "From Field to Cloud: Building a Data Pipeline for Agriculture",
        slug: "from-field-to-cloud-building-a-data-pipeline-for-agriculture",
        excerpt:
            "A technical deep-dive into how Kbon's data pipeline processes millions of data points from farm sensors into actionable intelligence for growers.",
        cover_image: null,
        published: true,
        created_at: "2024-11-28T10:00:00",
        updated_at: "2024-11-28T10:00:00",
    },
    {
        id: 5,
        title: "The ROI of Smart Farming: What the Numbers Say",
        slug: "the-roi-of-smart-farming-what-the-numbers-say",
        excerpt:
            "We break down the return on investment for farms adopting smart agriculture technology, with real case studies and financial analysis.",
        cover_image: null,
        published: true,
        created_at: "2024-11-20T10:00:00",
        updated_at: "2024-11-20T10:00:00",
    },
];

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
}

async function getPosts(): Promise<BlogPost[]> {
    try {
        const API_BASE =
            process.env.NEXT_PUBLIC_API_URL ||
            "http://localhost:5000/api";

        const res = await fetch(`${API_BASE}/blog?per_page=20`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) throw new Error("API error");

        const json = await res.json();

        if (json.success && json.data?.posts?.length > 0) {
            return json.data.posts;
        }

        return FALLBACK_POSTS;
    } catch {
        return FALLBACK_POSTS;
    }
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <>
            {/* Hero */}
            <section className="bg-hero-gradient bg-grid-pattern py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            badge="Blog"
                            title="Insights & Industry Analysis"
                            description="The latest thinking from the Kbon team on AI, IoT, precision agriculture, and the future of sustainable farming."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Posts grid */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, i) => {
                            const imageSrc =
                                post.cover_image ||
                                SLUG_IMAGE_MAP[post.slug] ||
                                "/blog/aicrop.png"; // ultimate fallback

                            return (
                                <AnimatedSection key={post.id} delay={i * 80}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="block h-full"
                                    >
                                        <article className="h-full flex flex-col rounded-xl bg-surface border border-border/60 overflow-hidden card-hover">
                                            {/* Cover Image */}
                                            <div className="relative w-full h-44">
                                                <Image
                                                    src={imageSrc}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw,
                                 (max-width: 1200px) 50vw,
                                 33vw"
                                                />
                                            </div>

                                            <div className="p-6 flex flex-col flex-1">
                                                <time className="text-xs text-muted mb-2">
                                                    {formatDate(post.created_at)}
                                                </time>

                                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                                    {post.title}
                                                </h3>

                                                <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <span className="mt-4 text-sm font-medium text-primary">
                                                    Read more →
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}