"""Added Cascades

Revision ID: 9f8eca86f06e
Revises: 2bcd3188be35
Create Date: 2026-04-28 23:17:37.105119

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9f8eca86f06e'
down_revision: Union[str, Sequence[str], None] = '2bcd3188be35'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add ON DELETE CASCADE to foreign keys."""
    # tasks.tournament_id -> tournaments.id
    op.drop_constraint('tasks_tournament_id_fkey', 'tasks', type_='foreignkey')
    op.create_foreign_key(None, 'tasks', 'tournaments', ['tournament_id'], ['id'], ondelete='CASCADE')

    # tournament_participation.tournament_id -> tournaments.id
    op.drop_constraint('tournament_participation_tournament_id_fkey', 'tournament_participation', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_participation', 'tournaments', ['tournament_id'], ['id'], ondelete='CASCADE')

    # solutions.task_id -> tasks.id
    op.drop_constraint('solutions_task_id_fkey', 'solutions', type_='foreignkey')
    op.create_foreign_key(None, 'solutions', 'tasks', ['task_id'], ['id'], ondelete='CASCADE')

    # tournament_user_role.tournament_id -> tournaments.id
    op.drop_constraint('tournament_user_role_tournament_id_fkey', 'tournament_user_role', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_user_role', 'tournaments', ['tournament_id'], ['id'], ondelete='CASCADE')

    # tournament_user_role.tournament_participation_id -> tournament_participation.id
    op.drop_constraint('tournament_user_role_tournament_participation_id_fkey', 'tournament_user_role', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_user_role', 'tournament_participation', ['tournament_participation_id'], ['id'], ondelete='CASCADE')

    # tournament_user_role.user_id -> users.id
    op.drop_constraint('tournament_user_role_user_id_fkey', 'tournament_user_role', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_user_role', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    # marks.judge_id -> tournament_user_role.id
    op.drop_constraint('marks_judge_id_fkey', 'marks', type_='foreignkey')
    op.create_foreign_key(None, 'marks', 'tournament_user_role', ['judge_id'], ['id'], ondelete='CASCADE')

    # marks.solution_id -> solutions.id
    op.drop_constraint('marks_solution_id_fkey', 'marks', type_='foreignkey')
    op.create_foreign_key(None, 'marks', 'solutions', ['solution_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    """Remove ON DELETE CASCADE from foreign keys."""
    # marks
    op.drop_constraint('marks_solution_id_fkey', 'marks', type_='foreignkey')
    op.create_foreign_key(None, 'marks', 'solutions', ['solution_id'], ['id'])
    op.drop_constraint('marks_judge_id_fkey', 'marks', type_='foreignkey')
    op.create_foreign_key(None, 'marks', 'tournament_user_role', ['judge_id'], ['id'])

    # tournament_user_role
    op.drop_constraint('tournament_user_role_user_id_fkey', 'tournament_user_role', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_user_role', 'users', ['user_id'], ['id'])
    op.drop_constraint('tournament_user_role_tournament_participation_id_fkey', 'tournament_user_role', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_user_role', 'tournament_participation', ['tournament_participation_id'], ['id'])
    op.drop_constraint('tournament_user_role_tournament_id_fkey', 'tournament_user_role', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_user_role', 'tournaments', ['tournament_id'], ['id'])

    # solutions
    op.drop_constraint('solutions_task_id_fkey', 'solutions', type_='foreignkey')
    op.create_foreign_key(None, 'solutions', 'tasks', ['task_id'], ['id'])

    # tournament_participation
    op.drop_constraint('tournament_participation_tournament_id_fkey', 'tournament_participation', type_='foreignkey')
    op.create_foreign_key(None, 'tournament_participation', 'tournaments', ['tournament_id'], ['id'])

    # tasks
    op.drop_constraint('tasks_tournament_id_fkey', 'tasks', type_='foreignkey')
    op.create_foreign_key(None, 'tasks', 'tournaments', ['tournament_id'], ['id'])
