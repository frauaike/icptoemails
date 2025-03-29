"""Initial schema

Revision ID: 001
Revises: 
Create Date: 2024-03-28 18:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def create_enum_if_not_exists(name: str, values: list[str]) -> None:
    """Create an enum type if it doesn't exist."""
    conn = op.get_bind()
    result = conn.execute(text(f"SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = '{name}')"))
    exists = result.scalar()
    
    if not exists:
        values_str = ", ".join(f"'{v}'" for v in values)
        conn.execute(text(f"CREATE TYPE {name} AS ENUM ({values_str})"))


def upgrade() -> None:
    # Drop existing tables if they exist
    op.execute('DROP TABLE IF EXISTS audit_logs CASCADE')
    op.execute('DROP TABLE IF EXISTS subscriptions CASCADE')
    op.execute('DROP TABLE IF EXISTS email_analyses CASCADE')
    op.execute('DROP TABLE IF EXISTS icps CASCADE')
    op.execute('DROP TABLE IF EXISTS users CASCADE')

    # Drop existing enum types if they exist
    op.execute('DROP TYPE IF EXISTS actiontype CASCADE')
    op.execute('DROP TYPE IF EXISTS resourcetype CASCADE')
    op.execute('DROP TYPE IF EXISTS subscriptionplan CASCADE')
    op.execute('DROP TYPE IF EXISTS subscriptionstatus CASCADE')
    op.execute('DROP TYPE IF EXISTS accountstatus CASCADE')
    op.execute('DROP TYPE IF EXISTS userrole CASCADE')

    # Create enum types using raw SQL
    create_enum_if_not_exists('userrole', ['free', 'pro', 'admin'])
    create_enum_if_not_exists('accountstatus', ['active', 'inactive', 'suspended', 'deleted'])
    create_enum_if_not_exists('subscriptionstatus', ['active', 'past_due', 'canceled', 'trialing', 'unpaid'])
    create_enum_if_not_exists('subscriptionplan', ['free', 'pro'])
    create_enum_if_not_exists('actiontype', ['create', 'read', 'update', 'delete', 'login', 'logout', 'password_change', 'mfa_enable', 'mfa_disable', 'subscription_change', 'data_export', 'data_delete'])
    create_enum_if_not_exists('resourcetype', ['user', 'icp', 'email_analysis', 'subscription', 'system'])

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
        sa.Column('account_status', sa.String(), default='active'),
        sa.Column('role', sa.String(), default='free'),
        sa.Column('marketing_consent', sa.Boolean(), default=False),
        sa.Column('data_processing_consent', sa.Boolean(), default=False),
        sa.Column('consent_timestamp', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)

    # Add check constraints for enum columns
    op.execute("ALTER TABLE users ADD CONSTRAINT users_account_status_check CHECK (account_status IN ('active', 'inactive', 'suspended', 'deleted'))")
    op.execute("ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('free', 'pro', 'admin'))")

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
        sa.Column('plan', sa.String(), default='free'),
        sa.Column('status', sa.String(), default='active'),
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

    # Add check constraints for enum columns
    op.execute("ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_plan_check CHECK (plan IN ('free', 'pro'))")
    op.execute("ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_status_check CHECK (status IN ('active', 'past_due', 'canceled', 'trialing', 'unpaid'))")

    # Create audit_logs table
    op.create_table(
        'audit_logs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('action', sa.String(), nullable=False),
        sa.Column('resource_type', sa.String(), nullable=False),
        sa.Column('resource_id', sa.String(), nullable=True),
        sa.Column('ip_address', sa.String(), nullable=True),
        sa.Column('user_agent', sa.String(), nullable=True),
        sa.Column('additional_data', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('timestamp', sa.DateTime(), server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Add check constraints for enum columns
    op.execute("ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_action_check CHECK (action IN ('create', 'read', 'update', 'delete', 'login', 'logout', 'password_change', 'mfa_enable', 'mfa_disable', 'subscription_change', 'data_export', 'data_delete'))")
    op.execute("ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_resource_type_check CHECK (resource_type IN ('user', 'icp', 'email_analysis', 'subscription', 'system'))")


def downgrade() -> None:
    # Drop tables
    op.drop_table('audit_logs')
    op.drop_table('subscriptions')
    op.drop_table('email_analyses')
    op.drop_table('icps')
    op.drop_table('users')

    # Drop enum types
    op.execute('DROP TYPE IF EXISTS actiontype')
    op.execute('DROP TYPE IF EXISTS resourcetype')
    op.execute('DROP TYPE IF EXISTS subscriptionplan')
    op.execute('DROP TYPE IF EXISTS subscriptionstatus')
    op.execute('DROP TYPE IF EXISTS accountstatus')
    op.execute('DROP TYPE IF EXISTS userrole') 