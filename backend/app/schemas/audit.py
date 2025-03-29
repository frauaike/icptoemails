from typing import Dict, List, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class AuditLogBase(BaseModel):
    action: str = Field(..., description="The action performed (e.g., create, update, delete)")
    resource_type: str = Field(..., description="The type of resource affected (e.g., icp, email_analysis)")
    resource_id: str = Field(..., description="The ID of the affected resource")
    details: Dict = Field(default_factory=dict, description="Additional details about the action")
    ip_address: Optional[str] = Field(None, description="IP address of the user")
    user_agent: Optional[str] = Field(None, description="User agent string")

class AuditLogCreate(AuditLogBase):
    user_id: int = Field(..., description="ID of the user performing the action")

class AuditLogResponse(AuditLogBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class AuditLogExport(BaseModel):
    logs: List[Dict] = Field(..., description="List of audit log entries in export format")
    export_date: datetime = Field(default_factory=datetime.utcnow)
    total_entries: int = Field(..., description="Total number of entries exported") 