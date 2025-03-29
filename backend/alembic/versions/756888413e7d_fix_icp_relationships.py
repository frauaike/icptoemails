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
    # Create indexes if they don't exist
    op.execute('DROP INDEX IF EXISTS idx_icp_response_user_id')
    op.execute('DROP INDEX IF EXISTS idx_icp_response_status')
    op.execute('DROP INDEX IF EXISTS idx_icp_response_version')
    
    op.create_index('idx_icp_response_user_id', 'icp_responses', ['user_id'])
    op.create_index('idx_icp_response_status', 'icp_responses', ['status'])
    op.create_index('idx_icp_response_version', 'icp_responses', ['questionnaire_version'])

    # Drop existing foreign key constraints if they exist
    op.execute('ALTER TABLE IF EXISTS icp_responses DROP CONSTRAINT IF EXISTS icp_responses_icp_id_fkey')
    op.execute('ALTER TABLE IF EXISTS icp_responses DROP CONSTRAINT IF EXISTS icp_responses_user_id_fkey')

    # Add foreign key constraints with CASCADE delete
    op.create_foreign_key('icp_responses_icp_id_fkey', 'icp_responses', 'icps', ['icp_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('icp_responses_user_id_fkey', 'icp_responses', 'users', ['user_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    # Drop indexes
    op.drop_index('idx_icp_response_version', table_name='icp_responses')
    op.drop_index('idx_icp_response_status', table_name='icp_responses')
    op.drop_index('idx_icp_response_user_id', table_name='icp_responses')
    
    # Drop CASCADE foreign key constraints
    op.drop_constraint('icp_responses_icp_id_fkey', 'icp_responses', type_='foreignkey')
    op.drop_constraint('icp_responses_user_id_fkey', 'icp_responses', type_='foreignkey') 