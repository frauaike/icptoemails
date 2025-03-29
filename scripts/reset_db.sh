#!/bin/bash

# Clean reset of the WhisperSales Postgres database
# - Kills connections
# - Drops database OR drops all tables/types if that fails
# - Applies migrations

DB_NAME="whispersales"
DB_USER="postgres"

set -e

function kill_connections() {
  echo "⛔ Killing active connections to $DB_NAME..."
  psql -U $DB_USER -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME';"
}

function drop_database() {
  echo "🗑 Dropping database $DB_NAME..."
  dropdb -U $DB_USER $DB_NAME || fallback_drop_tables
}

function recreate_database() {
  echo "📦 Recreating database $DB_NAME..."
  createdb -U $DB_USER $DB_NAME
}

function fallback_drop_tables() {
  echo "⚠️ Database drop failed. Attempting to drop tables manually..."
  psql -U $DB_USER -d $DB_NAME -c "DROP TABLE IF EXISTS audit_logs, subscriptions, email_analyses, icps, users CASCADE;"
  echo "🧨 Dropping leftover custom types (enums)..."
  psql -U $DB_USER -d $DB_NAME -c "DROP TYPE IF EXISTS accountstatus, userrole, subscriptionplan, subscriptionstatus, actiontype, resourcetype CASCADE;"
}

function run_migrations() {
  echo "🚀 Running Alembic migrations..."
  alembic upgrade head
}

echo "🔁 Starting full reset..."
kill_connections

if drop_database; then
  recreate_database
fi

run_migrations

echo "✅ Done. Database reset and migrated."