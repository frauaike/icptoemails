import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timedelta
from app.core.rate_limit import RateLimiter
from app.main import app
from app.core.config import settings
import redis

client = TestClient(app)

@pytest.fixture
def redis_client():
    """Create a test Redis client."""
    return redis.Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        db=settings.REDIS_DB,
        password=settings.REDIS_PASSWORD,
        decode_responses=True
    )

@pytest.fixture
def rate_limiter(redis_client):
    """Create a rate limiter instance."""
    return RateLimiter(redis_client)

def test_rate_limit_check(rate_limiter, redis_client):
    """Test rate limit checking."""
    # Clear any existing rate limit keys
    redis_client.delete("rate_limit:127.0.0.1:test_user")
    
    # Test first request (should pass)
    assert rate_limiter.check_rate_limit(None, "test_user") is True
    
    # Test requests up to limit (should pass)
    for _ in range(settings.RATE_LIMIT - 1):
        assert rate_limiter.check_rate_limit(None, "test_user") is True
    
    # Test request exceeding limit (should fail)
    assert rate_limiter.check_rate_limit(None, "test_user") is False

def test_get_remaining_requests(rate_limiter, redis_client):
    """Test getting remaining requests."""
    # Clear any existing rate limit keys
    redis_client.delete("rate_limit:127.0.0.1:test_user")
    
    # Test initial state
    assert rate_limiter.get_remaining_requests(None, "test_user") == settings.RATE_LIMIT
    
    # Make some requests
    for _ in range(5):
        rate_limiter.check_rate_limit(None, "test_user")
    
    # Check remaining requests
    assert rate_limiter.get_remaining_requests(None, "test_user") == settings.RATE_LIMIT - 5

def test_get_reset_time(rate_limiter, redis_client):
    """Test getting reset time."""
    # Clear any existing rate limit keys
    redis_client.delete("rate_limit:127.0.0.1:test_user")
    
    # Set up a rate limit
    rate_limiter.check_rate_limit(None, "test_user")
    
    # Get reset time
    reset_time = rate_limiter.get_reset_time(None, "test_user")
    
    # Verify reset time is in the future
    assert reset_time > datetime.utcnow()
    # Verify reset time is within the window
    assert reset_time <= datetime.utcnow() + timedelta(seconds=60)

def test_rate_limit_api_endpoint():
    """Test rate limiting on API endpoints."""
    # Clear any existing rate limit keys
    redis_client.delete("rate_limit:127.0.0.1:test_user")
    
    # Make requests up to limit
    for _ in range(settings.RATE_LIMIT):
        response = client.get("/api/v1/icp/icps", headers={"Authorization": "Bearer test_token"})
        assert response.status_code in [200, 401]  # 401 is expected if token is invalid
    
    # Next request should be rate limited
    response = client.get("/api/v1/icp/icps", headers={"Authorization": "Bearer test_token"})
    assert response.status_code == 429
    assert "X-RateLimit-Reset" in response.headers 