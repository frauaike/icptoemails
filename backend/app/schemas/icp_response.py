from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

class ResponseStatus(str, Enum):
    DRAFT = "draft"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class ICPResponseBase(BaseModel):
    questionnaire_version: str = Field(..., min_length=1)
    responses: Dict[str, Any] = Field(..., description="JSON object containing questionnaire responses")
    status: ResponseStatus = Field(default=ResponseStatus.DRAFT)
    score: Optional[Dict[str, Any]] = Field(None, description="JSON object containing AI analysis results")

class ICPResponseCreate(ICPResponseBase):
    pass

class ICPResponseUpdate(ICPResponseBase):
    pass

class ICPResponse(ICPResponseBase):
    id: str
    user_id: int
    icp_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 