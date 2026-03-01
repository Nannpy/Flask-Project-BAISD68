import { ReactNode } from "react";

interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
    children?: ReactNode;
    center?: boolean;
}

export function SectionHeading({
    badge,
    title,
    description,
    children,
    center = true,
}: SectionHeadingProps) {
    return (
        <div
            className={`max-w-3xl ${center ? "mx-auto text-center" : ""
                } mb-12 lg:mb-16`}
        >
            {badge && (
                <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                    {badge}
                </span>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                {title}
            </h2>

            {description && (
                <p className="mt-4 text-lg text-muted leading-relaxed">
                    {description}
                </p>
            )}

            {children}
        </div>
    );
}