from datetime import datetime
from sqlalchemy import Boolean, Column, String, DateTime, Enum, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum

class UserRole(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    ADMIN = "admin"

class AccountStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    DELETED = "deleted"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    company = Column(String)
    job_title = Column(String)
    avatar_url = Column(String)
    
    # Authentication
    mfa_enabled = Column(Boolean, default=False)
    mfa_secret = Column(String)
    failed_login_attempts = Column(Integer, default=0)
    last_login = Column(DateTime)
    account_status = Column(Enum(AccountStatus), default=AccountStatus.ACTIVE)
    
    # Role and permissions
    role = Column(Enum(UserRole), default=UserRole.FREE)
    
    # GDPR and consent
    marketing_consent = Column(Boolean, default=False)
    data_processing_consent = Column(Boolean, default=False)
    consent_timestamp = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    icps = relationship("ICP", back_populates="user")
    email_analyses = relationship("EmailAnalysis", back_populates="user")
    subscription = relationship("Subscription", back_populates="user", uselist=False)
    audit_logs = relationship("AuditLog", back_populates="user") 