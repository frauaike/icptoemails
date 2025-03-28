from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from app.db.session import Base

class EmailAnalysis(Base):
    __tablename__ = "email_analyses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    icp_id = Column(Integer, ForeignKey("icps.id"), nullable=False)
    
    # Email Content
    original_email = Column(String, nullable=False)
    suggested_rewrite = Column(String)
    
    # Analysis Results
    score = Column(Float)  # 0-100 score
    feedback = Column(JSON)  # Store detailed feedback as JSON
    
    # Analysis Details
    strengths = Column(JSON)  # Store as JSON array
    weaknesses = Column(JSON)  # Store as JSON array
    improvement_suggestions = Column(JSON)  # Store as JSON array
    
    # ICP Alignment
    icp_alignment_score = Column(Float)  # 0-100 score
    persona_match_score = Column(Float)  # 0-100 score
    pain_point_addressal = Column(JSON)  # Store as JSON object mapping pain points to coverage
    
    # Metadata
    analysis_timestamp = Column(DateTime, default=datetime.utcnow)
    model_version = Column(String)  # OpenAI model version used
    
    # Relationships
    user = relationship("User", back_populates="email_analyses")
    icp = relationship("ICP", back_populates="email_analyses") 