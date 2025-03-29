"""fix_icp_relationships

Revision ID: 756888413e7d
Revises: d3cda5feed23
Create Date: 2024-03-29 17:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '756888413e7d'
down_revision: Union[str, None] = 'd3cda5feed23'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop existing foreign key constraints if they exist
    try:
        op.drop_constraint('icp_responses_icp_id_fkey', 'icp_responses', type_='foreignkey')
    except:
        pass
    try:
        op.drop_constraint('icp_responses_user_id_fkey', 'icp_responses', type_='foreignkey')
    except:
        pass

    # Create foreign key constraints with CASCADE delete
    op.create_foreign_key('icp_responses_icp_id_fkey', 'icp_responses', 'icps', ['icp_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('icp_responses_user_id_fkey', 'icp_responses', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    # Create icp_responses table
    op.create_table(
        'icp_responses',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('icp_id', sa.Integer(), nullable=False),
        sa.Column('questionnaire_version', sa.String(), nullable=False),
        sa.Column('responses', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('status', sa.String(), nullable=False, server_default='draft'),
        sa.Column('score', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['icp_id'], ['icps.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    # Create indexes
    op.create_index('idx_icp_response_user_id', 'icp_responses', ['user_id'])
    op.create_index('idx_icp_response_status', 'icp_responses', ['status'])
    op.create_index('idx_icp_response_version', 'icp_responses', ['questionnaire_version'])


def downgrade() -> None:
    # Drop indexes
    op.drop_index('idx_icp_response_version', table_name='icp_responses')
    op.drop_index('idx_icp_response_status', table_name='icp_responses')
    op.drop_index('idx_icp_response_user_id', table_name='icp_responses')
    
    # Drop table
    op.drop_table('icp_responses')

    # Drop CASCADE foreign key constraints
    op.drop_constraint('icp_responses_icp_id_fkey', 'icp_responses', type_='foreignkey')
    op.drop_constraint('icp_responses_user_id_fkey', 'icp_responses', type_='foreignkey')

    # Recreate original foreign key constraints without CASCADE
    op.create_foreign_key('icp_responses_icp_id_fkey', 'icp_responses', 'icps', ['icp_id'], ['id'])
    op.create_foreign_key('icp_responses_user_id_fkey', 'icp_responses', 'users', ['user_id'], ['id']) 