import json
from dotenv import dotenv_values
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_cors import CORS
import service

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/')
def index():
    pass

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    print(data['sequence'])
    return json.dumps(service.analyze(data['sequence']))

if __name__ == '__main__':
    env_variables = dotenv_values('.env')
    app.run(debug=True)
