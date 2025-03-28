# WhisperSales AI Backend

This is the backend service for WhisperSales AI, a platform that helps users write effective cold emails by analyzing them against ideal customer profiles (ICPs).

## Features

- User authentication with JWT and MFA
- ICP management
- Email analysis using OpenAI
- Subscription management with Stripe
- GDPR compliance
- Comprehensive logging and monitoring

## Tech Stack

- FastAPI
- PostgreSQL
- SQLAlchemy
- Redis
- Celery
- OpenAI
- Stripe

## Prerequisites

- Python 3.11+
- Docker and Docker Compose
- PostgreSQL 16+
- Redis 7+

## Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd whisper-sales-ai/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy the environment variables template:
```bash
cp .env.example .env
```

5. Update the `.env` file with your configuration values.

6. Start the development environment:
```bash
docker-compose up -d
```

7. Run database migrations:
```bash
alembic upgrade head
```

8. Start the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/api/v1/docs`

## Testing

Run the test suite:
```bash
pytest
```

## API Documentation

The API documentation is available at:
- Swagger UI: `/api/v1/docs`
- ReDoc: `/api/v1/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/        # API endpoints
│   ├── core/       # Core configuration
│   ├── db/         # Database configuration
│   ├── models/     # SQLAlchemy models
│   ├── schemas/    # Pydantic schemas
│   ├── services/   # Business logic
│   └── utils/      # Utility functions
├── tests/          # Test suite
├── alembic/        # Database migrations
├── .env.example    # Environment variables template
├── docker-compose.yml
└── requirements.txt
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run the test suite
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 