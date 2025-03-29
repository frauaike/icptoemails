"""update_enum_values_to_uppercase

Revision ID: d3cda5feed23
Revises: 422b09a90abd
Create Date: 2025-03-29 16:43:10.861768

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd3cda5feed23'
down_revision: Union[str, None] = '422b09a90abd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add new enum values for accountstatus
    op.execute("ALTER TYPE accountstatus ADD VALUE IF NOT EXISTS 'ACTIVE'")
    op.execute("ALTER TYPE accountstatus ADD VALUE IF NOT EXISTS 'INACTIVE'")
    op.execute("ALTER TYPE accountstatus ADD VALUE IF NOT EXISTS 'SUSPENDED'")
    op.execute("ALTER TYPE accountstatus ADD VALUE IF NOT EXISTS 'DELETED'")

    # Add new enum values for userrole
    op.execute("ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'FREE'")
    op.execute("ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'PRO'")
    op.execute("ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'ADMIN'")
    op.execute("ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'USER'")
    op.execute("ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'MANAGER'")


def downgrade() -> None:
    # PostgreSQL doesn't support removing enum values
    pass 