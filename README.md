# comp120-s2017-team2

### Getting Started
Note: This project is done using Python 2.7.13.

Note2: This project followed the practices outlined in the following tutorial - 
    https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/

1. Clone the repository.

2. We suggest that you set up a virtual environment. To do so, install virtualenv by running `pip install virtualenv` in the root directory of the application. Once virtualenv has been successfully installed, run `virtualenv venv`.

3. Ensure that Python 2.7.13 is the version of Python within the virtual environment. 

4. To start up the virtual environment, run `. venv/bin/activate`.  You will need to have your virtual environment running for the entirety of configuring and running this application.  If you see a little (venv) icon next to your user in your terminal, then your virtual environment is running, example:

    (venv) Foo-MacBook-Pro-5:MyFolder Foo$

5a. In order to install one of the dependencies (pylibmc) to set up caching, you must have libmemached installed.  Run the following command in your terminal.  For troubleshooting and more information, see SettingUpMemcached.txt

    $ brew install libmemcached

5b. To install the necessary dependencies, while your venv is running, locate the file requirements.txt, and run `pip install -r requirements.txt`.

6a. In your project folder, run the following command (see config.py to view different classes of configuration)

    $ export APP_SETTINGS="config.DevelopmentConfig"

6b. Even though you are using the DevelopmentConfig class, which has a SESSIONS_KEY set, since ProductionConfig and StagingConfig use an environment variable, Python raises an error if a variable is not set, even if you don't actually use it.  Thus, export a dummy SESSIONS_KEY: 

    $ export SESSIONS_KEY=""

7. You must have PostgreSQL locally on your system (if not, download it, create a user, and create a database)

8a. Once you have PostgreSQL setup, run the following command to set up the environment variable is used for the database configuration. Change anything in caps with your info:

    $ export DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost/YOUR_DB"

    If your database doesn't require you to create a password, then simply execute:

    $ export DATABASE_URL="postgresql://YOUR_USERNAME@localhost/YOUR_DB"

8b. To make sure that you have these environment variables set up properly, run 

    $ printenv

    in your terminal.  Note that every time you close your terminal, you will have you export APP_SETTINGS and DATABASE_URL (steps 6 through 8b)

9. You should see a "migrations" file in your repository, which has scripts to create the database in PostgreSQL according your YOUR_DB variable specified in step 8a.  Run the following command to initialize your database.

    $ python manage.py db upgrade

      INFO  [alembic.runtime.migration] Context impl PostgresqlImpl. <br />
      INFO  [alembic.runtime.migration] Will assume transactional DDL. <br />
      INFO  [alembic.runtime.migration] Running upgrade  -> 63dba2060f71, empty message

10. Open PostgreSQL and look for schema 'OurHouse', your tables should be there

11a. If you intend on exploiting upload photos functionality, then you will need to create an Amazon Web Services (AWS) S3 bucket and add export S3_ACCESS_KEY and S3_SECRET_KEY to your environment, and you need to change STORE_PROVIDER, STORE_DOMAIN, STORE_S3_REGION, and STORE_S3_BUCKET with your own credentials:

    $ export S3_ACCESS_KEY="your_access_key_here" (e.g. "ABCDEFG12345")

    $ export S3_SECRET_KEY="your_access_key_here" (e.g. "ABCDEFG12345")

    See the following link for more information on accessing these keys:

    https://www.cloudberrylab.com/blog/how-to-find-your-aws-access-key-id-and-secret-access-key-and-register-with-cloudberry-s3-explorer/

11b. If you don't intend uploading photos, then simply export dummy environment variables:

    $ export S3_ACCESS_KEY=""

    $ export S3_SECRET_KEY=""

12a. If you intend on using Amazon Web Services Content Delivery Network, you must go to AWS and create a CloudFront distribution, and export CDN_DOMAIN to your environment:

    $ export CDN_DOMAIN="abcde12345.cloudfront.net"

    $ export IS_CDN_ENABLED="True"

    See the following link for more information on creating an AWS CDN:

    https://devcenter.heroku.com/articles/using-amazon-cloudfront-cdn

