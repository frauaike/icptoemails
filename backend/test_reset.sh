#!/bin/bash

echo "⚠️  Dropping existing containers and volume..."
docker-compose down -v

echo "🚀 Starting fresh Postgres..."
docker-compose up -d

echo "⏳ Waiting for Postgres to be ready..."
until docker exec whisper-db pg_isready > /dev/null 2>&1; do sleep 0.5; done

echo "📦 Running migrations..."
source venv/bin/activate && alembic upgrade head

echo "✅ DB ready." 