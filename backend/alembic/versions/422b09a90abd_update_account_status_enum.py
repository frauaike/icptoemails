"""update_account_status_enum

Revision ID: 422b09a90abd
Revises: f3b140dcf8f2
Create Date: 2025-03-29 16:41:23.464518

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '422b09a90abd'
down_revision: Union[str, None] = 'f3b140dcf8f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass 