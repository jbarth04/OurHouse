# Comp120 Web Engineering
# This uses Alembic to manage database migrations to update database schema
# Code taken from: 
# https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/

import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app, db


app.config.from_object(os.environ['APP_SETTINGS'])

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
