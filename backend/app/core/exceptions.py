from fastapi import HTTPException, status
from typing import Any, Dict, Optional

class BaseAPIException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: Any = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> None:
        super().__init__(status_code=status_code, detail=detail, headers=headers)

class ICPNotFound(BaseAPIException):
    def __init__(self, icp_id: int) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ICP with ID {icp_id} not found"
        )

class ICPAccessDenied(BaseAPIException):
    def __init__(self, icp_id: int) -> None:
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You don't have permission to access ICP with ID {icp_id}"
        )

class ICPValidationError(BaseAPIException):
    def __init__(self, detail: Any) -> None:
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )

class RateLimitExceeded(BaseAPIException):
    def __init__(self, reset_time: str) -> None:
        super().__init__(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "message": "Rate limit exceeded",
                "reset_time": reset_time
            },
            headers={"X-RateLimit-Reset": reset_time}
        )

class DatabaseError(BaseAPIException):
    def __init__(self, detail: str) -> None:
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {detail}"
        )

class RedisError(BaseAPIException):
    def __init__(self, detail: str) -> None:
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Cache error: {detail}"
        ) 