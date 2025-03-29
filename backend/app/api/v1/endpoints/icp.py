from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api import deps
from app.models.user import User
from app.models.icp import ICP, ICPResponse
from app.schemas.icp import ICPCreate, ICPUpdate, ICP as ICPSchema
from app.schemas.icp_response import ICPResponseCreate, ICPResponse as ICPResponseSchema
from app.schemas.questionnaire import Questionnaire
import uuid

router = APIRouter()

@router.get("/icps", response_model=List[ICPSchema])
def list_icps(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100
):
    """List all ICPs for the current user."""
    return db.query(ICP).filter(ICP.user_id == current_user.id).offset(skip).limit(limit).all()

@router.post("/icps", response_model=ICPSchema)
def create_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_in: ICPCreate
):
    """Create a new ICP."""
    icp = ICP(
        **icp_in.model_dump(),
        user_id=current_user.id
    )
    db.add(icp)
    db.commit()
    db.refresh(icp)
    return icp

@router.get("/icps/{icp_id}", response_model=ICPSchema)
def get_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int
):
    """Get a specific ICP by ID."""
    icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
    if not icp:
        raise HTTPException(status_code=404, detail="ICP not found")
    return icp

@router.put("/icps/{icp_id}", response_model=ICPSchema)
def update_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int,
    icp_in: ICPUpdate
):
    """Update an ICP."""
    icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
    if not icp:
        raise HTTPException(status_code=404, detail="ICP not found")
    
    for field, value in icp_in.model_dump(exclude_unset=True).items():
        setattr(icp, field, value)
    
    db.commit()
    db.refresh(icp)
    return icp

@router.delete("/icps/{icp_id}")
def delete_icp(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    icp_id: int
):
    """Delete an ICP."""
    icp = db.query(ICP).filter(ICP.id == icp_id, ICP.user_id == current_user.id).first()
    if not icp:
        raise HTTPException(status_code=404, detail="ICP not found")
    
    db.delete(icp)
    db.commit()
    return {"message": "ICP deleted successfully"}

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