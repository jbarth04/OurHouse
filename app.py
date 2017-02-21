from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")

def index():
    return render_template('index.html')

@app.route("/houses")
def houses():
	return render_template('houses.html')

if __name__ == "__main__":
    app.run()
