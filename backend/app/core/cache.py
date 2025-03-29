from redis import Redis
from typing import Optional, Any
import json
from datetime import timedelta
import os

class CacheService:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
        self.default_ttl = int(os.getenv("CACHE_TTL", "300"))  # 5 minutes default

    async def get_icp(self, icp_id: int) -> Optional[dict]:
        """Get ICP from cache."""
        try:
            key = f"icp:{icp_id}"
            data = self.redis.get(key)
            if data:
                return json.loads(data)
            return None
        except Exception as e:
            # Log error but don't raise - cache miss is acceptable
            return None

    async def set_icp(self, icp_id: int, data: dict, ttl: Optional[int] = None) -> bool:
        """Set ICP in cache."""
        try:
            key = f"icp:{icp_id}"
            ttl = ttl or self.default_ttl
            return self.redis.setex(
                key,
                ttl,
                json.dumps(data)
            )
        except Exception as e:
            # Log error but don't raise - cache miss is acceptable
            return False

    async def delete_icp(self, icp_id: int) -> bool:
        """Delete ICP from cache."""
        try:
            key = f"icp:{icp_id}"
            return bool(self.redis.delete(key))
        except Exception as e:
            # Log error but don't raise
            return False

    async def get_user_icps(self, user_id: int, skip: int = 0, limit: int = 100) -> Optional[list]:
        """Get user's ICPs from cache."""
        try:
            key = f"user_icps:{user_id}:{skip}:{limit}"
            data = self.redis.get(key)
            if data:
                return json.loads(data)
            return None
        except Exception as e:
            return None

    async def set_user_icps(
        self,
        user_id: int,
        data: list,
        skip: int = 0,
        limit: int = 100,
        ttl: Optional[int] = None
    ) -> bool:
        """Set user's ICPs in cache."""
        try:
            key = f"user_icps:{user_id}:{skip}:{limit}"
            ttl = ttl or self.default_ttl
            return self.redis.setex(
                key,
                ttl,
                json.dumps(data)
            )
        except Exception as e:
            return False

    async def invalidate_user_icps(self, user_id: int) -> bool:
        """Invalidate all cached ICPs for a user."""
        try:
            pattern = f"user_icps:{user_id}:*"
            keys = self.redis.keys(pattern)
            if keys:
                return bool(self.redis.delete(*keys))
            return True
        except Exception as e:
            return False 