from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.schemas.icp_response import ICPResponseBase

class ICPBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    industry: Optional[str] = Field(None, max_length=100)
    company_size: Optional[str] = Field(None, max_length=50)

class ICPCreate(ICPBase):
    pass

class ICPUpdate(ICPBase):
    name: Optional[str] = Field(None, min_length=1, max_length=100)

class ICP(ICPBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    icp_responses: List[ICPResponseBase] = []

    class Config:
        from_attributes = True 