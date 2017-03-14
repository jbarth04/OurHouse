"""empty message

Revision ID: fadadbc5b905
Revises: 
Create Date: 2017-03-02 14:46:37.518423

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fadadbc5b905'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():

    ####################### ALERT ALERT ALERT #######################
    
    ## You must change the definition of the "def upgrade():" function in your
    ## migration file, see START and END

    ############# COPY AND PASTE INTO MIGRATION FILE, START ##############

    # Create schema
    op.execute('CREATE SCHEMA "OurHouse"') 

    ## Create Landlords table
    op.create_table('Landlords',
    sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    sa.Column('FirstName', sa.String(length=50), nullable=False),
    sa.Column('LastName', sa.String(length=50), nullable=False),
    sa.Column('Email', sa.String(length=62), nullable=False),
    sa.Column('Phone', sa.String(length=10), nullable=False),
    sa.Column('IsActive', sa.Boolean(), nullable=False),
    sa.Column('CreatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.Column('UpdatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('Id'),
    schema='OurHouse'
    )

    ## Create Landlords constraints and indexes
    op.create_unique_constraint('uq_Landlords_Email', 'Landlords', ['Email'], schema='OurHouse')
    op.create_index('ix_Landlords_Email', 'Landlords', ['Email'], schema='OurHouse', unique=True)
    
    ## Create Students table
    op.create_table('Students',
    sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    sa.Column('FirstName', sa.String(length=50), nullable=False),
    sa.Column('LastName', sa.String(length=50), nullable=False),
    sa.Column('Email', sa.String(length=62), nullable=False),
    sa.Column('Phone', sa.String(length=10), nullable=False),
    sa.Column('IsActive', sa.Boolean(), nullable=False),
    sa.Column('CreatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.Column('UpdatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('Id'),
    schema='OurHouse'
    )

    ## Create Student constraints and indexes
    op.create_unique_constraint('uq_Students_Email', 'Students', ['Email'], schema='OurHouse')
    op.create_index('ix_Students_Email', 'Students', ['Email'], schema='OurHouse', unique=True)

    ## Create Houses table
    op.create_table('Houses',
    sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    sa.Column('LandlordId', sa.Integer(), nullable=False),
    sa.Column('Address1', sa.String(length=120), nullable=False),
    sa.Column('Address2', sa.String(length=120), nullable=True),
    sa.Column('City', sa.String(length=100), nullable=False),
    sa.Column('State', sa.String(length=2), nullable=False),
    sa.Column('Zipcode', sa.String(length=5), nullable=False),
    sa.Column('Rooms', sa.Integer(), nullable=False),
    sa.Column('ParkingSpots', sa.Integer(), nullable=False),
    sa.Column('MonthlyRent', sa.Integer(), nullable=False),
    sa.Column('UtilitiesIncluded', sa.Boolean(), nullable=False),
    sa.Column('Laundry', sa.Boolean(), nullable=False),
    sa.Column('Pets', sa.Boolean(), nullable=False),
    sa.Column('Latitude', sa.Numeric(), nullable=False),
    sa.Column('Longitude', sa.Numeric(), nullable=False),
    sa.Column('DistFromCC', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['LandlordId'], [u'OurHouse.Landlords.Id'], ),
    sa.PrimaryKeyConstraint('Id'),
    schema='OurHouse'
    )

    ## Create Houses constraints and indexes
    op.create_index(op.f('ix_OurHouse_Houses_LandlordId'), 'Houses', ['LandlordId'], unique=False, schema='OurHouse')

    op.create_unique_constraint('uq_Houses_Latitude_Longitude_Address2', 'Houses', ['Latitude', 'Longitude', 'Address2'], schema='OurHouse')
    op.create_index('ix_Houses_Latitude_Longitude_Address2', 'Houses', ['Latitude', 'Longitude', 'Address2'], unique=True, schema='OurHouse')

    ## Create Reviews table
    op.create_table('Reviews',
    sa.Column('Id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
    sa.Column('HouseId', sa.Integer(), nullable=False),
    sa.Column('StudentId', sa.Integer(), nullable=False),
    sa.Column('Stars', sa.String(), nullable=False),
    sa.Column('Comment', sa.String(length=2048), nullable=True),
    sa.ForeignKeyConstraint(['HouseId'], [u'OurHouse.Houses.Id'], ),
    sa.ForeignKeyConstraint(['StudentId'], [u'OurHouse.Students.Id'], ),
    sa.PrimaryKeyConstraint('Id'),
    schema='OurHouse'
    )

    ## Create Reviews constraints and indexes
    op.create_index(op.f('ix_OurHouse_Reviews_HouseId'), 'Reviews', ['HouseId'], unique=False, schema='OurHouse')
    op.create_index(op.f('ix_OurHouse_Reviews_StudentId'), 'Reviews', ['StudentId'], unique=False, schema='OurHouse')

    ############### COPY AND PASTE INTO MIGRATION FILE, END #################

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
