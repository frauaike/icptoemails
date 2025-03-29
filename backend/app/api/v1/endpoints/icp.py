from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api import deps
from app.models.user import User
from app.models.icp import ICP, ICPResponse
from app.schemas.icp import ICPCreate, ICPUpdate, ICP as ICPSchema
from app.schemas.icp_response import ICPResponseCreate, ICPResponse as ICPResponseSchema
from app.schemas.questionnaire import Questionnaire
from app.core.rate_limit import RateLimiter
from app.core.cache import CacheService
from app.core.exceptions import (
    ICPNotFound,
    ICPAccessDenied,
    ICPValidationError,
    RateLimitExceeded,
    DatabaseError
)
import uuid

router = APIRouter()

@router.get("/icps", response_model=List[ICPSchema])
async def list_icps(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
    rate_limiter: RateLimiter = Depends(deps.get_rate_limiter),
    cache_service: CacheService = Depends(deps.get_cache_service),
    request: Request = Depends(deps.get_request)
):
    """List all ICPs for the current user."""
    # Check rate limit
    if not await rate_limiter.check_rate_limit(request, current_user.id):
        reset_time = rate_limiter.get_reset_time(request, current_user.id)
        raise RateLimitExceeded(reset_time.isoformat())

    # Try to get from cache first
    cached_icps = await cache_service.get_user_icps(current_user.id, skip, limit)
    if cached_icps:
        return cached_icps

    try:
        icps = db.query(ICP).filter(ICP.user_id == current_user.id).offset(skip).limit(limit).all()
        # Cache the results
        await cache_service.set_user_icps(current_user.id, icps, skip, limit)
        return icps
    except Exception as e:
        raise DatabaseError(str(e))

@router.get("/icps/{icp_id}", response_model=ICPSchema)
async def get_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    rate_limiter: RateLimiter = Depends(deps.get_rate_limiter),
    cache_service: CacheService = Depends(deps.get_cache_service),
    request: Request = Depends(deps.get_request)
):
    """Get a specific ICP by ID."""
    # Check rate limit
    if not await rate_limiter.check_rate_limit(request, current_user.id):
        reset_time = rate_limiter.get_reset_time(request, current_user.id)
        raise RateLimitExceeded(reset_time.isoformat())

    # Try to get from cache first
    cached_icp = await cache_service.get_icp(icp_id)
    if cached_icp:
        return cached_icp

    try:
        icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
        if not icp:
            raise ICPNotFound(icp_id)
        
        # Cache the result
        await cache_service.set_icp(icp_id, icp)
        return icp
    except ICPNotFound:
        raise
    except Exception as e:
        raise DatabaseError(str(e))

@router.post("/icps", response_model=ICPSchema)
async def create_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_in: ICPCreate,
    rate_limiter: RateLimiter = Depends(deps.get_rate_limiter),
    cache_service: CacheService = Depends(deps.get_cache_service),
    request: Request = Depends(deps.get_request)
):
    """Create a new ICP."""
    # Check rate limit
    if not await rate_limiter.check_rate_limit(request, current_user.id):
        reset_time = rate_limiter.get_reset_time(request, current_user.id)
        raise RateLimitExceeded(reset_time.isoformat())

    try:
        icp = ICP(
            **icp_in.model_dump(),
            user_id=current_user.id
        )
        db.add(icp)
        db.commit()
        db.refresh(icp)
        
        # Cache the new ICP
        await cache_service.set_icp(icp.id, icp)
        # Invalidate user's ICP list cache
        await cache_service.invalidate_user_icps(current_user.id)
        
        return icp
    except Exception as e:
        db.rollback()
        raise DatabaseError(str(e))

