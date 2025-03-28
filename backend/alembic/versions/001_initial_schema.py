"""Initial schema

Revision ID: 001
Revises: 
Create Date: 2024-03-28 18:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create enum types
    userrole = postgresql.ENUM('free', 'pro', 'admin', name='userrole', create_type=True)
    accountstatus = postgresql.ENUM('active', 'inactive', 'suspended', 'deleted', name='accountstatus', create_type=True)
    subscriptionstatus = postgresql.ENUM('active', 'past_due', 'canceled', 'trialing', 'unpaid', name='subscriptionstatus', create_type=True)
    subscriptionplan = postgresql.ENUM('free', 'pro', name='subscriptionplan', create_type=True)
    actiontype = postgresql.ENUM('create', 'read', 'update', 'delete', 'login', 'logout', 'password_change', 'mfa_enable', 'mfa_disable', 'subscription_change', 'data_export', 'data_delete', name='actiontype', create_type=True)
    resourcetype = postgresql.ENUM('user', 'icp', 'email_analysis', 'subscription', 'system', name='resourcetype', create_type=True)

    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('full_name', sa.String(), nullable=True),
        sa.Column('company', sa.String(), nullable=True),
        sa.Column('job_title', sa.String(), nullable=True),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('mfa_enabled', sa.Boolean(), default=False),
        sa.Column('mfa_secret', sa.String(), nullable=True),
        sa.Column('failed_login_attempts', sa.Integer(), default=0),
        sa.Column('last_login', sa.DateTime(), nullable=True),
        sa.Column('account_status', postgresql.ENUM('active', 'inactive', 'suspended', 'deleted', name='accountstatus'), default='active'),
        sa.Column('role', postgresql.ENUM('free', 'pro', 'admin', name='userrole'), default='free'),
        sa.Column('marketing_consent', sa.Boolean(), default=False),
        sa.Column('data_processing_consent', sa.Boolean(), default=False),
        sa.Column('consent_timestamp', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)

    # Create icps table
    op.create_table(
        'icps',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('industry', sa.String(), nullable=True),
        sa.Column('company_size', sa.String(), nullable=True),
        sa.Column('persona_title', sa.String(), nullable=True),
        sa.Column('persona_responsibilities', sa.String(), nullable=True),
        sa.Column('pain_points', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('goals', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('key_metrics', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('budget_range', sa.String(), nullable=True),
        sa.Column('decision_making_process', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create email_analyses table
    op.create_table(
        'email_analyses',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('icp_id', sa.Integer(), nullable=False),
        sa.Column('original_email', sa.String(), nullable=False),
        sa.Column('suggested_rewrite', sa.String(), nullable=True),
        sa.Column('score', sa.Float(), nullable=True),
        sa.Column('feedback', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('strengths', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('weaknesses', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('improvement_suggestions', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('icp_alignment_score', sa.Float(), nullable=True),
        sa.Column('persona_match_score', sa.Float(), nullable=True),
        sa.Column('pain_point_addressal', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('analysis_timestamp', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('model_version', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['icp_id'], ['icps.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create subscriptions table
    op.create_table(
        'subscriptions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('stripe_customer_id', sa.String(), nullable=True),
        sa.Column('stripe_subscription_id', sa.String(), nullable=True),
        sa.Column('plan', postgresql.ENUM('free', 'pro', name='subscriptionplan'), default='free'),
        sa.Column('status', postgresql.ENUM('active', 'past_due', 'canceled', 'trialing', 'unpaid', name='subscriptionstatus'), default='active'),
        sa.Column('current_period_start', sa.DateTime(), nullable=True),
        sa.Column('current_period_end', sa.DateTime(), nullable=True),
        sa.Column('cancel_at_period_end', sa.Boolean(), default=False),
        sa.Column('monthly_analysis_count', sa.Integer(), default=0),
        sa.Column('last_billing_date', sa.DateTime(), nullable=True),
        sa.Column('trial_start', sa.DateTime(), nullable=True),
        sa.Column('trial_end', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_subscriptions_stripe_customer_id'), 'subscriptions', ['stripe_customer_id'], unique=True)
    op.create_index(op.f('ix_subscriptions_stripe_subscription_id'), 'subscriptions', ['stripe_subscription_id'], unique=True)

    # Create audit_logs table
    op.create_table(
        'audit_logs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('action', postgresql.ENUM('create', 'read', 'update', 'delete', 'login', 'logout', 'password_change', 'mfa_enable', 'mfa_disable', 'subscription_change', 'data_export', 'data_delete', name='actiontype'), nullable=False),
        sa.Column('resource_type', postgresql.ENUM('user', 'icp', 'email_analysis', 'subscription', 'system', name='resourcetype'), nullable=False),
        sa.Column('resource_id', sa.String(), nullable=True),
        sa.Column('ip_address', sa.String(), nullable=True),
        sa.Column('user_agent', sa.String(), nullable=True),
        sa.Column('additional_data', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('timestamp', sa.DateTime(), server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    # Drop tables
    op.drop_table('audit_logs')
    op.drop_table('subscriptions')
    op.drop_table('email_analyses')
    op.drop_table('icps')
    op.drop_table('users')

    # Drop enum types
    op.execute('DROP TYPE actiontype')
    op.execute('DROP TYPE resourcetype')
    op.execute('DROP TYPE subscriptionplan')
    op.execute('DROP TYPE subscriptionstatus')
    op.execute('DROP TYPE accountstatus')
    op.execute('DROP TYPE userrole') 