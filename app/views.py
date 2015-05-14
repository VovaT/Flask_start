__author__ = 'vth'
from app import app
from flask import render_template
from scalix.ObjectList import *




@app.route('/')
@app.route('/index')
def index():
    #return "Hello, World!"
    doubles = list(Test_m(2 * n) for n in range(50))
    return render_template('main.html', my_arr = doubles)
    #return render_template('object_list.html')