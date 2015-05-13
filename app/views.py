__author__ = 'vth'
from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    #return "Hello, World!"
    return render_template('main.html')
    #return render_template('object_list.html')