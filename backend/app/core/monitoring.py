from prometheus_client import Counter, Histogram, Gauge
from typing import Optional
import time
from redis import Redis
from app.core.config import settings

# Rate Limiting Metrics
RATE_LIMIT_HITS = Counter(
    'rate_limit_hits_total',
    'Total number of rate limit hits',
    ['client_ip', 'user_id']
)

RATE_LIMIT_MISSES = Counter(
    'rate_limit_misses_total',
    'Total number of rate limit misses',
    ['client_ip', 'user_id']
)

RATE_LIMIT_CURRENT = Gauge(
    'rate_limit_current',
    'Current number of requests in window',
    ['client_ip', 'user_id']
)

# Cache Metrics
CACHE_HITS = Counter(
    'cache_hits_total',
    'Total number of cache hits',
    ['cache_type']
)

CACHE_MISSES = Counter(
    'cache_misses_total',
    'Total number of cache misses',
    ['cache_type']
)

CACHE_SIZE = Gauge(
    'cache_size_bytes',
    'Current size of cache in bytes',
    ['cache_type']
)

# Performance Metrics
CACHE_OPERATION_DURATION = Histogram(
    'cache_operation_duration_seconds',
    'Duration of cache operations',
    ['operation', 'cache_type']
)

class MonitoringService:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client

    def record_rate_limit_hit(self, client_ip: str, user_id: Optional[int] = None):
        """Record a rate limit hit."""
        RATE_LIMIT_HITS.labels(
            client_ip=client_ip,
            user_id=str(user_id) if user_id else 'anonymous'
        ).inc()

    def record_rate_limit_miss(self, client_ip: str, user_id: Optional[int] = None):
        """Record a rate limit miss."""
        RATE_LIMIT_MISSES.labels(
            client_ip=client_ip,
            user_id=str(user_id) if user_id else 'anonymous'
        ).inc()

    def update_rate_limit_current(self, client_ip: str, count: int, user_id: Optional[int] = None):
        """Update current rate limit count."""
        RATE_LIMIT_CURRENT.labels(
            client_ip=client_ip,
            user_id=str(user_id) if user_id else 'anonymous'
        ).set(count)

    def record_cache_hit(self, cache_type: str):
        """Record a cache hit."""
        CACHE_HITS.labels(cache_type=cache_type).inc()

    def record_cache_miss(self, cache_type: str):
        """Record a cache miss."""
        CACHE_MISSES.labels(cache_type=cache_type).inc()

    async def update_cache_size(self):
        """Update cache size metrics."""
        try:
            # Get all keys
            keys = self.redis.keys('*')
            total_size = 0
            
            for key in keys:
                # Get size of key and its value
                key_size = len(key)
                value_size = len(self.redis.get(key) or '')
                total_size += key_size + value_size
            
            CACHE_SIZE.labels(cache_type='icp').set(total_size)
        except Exception as e:
            # Log error but don't raise
            pass

    def record_cache_operation(self, operation: str, cache_type: str, duration: float):
        """Record cache operation duration."""
        CACHE_OPERATION_DURATION.labels(
            operation=operation,
            cache_type=cache_type
        ).observe(duration)

    async def get_cache_stats(self) -> dict:
        """Get current cache statistics."""
        try:
            return {
                'hits': CACHE_HITS.labels(cache_type='icp')._value.get(),
                'misses': CACHE_MISSES.labels(cache_type='icp')._value.get(),
                'size_bytes': CACHE_SIZE.labels(cache_type='icp')._value.get(),
                'hit_ratio': (
                    CACHE_HITS.labels(cache_type='icp')._value.get() /
                    (CACHE_HITS.labels(cache_type='icp')._value.get() +
                     CACHE_MISSES.labels(cache_type='icp')._value.get())
                    if (CACHE_HITS.labels(cache_type='icp')._value.get() +
                        CACHE_MISSES.labels(cache_type='icp')._value.get()) > 0
                    else 0
                )
            }
        except Exception as e:
            return {
                'hits': 0,
                'misses': 0,
                'size_bytes': 0,
                'hit_ratio': 0
            }

    async def get_rate_limit_stats(self) -> dict:
        """Get current rate limit statistics."""
        try:
            return {
                'hits': RATE_LIMIT_HITS._value.get(),
                'misses': RATE_LIMIT_MISSES._value.get(),
                'current_requests': RATE_LIMIT_CURRENT._value.get()
            }
        except Exception as e:
            return {
                'hits': 0,
                'misses': 0,
                'current_requests': 0
            } 