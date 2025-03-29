# Cursor Memory

## Project Overview
- Full-stack application for ICP (Ideal Customer Profile) analysis and email processing
- Backend: FastAPI with PostgreSQL and Redis
- Frontend: Next.js with Radix UI and Tailwind CSS

## Recent Progress
1. Initial Project Setup
   - Created project structure with backend and frontend directories
   - Set up Docker environment with PostgreSQL and Redis
   - Configured Alembic for database migrations
   - Created test_reset.sh script for database management

2. Database Configuration
   - PostgreSQL port changed from 5432 to 5433 to avoid conflicts
   - Updated all configuration files to reflect new port:
     - docker-compose.yml
     - .env.example
     - alembic.ini

3. Git Repository
   - Initialized git repository
   - Created .gitignore file
   - Pushed code to https://github.com/frauaike/icptoemails.git

4. Authentication System
   - Implemented JWT-based authentication
   - Created security module for token handling and password hashing
   - Added authentication schemas and endpoints
   - Set up protected route dependencies
   - Added user registration and login endpoints
   - Implemented password reset and update functionality

## Important Decisions
1. Database Setup
   - Using PostgreSQL 15 for better performance and features
   - Implemented connection pooling with SQLAlchemy
   - Using Alembic for database migrations

2. Development Environment
   - Docker for containerized development
   - Virtual environment for Python dependencies
   - Node.js for frontend development

3. Project Structure
   - Backend follows FastAPI best practices with modular design
   - Frontend uses Next.js with TypeScript for type safety
   - Clear separation of concerns between frontend and backend

4. Authentication
   - JWT-based authentication with refresh tokens
   - Password hashing using bcrypt
   - Role-based access control (RBAC)
   - GDPR-compliant user data handling

## Next Steps
1. Complete Database Setup
   - Implement seed data
   - Add database indexes for performance
   - Set up database backup strategy

2. Core Features
   - ICP questionnaire system
   - Email analysis service
   - Subscription management
   - AI integration with OpenAI

3. Security & Compliance
   - Implement GDPR compliance
   - Add rate limiting
   - Set up monitoring and logging

## Technical Notes
- Database URL format: postgresql://whispersales:whispersales@localhost:5433/whispersales
- Redis URL format: redis://localhost:6379/0
- Using Alembic for database migrations
- Frontend uses Radix UI components with Tailwind CSS for styling
- JWT tokens expire after 30 minutes (configurable in settings)

## Environment Variables
Key environment variables (see .env.example for full list):
- DATABASE_URL
- REDIS_URL
- OPENAI_API_KEY
- STRIPE_SECRET_KEY
- JWT_SECRET_KEY
- ACCESS_TOKEN_EXPIRE_MINUTES

## Development Commands
- Database reset: `cd backend && ./test_reset.sh`
- Run migrations: `alembic upgrade head`
- Start backend: `uvicorn app.main:app --reload`
- Start frontend: `npm run dev`

## API Endpoints
Authentication endpoints:
- POST /api/v1/auth/login - User login
- POST /api/v1/auth/register - User registration
- POST /api/v1/auth/password-reset - Request password reset
- POST /api/v1/auth/password-update - Update user password