@router.put("/icps/{icp_id}", response_model=ICPSchema)
async def update_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    icp_in: ICPUpdate,
    rate_limiter: RateLimiter = Depends(deps.get_rate_limiter),
    cache_service: CacheService = Depends(deps.get_cache_service),
    request: Request = Depends(deps.get_request)
):
    """Update an ICP."""
    # Check rate limit
    if not await rate_limiter.check_rate_limit(request, current_user.id):
        reset_time = rate_limiter.get_reset_time(request, current_user.id)
        raise RateLimitExceeded(reset_time.isoformat())

    try:
        icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
        if not icp:
            raise ICPNotFound(icp_id)
        
        for field, value in icp_in.model_dump(exclude_unset=True).items():
            setattr(icp, field, value)
        
        db.commit()
        db.refresh(icp)
        
        # Update cache
        await cache_service.set_icp(icp_id, icp)
        # Invalidate user's ICP list cache
        await cache_service.invalidate_user_icps(current_user.id)
        
        return icp
    except ICPNotFound:
        raise
    except Exception as e:
        db.rollback()
        raise DatabaseError(str(e))

@router.delete("/icps/{icp_id}")
async def delete_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    rate_limiter: RateLimiter = Depends(deps.get_rate_limiter),
    cache_service: CacheService = Depends(deps.get_cache_service),
    request: Request = Depends(deps.get_request)
):
    """Delete an ICP."""
    # Check rate limit
    if not await rate_limiter.check_rate_limit(request, current_user.id):
        reset_time = rate_limiter.get_reset_time(request, current_user.id)
        raise RateLimitExceeded(reset_time.isoformat())

    try:
        icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
        if not icp:
            raise ICPNotFound(icp_id)
        
        db.delete(icp)
        db.commit()
        
        # Clear cache
        await cache_service.delete_icp(icp_id)
        # Invalidate user's ICP list cache
        await cache_service.invalidate_user_icps(current_user.id)
        
        return {"message": "ICP deleted successfully"}
    except ICPNotFound:
        raise
    except Exception as e:
        db.rollback()
        raise DatabaseError(str(e))

@router.post("/icps/{icp_id}/favorite")
async def toggle_favorite(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    rate_limiter: RateLimiter = Depends(deps.get_rate_limiter),
    cache_service: CacheService = Depends(deps.get_cache_service),
    request: Request = Depends(deps.get_request)
):
    """Toggle favorite status of an ICP."""
    # Check rate limit
    if not await rate_limiter.check_rate_limit(request, current_user.id):
        reset_time = rate_limiter.get_reset_time(request, current_user.id)
        raise RateLimitExceeded(reset_time.isoformat())

    try:
        icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
        if not icp:
            raise ICPNotFound(icp_id)
        
        icp.is_favorite = not icp.is_favorite
        db.commit()
        db.refresh(icp)
        
        # Update cache
        await cache_service.set_icp(icp_id, icp)
        # Invalidate user's ICP list cache
        await cache_service.invalidate_user_icps(current_user.id)
        
        return {"is_favorite": icp.is_favorite}
    except ICPNotFound:
        raise
    except Exception as e:
        db.rollback()
        raise DatabaseError(str(e))

@router.post("/icps/{icp_id}/responses", response_model=ICPResponseSchema)
def create_icp_response(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    response_in: ICPResponseCreate
):
    """Create a new ICP response."""
    # Verify ICP exists and belongs to user
    icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
    if not icp:
        raise HTTPException(status_code=404, detail="ICP not found")
    
    # Create response with explicit field mapping
    response_data = response_in.model_dump()
    response = ICPResponse(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        icp_id=icp_id,
        **response_data
    )
    db.add(response)
    db.commit()
    db.refresh(response)
    return response

@router.get("/icps/{icp_id}/responses", response_model=List[ICPResponseSchema])
def list_icp_responses(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    skip: int = 0,
    limit: int = 100
):
    """List all responses for a specific ICP."""
    # Verify ICP exists and belongs to user
    icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
    if not icp:
        raise HTTPException(status_code=404, detail="ICP not found")
    
    return db.query(ICPResponse).filter(
        ICPResponse.icp_id == icp_id,
        ICPResponse.user_id == current_user.id
    ).offset(skip).limit(limit).all() 