"""add is_favorite to icp

Revision ID: add_is_favorite_to_icp
Revises: 771943851c46
Create Date: 2024-03-30 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'add_is_favorite_to_icp'
down_revision: Union[str, None] = '771943851c46'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Add is_favorite column with default value False
    op.add_column('icps', sa.Column('is_favorite', sa.Boolean(), nullable=False, server_default='false'))
    
    # Create index for faster queries on is_favorite
    op.create_index('idx_icp_is_favorite', 'icps', ['is_favorite'])

def downgrade() -> None:
    # Drop the index first
    op.drop_index('idx_icp_is_favorite')
    
    # Drop the column
    op.drop_column('icps', 'is_favorite') 