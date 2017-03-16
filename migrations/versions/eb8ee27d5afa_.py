"""empty message

Revision ID: eb8ee27d5afa
Revises: fadadbc5b905
Create Date: 2017-03-02 15:38:49.666854

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eb8ee27d5afa'
down_revision = 'fadadbc5b905'
branch_labels = None
depends_on = None


def upgrade():
    pass

    # create schema
    # op.execute('CREATE SCHEMA "OurHouse"') 

    # ### commands auto generated by Alembic - please adjust! ###
    # op.create_table('Landlords',
    # sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    # sa.Column('FirstName', sa.String(length=50), nullable=False),
    # sa.Column('LastName', sa.String(length=50), nullable=False),
    # sa.Column('Email', sa.String(length=62), nullable=False),
    # sa.Column('Phone', sa.String(length=10), nullable=False),
    # sa.Column('IsActive', sa.Boolean(), nullable=False),
    # sa.Column('CreatedAt', sa.DateTime(timezone=True), nullable=False),
    # sa.Column('UpdatedAt', sa.DateTime(timezone=True), nullable=False),
    # sa.PrimaryKeyConstraint('Id'),
    # schema='OurHouse'
    # )
    # op.create_table('Students',
    # sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    # sa.Column('FirstName', sa.String(length=50), nullable=False),
    # sa.Column('LastName', sa.String(length=50), nullable=False),
    # sa.Column('Email', sa.String(length=62), nullable=False, unique=True),
    # sa.Column('Phone', sa.String(length=10), nullable=False),
    # sa.Column('IsActive', sa.Boolean(), nullable=False),
    # sa.Column('CreatedAt', sa.DateTime(timezone=True), nullable=False),
    # sa.Column('UpdatedAt', sa.DateTime(timezone=True), nullable=False),
    # sa.PrimaryKeyConstraint('Id'),
    # schema='OurHouse'
    # )
    # op.create_table('Houses',
    # sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    # sa.Column('LandlordId', sa.Integer(), nullable=False),
    # sa.Column('Address1', sa.String(length=120), nullable=False),
    # sa.Column('Address2', sa.String(length=120), nullable=True),
    # sa.Column('City', sa.String(length=100), nullable=False),
    # sa.Column('State', sa.String(length=2), nullable=False),
    # sa.Column('Zipcode', sa.String(length=5), nullable=False),
    # sa.Column('Rooms', sa.Integer(), nullable=False),
    # sa.Column('ParkingSpots', sa.Integer(), nullable=False),
    # sa.Column('MonthlyRent', sa.Integer(), nullable=False),
    # sa.Column('UtilitiesIncluded', sa.Boolean(), nullable=False),
    # sa.Column('Laundry', sa.Boolean(), nullable=False),
    # sa.Column('Pets', sa.Boolean(), nullable=False),
    # sa.Column('Latitude', sa.Numeric(), nullable=False),
    # sa.Column('Longitude', sa.Numeric(), nullable=False),
    # sa.Column('DistFromCC', sa.Float(), nullable=False),
    # sa.ForeignKeyConstraint(['LandlordId'], [u'OurHouse.Landlords.Id'], ),
    # sa.PrimaryKeyConstraint('Id'),
    # schema='OurHouse'
    # )
    # op.create_index(op.f('ix_OurHouse_Houses_LandlordId'), 'Houses', ['LandlordId'], unique=False, schema='OurHouse')
    # op.create_table('Reviews',
    # sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    # sa.Column('HouseId', sa.Integer(), nullable=False),
    # sa.Column('StudentId', sa.Integer(), nullable=False),
    # sa.Column('Stars', sa.String(), nullable=False),
    # sa.Column('Comment', sa.String(length=2048), nullable=True),
    # sa.ForeignKeyConstraint(['HouseId'], [u'OurHouse.Houses.Id'], ),
    # sa.ForeignKeyConstraint(['StudentId'], [u'OurHouse.Students.Id'], ),
    # sa.PrimaryKeyConstraint('Id'),
    # schema='OurHouse'
    # )
    # op.create_index(op.f('ix_OurHouse_Reviews_HouseId'), 'Reviews', ['HouseId'], unique=False, schema='OurHouse')
    # op.create_index(op.f('ix_OurHouse_Reviews_StudentId'), 'Reviews', ['StudentId'], unique=False, schema='OurHouse')
    # # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_OurHouse_Reviews_StudentId'), table_name='Reviews', schema='OurHouse')
    op.drop_index(op.f('ix_OurHouse_Reviews_HouseId'), table_name='Reviews', schema='OurHouse')
    op.drop_table('Reviews', schema='OurHouse')
    op.drop_index(op.f('ix_OurHouse_Houses_LandlordId'), table_name='Houses', schema='OurHouse')
    op.drop_table('Houses', schema='OurHouse')
    op.drop_table('Students', schema='OurHouse')
    op.drop_table('Landlords', schema='OurHouse')
    # ### end Alembic commands ###