12b. If you don't intend on using a CDN, then simply export dummy a environment variable:

    $ export CDN_DOMAIN=""

    $ export IS_CDN_ENABLED="False"

13a. If you intend on deploying to heroku and setting up Memcache, you must configure a MemCachier add-on to your application, and export the following variables.  Note, Memcache is still configured to work locally:

    $ export MEMCACHIER_SERVERS="mc3.dev.ec2.memcachier.com:11211"
    $ export MEMCACHIER_USERNAME="abcde12345"
    $ export MEMCACHIER_PASSWORD="abcde12345abcde12345"

13b. If you don't intend on deploying to heroku and setting up Memcache, then export dummy variables.  Note, Memcache is still configured to work locally:

    $ export MEMCACHIER_SERVERS=""
    $ export MEMCACHIER_USERNAME=""
    $ export MEMCACHIER_PASSWORD=""

14. In order to allow users to contact landlords, you'll need to export a variable containing your email login information:

    $ export EMAIL_ACCOUNT="your_email@you.com"
    $ export EMAIL_PASSWORD="yourpassword"

15. To start the server locally, you will need 3 tabs open on your terminal, one for Memcache, one for Postgres, and one to actually run your application.

16. In your first tab, activate Memcache by running:

    $ memcached -d -m memory -l 127.0.0.1

17. In your second tab, active Postgres by running:

    $ postgres -D /usr/local/var/postgres

18. In your third tab, locate the app.py file in the root directory and run `python app.py`. This will deploy a local version of the application to localhost:5000. 

### Packages, APIs, Dependencies
alembic==0.9.1 <br />
appdirs==1.4.0 <br />
boto==2.46.1 <br />
click==6.7 <br />
Flask==0.12 <br />
Flask-CDN==1.5.3 <br />
Flask-Compress==1.4.0 <br />
Flask-Mail==0.9.1 <br />
Flask-Migrate==2.0.3 <br />
Flask-Script==2.0.5 <br />
flask-sqlacodegen==1.1.6.1 <br />
Flask-SQLAlchemy==2.1 <br />
Flask-Store==0.0.4.4 <br />
gunicorn==19.7.0 <br />
inflect==0.2.5 <br />
itsdangerous==0.24 <br />
Jinja2==2.9.5 <br />
Mako==1.0.6 <br />
MarkupSafe==0.23 <br />
packaging==16.8 <br />
psycopg2==2.6.2 <br />
pyparsing==2.1.10 <br />
pylibmc==1.5.2 <br />
python-editor==1.0.3 <br />
python-firebase==1.2 <br />
requests==2.13.0 <br />
six==1.10.0 <br />
sqlacodegen==1.1.6 <br />
SQLAlchemy==1.1.5 <br />
Werkzeug==0.11.15 <br />

Google Maps API <br />
React 0.13.2 <br />
JSX 0.13.2 <br />
Python 2.7.13 <br />
postgres (PostgreSQL) 9.6.2 <br />

############# Unit Tests ###############

If you're interested in running unit tests on our code, please see OurHouseTesting.py and read the following instructions (these instructions assume you've already installed and setup postgres):

0. Make sure your virtual environment is activated and you've followed steps 1-5 and step 7 in the README instructions above

1. In postgres, create a new database called 'OurHouseUnitTest'

2. Using the postgres command line or on your favorite postgres GUI, execute the following query in your OurHouseUnitTest database:

   CREATE SCHEMA "OurHouse"

3. You must run the following commands in your terminal in order to have access to these environment variables, change anything in caps with your info:

    $ export APP_SETTINGS="config.DevelopmentConfig"

    $ export DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost/OurHouseUnitTest"

4. In your terminal, run:

    $ python OurHouseTesting.py
