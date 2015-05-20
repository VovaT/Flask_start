__author__ = 'vth'

from app import app
from flask import render_template
from flask import request
from scalix.ScalixActions import *


'''
@app.route('/')
@app.route('/index')
def index():
    #return "Hello, World!"
    doubles = list(Test_m(2 * n) for n in range(10))
    return render_template('main.html', my_arr = doubles)
    #return render_template('object_list.html')
'''

sxac = ScalixActions()
sxjs = ScalixJson()

@app.route('/object/', methods=['GET'])
def get_object():
    data = request.args
    status, JSONdata = sxjs.get(data['server_url'] + '/object_all_attrs/%s' % data['id'])
    # print(status)
    # print(JSONdata)
    # print(json.dumps(JSONdata))
    if status == 200:
        return json.dumps(JSONdata)
    else:
        return json.dumps(dict())

@app.route('/')
@app.route('/index')
def index():
    # return "Hello, World!"
    my_dd = [
        dict(name='test1___________', submenu=[
            dict(name='w1', action='test_w1'),
            dict(name='w2', action='test_w2'),
            dict(name='w3', action='test_w3', submenu=[
                dict(name='s1'),
                dict(name='s2')
            ]),
            dict(name='w4')
        ]),
        dict(name='test2'),
        dict(name='test3', submenu=[
            dict(name='aa1'),
            dict(name='aa2'),
            dict(name='aa3', submenu=[
                dict(name='xx1'),
                dict(name='xx2', action='test_xx2'),
                dict(name='xx3', submenu=[
                    dict(name='zz1'),
                    dict(name='zz2______________________________________________________________________')
                ]),
                dict(name='xx4', submenu=[
                    dict(name='zz4'),
                    dict(name='zz5______________________________________________')
                ]),
            ])
        ]),
    ]

    return render_template('main.html', my_arr=sxac.get_user_list())
    # return render_template('object_list.html')
