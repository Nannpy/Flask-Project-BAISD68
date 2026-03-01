const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message: string;
}

export async function apiFetch<T = unknown>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: "include",
        ...options,
    });

    const json: ApiResponse<T> = await res.json();
    return json;
}

/* ── Blog types ──────────────────────────────────────── */
export interface BlogPost {
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

export interface BlogListResponse {
    posts: BlogPost[];
    total: number;
    pages: number;
    current_page: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
}

/* ── Auth types ──────────────────────────────────────── */
export interface User {
    id: number;
    email: string;
    role: string;
    created_at: string;
}

/* ── Blog API ────────────────────────────────────────── */
export async function getBlogPosts(page = 1, perPage = 10) {
    return apiFetch<BlogListResponse>(
        `/blog?page=${page}&per_page=${perPage}`
    );
}

export async function getBlogPost(slug: string) {
    return apiFetch<BlogPost>(`/blog/${slug}`);
}

/* ── Contact API ─────────────────────────────────────── */
export async function submitContact(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
}) {
    return apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/* ── Auth API ────────────────────────────────────────── */
export async function login(email: string, password: string) {
    return apiFetch<User>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function logout() {
    return apiFetch("/auth/logout", { method: "POST" });
}

export async function getMe() {
    return apiFetch<User>("/auth/me");
}
