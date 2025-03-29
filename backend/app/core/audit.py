from functools import wraps
from typing import Optional, Callable, Any
from fastapi import Request, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.models.audit_log import AuditLog
from app.core.security import get_client_ip
from app.core.exceptions import AuditLogError

def audit_log(action: str, resource_type: str):
    """
    Decorator to log user actions for audit purposes.
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                # Get request and user from dependencies
                request: Request = kwargs.get("request")
                current_user = kwargs.get("current_user")
                db: Session = kwargs.get("db")

                if not all([request, current_user, db]):
                    raise AuditLogError("Missing required dependencies for audit logging")

                # Create audit log entry
                audit_entry = AuditLog(
                    user_id=current_user.id,
                    action=action,
                    resource_type=resource_type,
                    resource_id=str(kwargs.get("resource_id", "")),
                    ip_address=get_client_ip(request),
                    user_agent=request.headers.get("user-agent"),
                    additional_data={
                        "endpoint": request.url.path,
                        "method": request.method,
                        "query_params": dict(request.query_params),
                    }
                )

                db.add(audit_entry)
                db.commit()

                # Call the original function
                return await func(*args, **kwargs)

            except Exception as e:
                # Log the error but don't fail the request
                print(f"Audit logging failed: {str(e)}")
                return await func(*args, **kwargs)

        return wrapper
    return decorator

async def get_user_audit_logs(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    action: Optional[str] = None,
    resource_type: Optional[str] = None,
) -> list[AuditLog]:
    """
    Retrieve audit logs for a specific user with optional filtering.
    """
    query = db.query(AuditLog).filter(AuditLog.user_id == user_id)

    if action:
        query = query.filter(AuditLog.action == action)
    if resource_type:
        query = query.filter(AuditLog.resource_type == resource_type)

    return query.order_by(AuditLog.created_at.desc()).offset(skip).limit(limit).all()

async def get_resource_audit_logs(
    db: Session,
    resource_type: str,
    resource_id: str,
    skip: int = 0,
    limit: int = 100,
) -> list[AuditLog]:
    """
    Retrieve audit logs for a specific resource.
    """
    return (
        db.query(AuditLog)
        .filter(
            AuditLog.resource_type == resource_type,
            AuditLog.resource_id == resource_id
        )
        .order_by(AuditLog.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

async def export_user_audit_logs(
    db: Session,
    user_id: int,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
) -> list[dict]:
    """
    Export audit logs for a user in a format suitable for GDPR compliance.
    """
    query = db.query(AuditLog).filter(AuditLog.user_id == user_id)

    if start_date:
        query = query.filter(AuditLog.created_at >= start_date)
    if end_date:
        query = query.filter(AuditLog.created_at <= end_date)

    logs = query.order_by(AuditLog.created_at.desc()).all()

    return [
        {
            "timestamp": log.created_at.isoformat(),
            "action": log.action,
            "resource_type": log.resource_type,
            "resource_id": log.resource_id,
            "ip_address": log.ip_address,
            "user_agent": log.user_agent,
            "additional_data": log.additional_data
        }
        for log in logs
    ] 