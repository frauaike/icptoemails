from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.core.rate_limit import rate_limit
from app.core.audit import audit_log
from app.models.email_analysis import EmailAnalysis
from app.models.icp import ICP
from app.schemas.email_analysis import (
    EmailAnalysisCreate,
    EmailAnalysisResponse,
    EmailAnalysisList,
)
from app.core.openai import analyze_email
from app.core.exceptions import RateLimitExceeded, ResourceNotFound

router = APIRouter()

@router.post("/analyze", response_model=EmailAnalysisResponse)
@rate_limit(max_requests=50, window_seconds=3600)  # 50 requests per hour
@audit_log(action="create", resource_type="email_analysis")
async def create_email_analysis(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    analysis: EmailAnalysisCreate,
) -> EmailAnalysisResponse:
    """
    Create a new email analysis.
    """
    # Verify ICP exists and belongs to user
    icp = db.query(ICP).filter(
        ICP.id == analysis.icp_id,
        ICP.user_id == current_user.id
    ).first()
    
    if not icp:
        raise ResourceNotFound("ICP not found")

    # Check subscription limits
    if not current_user.subscription.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Subscription required for email analysis"
        )

    # Analyze email using OpenAI
    analysis_result = await analyze_email(
        email_content=analysis.email_content,
        icp=icp
    )

    # Create analysis record
    db_analysis = EmailAnalysis(
        user_id=current_user.id,
        icp_id=analysis.icp_id,
        email_content=analysis.email_content,
        analysis_result=analysis_result,
        sentiment_score=analysis_result.get("sentiment_score"),
    )
    
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)

    return EmailAnalysisResponse.from_orm(db_analysis)

@router.get("/analyses", response_model=List[EmailAnalysisList])
@audit_log(action="read", resource_type="email_analysis")
async def list_email_analyses(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 10,
) -> List[EmailAnalysisList]:
    """
    List user's email analyses with pagination.
    """
    analyses = db.query(EmailAnalysis).filter(
        EmailAnalysis.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return [EmailAnalysisList.from_orm(analysis) for analysis in analyses]

@router.get("/analyses/{analysis_id}", response_model=EmailAnalysisResponse)
@audit_log(action="read", resource_type="email_analysis")
async def get_email_analysis(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    analysis_id: int,
) -> EmailAnalysisResponse:
    """
    Get a specific email analysis by ID.
    """
    analysis = db.query(EmailAnalysis).filter(
        EmailAnalysis.id == analysis_id,
        EmailAnalysis.user_id == current_user.id
    ).first()
    
    if not analysis:
        raise ResourceNotFound("Email analysis not found")
    
    return EmailAnalysisResponse.from_orm(analysis)

@router.delete("/analyses/{analysis_id}")
@audit_log(action="delete", resource_type="email_analysis")
async def delete_email_analysis(
    *,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user),
    analysis_id: int,
) -> dict:
    """
    Delete a specific email analysis.
    """
    analysis = db.query(EmailAnalysis).filter(
        EmailAnalysis.id == analysis_id,
        EmailAnalysis.user_id == current_user.id
    ).first()
    
    if not analysis:
        raise ResourceNotFound("Email analysis not found")
    
    db.delete(analysis)
    db.commit()
    
    return {"message": "Email analysis deleted successfully"} 