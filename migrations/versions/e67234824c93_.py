"""empty message

Revision ID: e67234824c93
Revises: 71d653be103c
Create Date: 2017-04-06 17:29:45.906929

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e67234824c93'
down_revision = '71d653be103c'
branch_labels = None
depends_on = None


def upgrade():
    op.execute('UPDATE "OurHouse"."Houses" SET "LeaseTerm" = 0 WHERE "LeaseTerm" IS NULL')
    op.execute('UPDATE "OurHouse"."Houses" SET "DateAvailable" = now() WHERE "DateAvailable" IS NULL')
    # Step 1: add server defaults to LeaseTerm and DateAvailable columns to 'Houses' table

    op.execute('UPDATE "OurHouse"."Houses" SET "LeaseTerm" = 0 WHERE "LeaseTerm" IS NULL')

    op.execute('UPDATE "OurHouse"."Houses" SET "DateAvailable" = now() WHERE "DateAvailable" IS NULL')

    op.alter_column('Houses', 'LeaseTerm',
                     server_default="0", nullable=False, schema='OurHouse')

    op.alter_column('Houses', 'DateAvailable',
                     server_default=sa.func.current_timestamp(), nullable=False, schema='OurHouse')

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_OurHouse_Reviews_StudentId'), table_name='Reviews', schema='OurHouse')
    op.drop_index(op.f('ix_OurHouse_Reviews_HouseId'), table_name='Reviews', schema='OurHouse')
    op.drop_table('Reviews', schema='OurHouse')
    op.drop_index(op.f('ix_OurHouse_Houses_LandlordId'), table_name='Houses', schema='OurHouse')
    op.drop_index('ix_Houses_Latitude_Longitude_Address1_Address2', table_name='Houses', schema='OurHouse')
    op.drop_table('Houses', schema='OurHouse')
    op.drop_index('ix_Students_Email', table_name='Students', schema='OurHouse')
    op.drop_table('Students', schema='OurHouse')
    op.drop_index('ix_Landlords_Email', table_name='Landlords', schema='OurHouse')
    op.drop_table('Landlords', schema='OurHouse')
    op.drop_index('ix_Developers_Key', table_name='Developers', schema='OurHouse')
    op.drop_table('Developers', schema='OurHouse')
    # ### end Alembic commands ###
