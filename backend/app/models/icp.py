from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

class ICP(Base):
    __tablename__ = "icps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Basic Information
    name = Column(String, nullable=False)
    industry = Column(String)
    company_size = Column(String)
    
    # Persona Details
    persona_title = Column(String)
    persona_responsibilities = Column(String)
    
    # Pain Points and Goals
    pain_points = Column(JSON)  # Store as JSON array
    goals = Column(JSON)  # Store as JSON array
    
    # Additional Context
    key_metrics = Column(JSON)  # Store as JSON object
    budget_range = Column(String)
    decision_making_process = Column(String)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="icps")
    email_analyses = relationship("EmailAnalysis", back_populates="icp") 