import pytest
from app.core.cache import CacheService
from app.core.config import settings
import redis
import json

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
def cache_service(redis_client):
    """Create a cache service instance."""
    return CacheService(redis_client)

@pytest.fixture
def sample_icp():
    """Create a sample ICP for testing."""
    return {
        "id": 1,
        "name": "Test ICP",
        "industry": "Technology",
        "company_size": "1-10",
        "persona_title": "CTO",
        "persona_responsibilities": "Technical leadership",
        "pain_points": "Scaling issues",
        "goals": "Improve efficiency",
        "challenges": "Resource constraints",
        "is_favorite": False
    }

async def test_set_and_get_icp(cache_service, sample_icp):
    """Test setting and getting an ICP from cache."""
    # Set ICP in cache
    success = await cache_service.set_icp(sample_icp["id"], sample_icp)
    assert success is True
    
    # Get ICP from cache
    cached_icp = await cache_service.get_icp(sample_icp["id"])
    assert cached_icp == sample_icp

async def test_delete_icp(cache_service, sample_icp):
    """Test deleting an ICP from cache."""
    # Set ICP in cache
    await cache_service.set_icp(sample_icp["id"], sample_icp)
    
    # Delete ICP from cache
    success = await cache_service.delete_icp(sample_icp["id"])
    assert success is True
    
    # Verify ICP is deleted
    cached_icp = await cache_service.get_icp(sample_icp["id"])
    assert cached_icp is None

async def test_set_and_get_user_icps(cache_service, sample_icp):
    """Test setting and getting user's ICPs from cache."""
    user_id = 1
    icps = [sample_icp]
    
    # Set user's ICPs in cache
    success = await cache_service.set_user_icps(user_id, icps)
    assert success is True
    
    # Get user's ICPs from cache
    cached_icps = await cache_service.get_user_icps(user_id)
    assert cached_icps == icps

async def test_invalidate_user_icps(cache_service, sample_icp):
    """Test invalidating all cached ICPs for a user."""
    user_id = 1
    
    # Set multiple ICPs for user with different pagination
    await cache_service.set_user_icps(user_id, [sample_icp], skip=0, limit=10)
    await cache_service.set_user_icps(user_id, [sample_icp], skip=10, limit=10)
    
    # Invalidate user's ICPs
    success = await cache_service.invalidate_user_icps(user_id)
    assert success is True
    
    # Verify all ICPs are deleted
    cached_icps_1 = await cache_service.get_user_icps(user_id, skip=0, limit=10)
    cached_icps_2 = await cache_service.get_user_icps(user_id, skip=10, limit=10)
    assert cached_icps_1 is None
    assert cached_icps_2 is None

async def test_cache_ttl(cache_service, sample_icp):
    """Test cache TTL functionality."""
    # Set ICP with short TTL
    await cache_service.set_icp(sample_icp["id"], sample_icp, ttl=1)
    
    # Verify ICP is in cache
    cached_icp = await cache_service.get_icp(sample_icp["id"])
    assert cached_icp == sample_icp
    
    # Wait for TTL to expire
    import asyncio
    await asyncio.sleep(2)
    
    # Verify ICP is no longer in cache
    cached_icp = await cache_service.get_icp(sample_icp["id"])
    assert cached_icp is None 