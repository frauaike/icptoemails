from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum

class ActionType(str, enum.Enum):
    CREATE = "create"
    READ = "read"
    UPDATE = "update"
    DELETE = "delete"
    LOGIN = "login"
    LOGOUT = "logout"
    PASSWORD_CHANGE = "password_change"
    MFA_ENABLE = "mfa_enable"
    MFA_DISABLE = "mfa_disable"
    SUBSCRIPTION_CHANGE = "subscription_change"
    DATA_EXPORT = "data_export"
    DATA_DELETE = "data_delete"

class ResourceType(str, enum.Enum):
    USER = "user"
    ICP = "icp"
    EMAIL_ANALYSIS = "email_analysis"
    SUBSCRIPTION = "subscription"
    SYSTEM = "system"

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Action Details
    action = Column(Enum(ActionType), nullable=False)
    resource_type = Column(Enum(ResourceType), nullable=False)
    resource_id = Column(String)  # ID of the affected resource
    
    # Context Information
    ip_address = Column(String)
    user_agent = Column(String)
    additional_data = Column(JSON)  # Store any additional context as JSON
    
    # Timestamps
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="audit_logs") 