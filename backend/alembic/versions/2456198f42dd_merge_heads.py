"""merge heads

Revision ID: 2456198f42dd
Revises: afc115a74c97, e34ebddce19c
Create Date: 2026-05-03 11:27:03.539703

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2456198f42dd'
down_revision: Union[str, Sequence[str], None] = ('afc115a74c97', 'e34ebddce19c')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
