# comp120-s2017-team2

### Getting Started
Note: This project is done using Python 2.7.13.

Note2: migration logic taken from - 
    https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/

1. Clone the repository.

2. We suggest that you set up a virtual environment. To do so, install virtualenv by running `pip install virtualenv` in the root directory of the application. Once virtualenv has been successfully installed, run `virtualenv venv`. 

3. Ensure that Python 2.7.13 is the version of Python within the virtual environment. 

4. To start up the virtual environment, run `. venv/bin/activate`.

5. To set up the environment, begin the virtual environment, locate the file requirements.txt, and run `pip install -r requirements.txt`.

6. In your project folder, run the following command (this is a database config variable)

    $ export APP_SETTINGS="config.DevelopmentConfig"

7. You must have PostgreSQL locally on your system (if not, download it, create a user, and create a database)

8. Once you have PostgreSQL setup, run the following commanding (changing anything in caps with your info)

    $ export DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost/YOUR_DB"

    ^ this environment variable is also used for the database configuration

9. Initialize Alembic in order to run migrations:

    $ python manage.py db init
      Creating directory /flask-by-example/migrations ... done
      Creating directory /flask-by-example/migrations/versions ... done
      Generating /flask-by-example/migrations/alembic.ini ... done
      Generating /flask-by-example/migrations/env.py ... done
      Generating /flask-by-example/migrations/README ... done
      Generating /flask-by-example/migrations/script.py.mako ... done
      Please edit configuration/connection/logging settings in
      '/flask-by-example/migrations/alembic.ini' before proceeding.

10. First migration by running the migrate command:

    $ python manage.py db migrate
      INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
      INFO  [alembic.runtime.migration] Will assume transactional DDL.
      INFO  [alembic.autogenerate.compare] Detected added table 'results'
        Generating /flask-by-example/migrations/versions/63dba2060f71_.py
        ... done

11. ALERT - CRUCIAL MIGRATION STEP: go into migrations/versions/ folder and open the file with the migration.  Open it in your favorite editor.  Now, also open the "working_migration.py" file located in the "working_migrations" folder (ignore the other migrations.)  Copy and paste the code defined in "def upgrade():" to your migration file (you can't miss the comments in "working_migration.py" telling you what to copy and paste)

12. Apply the upgrades to the database using the db upgrade command:

$ python manage.py db upgrade
  INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
  INFO  [alembic.runtime.migration] Will assume transactional DDL.
  INFO  [alembic.runtime.migration] Running upgrade  -> 63dba2060f71, empty message

13. Open PostgreSQL and look for schema 'OurHouse', your tables should be there

14. To start the server locally, locate the app.py file in the root directory and run `python app.py`. This will deploy a local version of the application to localhost:5000. 

### Packages, APIs, Dependencies
alembic==0.9.1
appdirs==1.4.0
click==6.7
Flask==0.12
Flask-Migrate==2.0.3
Flask-Script==2.0.5
flask-sqlacodegen==1.1.6.1
Flask-SQLAlchemy==2.1
inflect==0.2.5
itsdangerous==0.24
Jinja2==2.9.5
Mako==1.0.6
MarkupSafe==0.23
packaging==16.8
psycopg2==2.6.2
pyparsing==2.1.10
python-editor==1.0.3
six==1.10.0
sqlacodegen==1.1.6
SQLAlchemy==1.1.5
Werkzeug==0.11.15

Google Maps API
React 0.13.2
JSX 0.13.2
Python 2.7.13
postgres (PostgreSQL) 9.6.2