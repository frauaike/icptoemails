from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.core.audit import get_user_audit_logs, get_resource_audit_logs, export_user_audit_logs
from app.models.audit_log import AuditLog
from app.schemas.audit import AuditLogResponse, AuditLogExport
from app.core.exceptions import ResourceNotFound, PermissionDenied

router = APIRouter()

@router.get("/logs", response_model=List[AuditLogResponse])
async def list_audit_logs(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
    action: Optional[str] = None,
    resource_type: Optional[str] = None,
) -> List[AuditLogResponse]:
    """
    List user's audit logs with optional filtering.
    """
    logs = await get_user_audit_logs(
        db=db,
        user_id=current_user.id,
        skip=skip,
        limit=limit,
        action=action,
        resource_type=resource_type
    )
    
    return [AuditLogResponse.from_orm(log) for log in logs]

@router.get("/logs/resource/{resource_type}/{resource_id}", response_model=List[AuditLogResponse])
async def list_resource_audit_logs(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    resource_type: str,
    resource_id: str,
    skip: int = 0,
    limit: int = 100,
) -> List[AuditLogResponse]:
    """
    List audit logs for a specific resource.
    """
    # Verify user has access to the resource
    if not await deps.verify_resource_access(db, current_user, resource_type, resource_id):
        raise PermissionDenied("Access to this resource's audit logs denied")

    logs = await get_resource_audit_logs(
        db=db,
        resource_type=resource_type,
        resource_id=resource_id,
        skip=skip,
        limit=limit
    )
    
    return [AuditLogResponse.from_orm(log) for log in logs]

@router.get("/logs/export", response_model=AuditLogExport)
async def export_audit_logs(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
) -> AuditLogExport:
    """
    Export user's audit logs for GDPR compliance.
    """
    logs = await export_user_audit_logs(
        db=db,
        user_id=current_user.id,
        start_date=start_date,
        end_date=end_date
    )
    
    return AuditLogExport(logs=logs)

@router.get("/logs/{log_id}", response_model=AuditLogResponse)
async def get_audit_log(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    log_id: int,
) -> AuditLogResponse:
    """
    Get a specific audit log entry.
    """
    log = db.query(AuditLog).filter(
        AuditLog.id == log_id,
        AuditLog.user_id == current_user.id
    ).first()
    
    if not log:
        raise ResourceNotFound("Audit log not found")
    
    return AuditLogResponse.from_orm(log) 