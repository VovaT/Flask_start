
from app import app
from flask import render_template
from flask import session
from flask import request
from scalix.ScalixActions import *
from flask import redirect
from flask import url_for

from APIs import *
from testsAPI import *

from pprint import pprint
app.config.update(dict(SECRET_KEY='development key adsfghj'))


'''
@app.route('/')
@app.route('/index')
def index():
    #return "Hello, World!"
    doubles = list(Test_m(2 * n) for n in range(10))
    return render_template('main.html', my_arr = doubles)
    #return render_template('object_list.html')
'''

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin':
            error = 'Invalid username'
        elif request.form['password'] != 'a':
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            ac_log.push('User %s is log in' % request.form['username'])
            return redirect('')
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    ac_log.push('User %s log out ' % request.form['username'])
    return redirect('')

@app.route('/get_log/', methods=['GET'])
def get_log():
    data = request.args
    last_id = int(data['last_id'])
    print(last_id)
    # print(json.dumps(ac_log.get_rest_records(last_id)))
    return json.dumps(ac_log.get_rest_records(last_id))

user_view = UserAPI.as_view('user_api')
app.add_url_rule('/users/', defaults={'user_id': None}, view_func=user_view, methods=['GET'])
app.add_url_rule('/users/<user_id>', view_func=user_view, methods=['GET', 'PUT', 'DELETE'])
app.add_url_rule('/users/', view_func=user_view, methods=['POST'])

group_view = GroupAPI.as_view('group_api')
app.add_url_rule('/groups/', defaults={'group_id': None}, view_func=group_view, methods=['GET'])
#app.add_url_rule('/users/<user_id>', view_func=user_view, methods=['GET', 'PUT', 'DELETE'])
#app.add_url_rule('/users/', view_func=user_view, methods=['POST'])


obj_view = ObjectAPI.as_view('scalix_object_api')
app.add_url_rule('/object/', defaults={'object_gid': None}, view_func=obj_view, methods=['GET'])
app.add_url_rule('/object/<object_gid>', view_func=obj_view, methods=['GET', 'PUT', 'DELETE'])

user_view = TestAPI.as_view('test_api')
app.add_url_rule('/object/<path:object_gid>/test/<item>', defaults={'object_gid': None, 'item': None},
                 view_func=obj_view, methods=['GET'])


@app.route('/')
@app.route('/index')
def index():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('main.html', my_arr=sxac.get_user_list())


"""
@app.route('/')
@app.route('/index')
def index():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
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
"""