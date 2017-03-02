from flask import Flask, render_template

# from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app.config.from_pyfile('config.py')
# db = SQLAlchemy(app)

@app.route("/")

def index():
    return render_template('index.html')

@app.route("/houses")
def houses():
	return render_template('houses.html')

@app.route("/newhome")
def newhome():
	return render_template('newhome.html')

if __name__ == "__main__":
    app.run()
