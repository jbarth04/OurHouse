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

9. You should see a "migrations" file in your repository, which has scripts to create the database in PostgreSQL according your YOUR_DB variable specified in step 8.  Run the following command to initialize your database.

    $ python manage.py db upgrade

      INFO  [alembic.runtime.migration] Context impl PostgresqlImpl. <br />
      INFO  [alembic.runtime.migration] Will assume transactional DDL. <br />
      INFO  [alembic.runtime.migration] Running upgrade  -> 63dba2060f71, empty message

10. Open PostgreSQL and look for schema 'OurHouse', your tables should be there

11. To start the server locally, locate the app.py file in the root directory and run `python app.py`. This will deploy a local version of the application to localhost:5000. 

### Packages, APIs, Dependencies
alembic==0.9.1
appdirs==1.4.0
click==6.7
Flask==0.12
Flask-Migrate==2.0.3
Flask-Script==2.0.5
flask-sqlacodegen==1.1.6.1
Flask-SQLAlchemy==2.1
gunicorn==19.7.0
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