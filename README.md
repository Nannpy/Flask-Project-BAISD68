# Kbon — AI-Powered Smart Farming Platform

Link : kbonsite.com

A production-ready AgriTech corporate website with **Next.js 14+** frontend and **Flask REST API** backend.

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Nginx      │────▶│  Next.js     │     │  Flask API   │
│   (port 80)  │     │  (port 3000) │     │  (port 5000) │
│              │────▶│              │────▶│              │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                          ┌──────────────┐
                                          │  PostgreSQL   │
                                          │  (port 5432)  │
                                          └──────────────┘
```

- **Frontend**: Next.js 14+ (App Router, TypeScript, Tailwind CSS v4, SSR)
- **Backend**: Flask (JWT auth, SQLAlchemy, RESTful API)
- **Database**: PostgreSQL (production) / SQLite (development)
- **Proxy**: Nginx reverse proxy with security headers

## Pages

| Page | Path | Rendering |
|------|------|-----------|
| Home | `/` | SSR |
| Solutions | `/solutions` | SSR |
| Technology | `/technology` | SSR |
| Use Cases | `/use-cases` | SSR |
| About | `/about` | SSR |
| Blog List | `/blog` | SSR (ISR 60s) |
| Blog Detail | `/blog/[slug]` | SSR (ISR 60s) |
| Contact | `/contact` | Client |
| Login | `/login` | Client |
| Dashboard | `/dashboard` | Protected |

## Quick Start (Development)

### Prerequisites

- Python 3.11+
- Node.js 20+
- npm

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env

# Start dev server
python run.py

# Seed sample data
flask --app run seed
```

Backend runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### Default Admin Account

After seeding:
- Email: `admin@kbon.io`
- Password: `admin123`

## Docker (Production)

```bash
# Build and start all services
docker compose up --build -d

# Seed the database
docker compose exec backend flask --app run seed
```

Access at `http://localhost` (Nginx on port 80)

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register user |
| POST | `/api/auth/login` | — | Login (sets JWT cookie) |
| POST | `/api/auth/logout` | — | Logout (clears cookie) |
| GET | `/api/auth/me` | JWT | Get current user |

### Blog
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/blog` | — | List posts (paginated) |
| GET | `/api/blog/:slug` | — | Get post by slug |
| POST | `/api/blog` | Admin | Create post |
| PUT | `/api/blog/:id` | Admin | Update post |
| DELETE | `/api/blog/:id` | Admin | Delete post |

### Contact
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | — | Submit message (rate limited) |

### Health
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | — | Health check |

## Project Structure

```
kbon/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # App factory
│   │   ├── config.py            # Environment configs
│   │   ├── extensions.py        # SQLAlchemy, JWT, Limiter
│   │   ├── cli.py               # Flask CLI commands
│   │   ├── models/              # User, BlogPost, ContactMessage
│   │   ├── routes/              # auth, blog, contact, health
│   │   ├── services/            # Business logic
│   │   └── utils/               # Helpers, decorators, seed
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── components/          # Header, Footer, UI
│   │   ├── lib/                 # API client
│   │   └── middleware.ts        # Route protection
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
├── DEPLOYMENT.md
└── README.md
```

## Testing

```bash
# Backend tests
cd backend
pip install -r requirements.txt
python -m pytest tests/ -v

# Frontend build check
cd frontend
npm run build

# run web in local
cd Flask-Project-BAISD68
docker compose up -d
```

## License

Proprietary — Kbon Inc.
