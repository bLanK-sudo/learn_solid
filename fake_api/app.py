from flask import Flask, request, make_response, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return {
        "loggedIn":True
    }

@app.route("/users")
def user():
    return [
        {
            "name": "Manish",
            "year": "Diploma",
            "pwd": "abc",
            "subjects": [["Machine Learning Techniques", "mlt"], ["Machine Learning Foundations", "mlf"], ["Modern Application Development 2", "mad2"]],
            "tests_taken": None,
        },
        {
            "name": "Abul",
            "year": "Degree",
            "pwd": "cba",
            "subjects": None,
            "tests_taken": None,
        }
    ]


@app.route("/mock")
def subjects():
    return ["English", "Machine Learning Practice", "Mathematics 2", "Computational Thinking", "Introduction to python programming"]

@app.route("/qns")
def qn():
    return {"65":{"q" : "What is your Name?", "type":"mcq"}, "66":{"q":"What is your guardians Name?", "type":"msq"}}

@app.route("/ans")
def ans():
    return [{"65":[{"id":"1", "a":"Manish"},{"id":"2", "a":"Suresh"},{"id":"3", "a":"World"},{"id":"4", "a":"Earth"}],"66":[{"id":"5", "a":"Sujatha"},{"id":"6", "a":"Suresh"},{"id":"7", "a":"Sumathi"},{"id":"8", "a":"Baby"}]}]

@app.route("/submit", methods=["POST"])
def submit():
    print(request.form)
    print(request.form.getlist('66'))
    return redirect('http://localhost:3000/mock')

app.run(port=5000, debug=True)