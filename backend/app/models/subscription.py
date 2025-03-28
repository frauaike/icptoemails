from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum

class SubscriptionStatus(str, enum.Enum):
    ACTIVE = "active"
    PAST_DUE = "past_due"
    CANCELED = "canceled"
    TRIALING = "trialing"
    UNPAID = "unpaid"

class SubscriptionPlan(str, enum.Enum):
    FREE = "free"
    PRO = "pro"

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    
    # Subscription Details
    stripe_customer_id = Column(String, unique=True)
    stripe_subscription_id = Column(String, unique=True)
    plan = Column(Enum(SubscriptionPlan), default=SubscriptionPlan.FREE)
    status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.ACTIVE)
    
    # Billing Information
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)
    cancel_at_period_end = Column(Boolean, default=False)
    
    # Usage Tracking
    monthly_analysis_count = Column(Integer, default=0)
    last_billing_date = Column(DateTime)
    
    # Trial Information
    trial_start = Column(DateTime)
    trial_end = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="subscription") 