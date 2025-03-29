"""merge multiple heads

Revision ID: 1d0bf2439660
Revises: 756888413e7d, add_is_favorite_to_icp
Create Date: 2025-03-29 21:07:01.481637

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1d0bf2439660'
down_revision: Union[str, None] = ('756888413e7d', 'add_is_favorite_to_icp')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass 