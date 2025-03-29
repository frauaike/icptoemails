from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class EmailAnalysisBase(BaseModel):
    email_content: str = Field(..., min_length=10)
    icp_id: int

class EmailAnalysisCreate(EmailAnalysisBase):
    pass

class EmailAnalysisResponse(EmailAnalysisBase):
    id: int
    user_id: int
    analysis_result: Dict[str, Any]
    sentiment_score: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class EmailAnalysisList(BaseModel):
    id: int
    icp_id: int
    sentiment_score: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class EmailAnalysisFeedback(BaseModel):
    strengths: list[str]
    weaknesses: list[str]
    improvement_suggestions: list[str]
    icp_alignment_score: float
    persona_match_score: float
    pain_point_addressal: Dict[str, Any] 