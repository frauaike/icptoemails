## Dev Reset (safe wipe + migration)

To reset the development environment and apply database migrations, run:

```bash
cd backend && ./test_reset.sh
```

This will:
1. Drop existing Docker containers and volumes
2. Start a fresh PostgreSQL instance
3. Run database migrations
4. Set up the development environment 