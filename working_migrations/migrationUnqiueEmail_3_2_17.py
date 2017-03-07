
def upgrade():

    ## Create Students constraints and indexes
    op.create_unique_constraint('uq_Students_Email', 'Students', ['Email'], schema='OurHouse')
    op.create_index('ix_Students_Email', 'Students', ['Email'], schema='OurHouse', unique=True)

    ## Create Landlords constraints and indexes
    op.create_unique_constraint('uq_Landlords_Email', 'Landlords', ['Email'], schema='OurHouse')
    op.create_index('ix_Landlords_Email', 'Landlords', ['Email'], schema='OurHouse', unique=True)