
def upgrade():

    # Create unique constraint and a search index on Houses
    # Unique constraint is a combination of Latitude, Longitude, and Address2 (e.g. Apartment, Unit, etc.)

    op.create_unique_constraint('uq_Houses_Latitude_Longitude_Address2', 'Houses', ['Latitude', 'Longitude', 'Address2'], schema='OurHouse')
    op.create_index('ix_Houses_Latitude_Longitude_Address2', 'Houses', ['Latitude', 'Longitude', 'Address2'], unique=True, schema='OurHouse')