from fastapi import Request, HTTPException
from redis import Redis
from datetime import datetime, timedelta
from typing import Optional
import os

class RateLimiter:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
        self.rate_limit = int(os.getenv("RATE_LIMIT", "100"))  # requests per minute
        self.window = 60  # 1 minute window

    async def check_rate_limit(self, request: Request, user_id: Optional[int] = None) -> bool:
        # Get client IP
        client_ip = request.client.host
        
        # Create a unique key for the client
        key = f"rate_limit:{client_ip}:{user_id if user_id else 'anonymous'}"
        
        # Get current count
        current = self.redis.get(key)
        
        if current is None:
            # First request in window
            self.redis.setex(key, self.window, 1)
            return True
            
        current_count = int(current)
        
        if current_count >= self.rate_limit:
            # Rate limit exceeded
            return False
            
        # Increment counter
        self.redis.incr(key)
        return True

    def get_remaining_requests(self, request: Request, user_id: Optional[int] = None) -> int:
        key = f"rate_limit:{request.client.host}:{user_id if user_id else 'anonymous'}"
        current = self.redis.get(key)
        
        if current is None:
            return self.rate_limit
            
        return max(0, self.rate_limit - int(current))

    def get_reset_time(self, request: Request, user_id: Optional[int] = None) -> datetime:
        key = f"rate_limit:{request.client.host}:{user_id if user_id else 'anonymous'}"
        ttl = self.redis.ttl(key)
        
        if ttl <= 0:
            return datetime.utcnow()
            
        return datetime.utcnow() + timedelta(seconds=ttl) 