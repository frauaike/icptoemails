# Features Documentation

## Rate Limiting

The application implements rate limiting to protect against abuse and ensure fair usage of the API.

### Configuration

Rate limiting is configured through environment variables:

```env
RATE_LIMIT=100  # requests per minute
```

### Implementation

- Rate limiting is implemented using Redis for distributed rate limiting
- Limits are applied per user and IP address
- Rate limit information is included in response headers:
  - `X-RateLimit-Limit`: Maximum number of requests allowed
  - `X-RateLimit-Remaining`: Number of requests remaining
  - `X-RateLimit-Reset`: Time when the rate limit will reset

### Monitoring

Rate limiting metrics are available through Prometheus:

- `rate_limit_hits_total`: Total number of rate limit hits
- `rate_limit_misses_total`: Total number of rate limit misses
- `rate_limit_current`: Current number of requests in window

## Caching

The application implements caching to improve performance and reduce database load.

### Configuration

Caching is configured through environment variables:

```env
CACHE_TTL=300  # 5 minutes default
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=your_password
```

### Implementation

- Caching is implemented using Redis
- Cache keys follow the pattern:
  - `icp:{id}` for individual ICPs
  - `user_icps:{user_id}:{skip}:{limit}` for user's ICP lists
- Cache invalidation is handled automatically on:
  - ICP creation
  - ICP update
  - ICP deletion
  - Favorite toggling

### Monitoring

Cache metrics are available through Prometheus:

- `cache_hits_total`: Total number of cache hits
- `cache_misses_total`: Total number of cache misses
- `cache_size_bytes`: Current size of cache
- `cache_operation_duration_seconds`: Duration of cache operations

## Error Handling

The application implements comprehensive error handling with custom exceptions.

### Custom Exceptions

- `ICPNotFound`: When an ICP is not found
- `ICPAccessDenied`: When user doesn't have permission to access an ICP
- `ICPValidationError`: When ICP data validation fails
- `RateLimitExceeded`: When rate limit is exceeded
- `DatabaseError`: When database operations fail
- `RedisError`: When cache operations fail

### Error Responses

All errors follow a consistent format:

```json
{
    "detail": {
        "message": "Error message",
        "code": "ERROR_CODE"
    }
}
```

## Monitoring

The application provides comprehensive monitoring through Prometheus metrics.

### Available Metrics

#### Rate Limiting
- `rate_limit_hits_total`: Counter for rate limit hits
- `rate_limit_misses_total`: Counter for rate limit misses
- `rate_limit_current`: Gauge for current requests

#### Caching
- `cache_hits_total`: Counter for cache hits
- `cache_misses_total`: Counter for cache misses
- `cache_size_bytes`: Gauge for cache size
- `cache_operation_duration_seconds`: Histogram for operation durations

### Monitoring Endpoints

- `/metrics`: Prometheus metrics endpoint
- `/health`: Health check endpoint
- `/stats`: Application statistics endpoint

## Testing

The application includes comprehensive tests for all new features.

### Test Categories

1. Rate Limiting Tests
   - Test rate limit checking
   - Test remaining requests calculation
   - Test reset time calculation
   - Test API endpoint rate limiting

2. Caching Tests
   - Test cache operations (get/set/delete)
   - Test cache TTL
   - Test cache invalidation
   - Test user ICP list caching

3. Error Handling Tests
   - Test custom exceptions
   - Test error responses
   - Test error logging

4. Monitoring Tests
   - Test metrics collection
   - Test monitoring endpoints
   - Test statistics calculation

### Running Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_rate_limit.py
pytest tests/test_cache.py

# Run with coverage
pytest --cov=app tests/
``` 