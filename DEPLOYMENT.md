# Kbon — Production Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Domain name with DNS configured
- SSL certificate (Let's Encrypt recommended)

## 1. Server Setup

```bash
# Clone the repository
git clone https://github.com/your-org/kbon.git
cd kbon

# Create environment file
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## 2. Configure Environment Variables

### backend/.env
```env
FLASK_ENV=production
SECRET_KEY=<generate-with: python -c "import secrets; print(secrets.token_hex(32))">
JWT_SECRET_KEY=<generate-with: python -c "import secrets; print(secrets.token_hex(32))">
DATABASE_URL=postgresql://kbon:STRONG_PASSWORD@postgres:5432/kbon_db
CORS_ORIGINS=https://yourdomain.com
```

### frontend/.env
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### docker-compose.yml
Update the PostgreSQL password to match `DATABASE_URL`.

## 3. SSL with Nginx

Replace `nginx/nginx.conf` server block with:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # ... keep existing location blocks ...
}
```

Mount SSL certs in `docker-compose.yml`:
```yaml
nginx:
  volumes:
    - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

## 4. Deploy

```bash
# Build and start
docker compose up --build -d

# Seed database (first time)
docker compose exec backend flask --app run seed

# Check logs
docker compose logs -f

# Check health
curl https://yourdomain.com/api/health
```

## 5. Database Migrations

```bash
# Initialize migrations (first time)
docker compose exec backend flask db init
docker compose exec backend flask db migrate -m "Initial migration"
docker compose exec backend flask db upgrade
```

## 6. Monitoring

- **Health endpoint**: `GET /api/health`
- **Docker logs**: `docker compose logs -f <service>`
- **Database**: `docker compose exec postgres psql -U kbon -d kbon_db`

## 7. Backup

```bash
# Database backup
docker compose exec postgres pg_dump -U kbon kbon_db > backup_$(date +%Y%m%d).sql

# Restore
docker compose exec -i postgres psql -U kbon kbon_db < backup_file.sql
```

## 8. Updates

```bash
git pull origin main
docker compose up --build -d
docker compose exec backend flask db upgrade  # if migrations changed
```
