"""empty message

Revision ID: 98704b11ebd9
Revises: 6734e11c10be
Create Date: 2017-04-02 13:32:32.121108

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '98704b11ebd9'
down_revision = '6734e11c10be'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Developers',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('ProjectName', sa.String(length=50), nullable=False),
    sa.Column('Email', sa.String(length=62), nullable=False),
    sa.Column('CreatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.Column('UpdatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('Id'),
    sa.UniqueConstraint('Email'),
    schema='OurHouse'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Developers', schema='OurHouse')
    # ### end Alembic commands ###
