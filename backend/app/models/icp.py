from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func, JSON, Index
from sqlalchemy.orm import relationship
from app.models.base import Base


class ICP(Base):
    __tablename__ = "icps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    industry = Column(String)
    company_size = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="icps")
    icp_responses = relationship("ICPResponse", back_populates="icp")

class ICPResponse(Base):
    __tablename__ = "icp_responses"

    id = Column(String, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    icp_id = Column(Integer, ForeignKey("icps.id"), nullable=False)
    questionnaire_version = Column(String, nullable=False)
    responses = Column(JSON, nullable=False)
    status = Column(String, default="draft")  # draft, completed, archived
    score = Column(JSON, nullable=True)  # Store AI analysis results
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="icp_responses")
    icp = relationship("ICP", back_populates="icp_responses")

    # Indexes
    __table_args__ = (
        Index('idx_icp_response_user_id', 'user_id'),
        Index('idx_icp_response_status', 'status'),
        Index('idx_icp_response_version', 'questionnaire_version'),
        {'extend_existing': True}
    ) 