'switch the financial policies on and off in periods\n\nRevision ID: 20261017_000062\nRevises: 20261017_000061\n\nReplaces the single ``company_payroll_settings.financial_policy_effective_date``\nwith ``financial_policy_periods``: HR switches the policies on and off from the\ndashboard and every on-stretch is stored as its own [starts_on, ends_on] period.\nA company that already had an effective date gets one open period from that\ndate, so its accounting is CHANGE_ME.\n'

from typing import Sequence, Union
from uuid import uuid4

import sqlalchemy as sa
from alembic import op

revision: str = "20261017_000062"
down_revision: Union[str, None] = "20261017_000061"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "financial_policy_periods",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("company_id", sa.Uuid(), nullable=False),
        sa.Column("starts_on", sa.Date(), nullable=False),
        sa.Column("ends_on", sa.Date(), nullable=True),
        sa.Column("started_by_admin_user_id", sa.Uuid(), nullable=True),
        sa.Column("ended_by_admin_user_id", sa.Uuid(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["company_id"], ["companies.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["started_by_admin_user_id"], ["admin_users.id"], ondelete="SET NULL"
        ),
        sa.ForeignKeyConstraint(["ended_by_admin_user_id"], ["admin_users.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_financial_policy_periods_company_id", "financial_policy_periods", ["company_id"]
    )

    bind = op.get_bind()
    rows = bind.execute(
        sa.text(
            "SELECT company_id, financial_policy_effective_date FROM company_payroll_settings "
            "WHERE financial_policy_effective_date IS NOT NULL"
        )
    ).all()
    for company_id, effective in rows:
        bind.execute(
            sa.text(
                "INSERT INTO financial_policy_periods (id, company_id, starts_on) "
                "VALUES (:id, :company_id, :starts_on)"
            ),
            {"id": uuid4(), "company_id": company_id, "starts_on": effective},
        )
    op.drop_column("company_payroll_settings", "financial_policy_effective_date")


def downgrade() -> None:
    op.add_column(
        "company_payroll_settings",
        sa.Column("financial_policy_effective_date", sa.Date(), nullable=True),
    )
    # Only a still-open period can be expressed as a single effective date.
    op.execute(
        "UPDATE company_payroll_settings SET financial_policy_effective_date = ("
        "SELECT MAX(p.starts_on) FROM financial_policy_periods p "
        "WHERE p.company_id = company_payroll_settings.company_id AND p.ends_on IS NULL)"
    )
    op.drop_index("ix_financial_policy_periods_company_id", table_name="financial_policy_periods")
    op.drop_table("financial_policy_periods")
