from app import app
from flask import render_template
from flask import session
from flask import request
from scalix.ScalixActions import *
from flask import redirect
from flask import url_for
from flask.views import MethodView

sxac = ScalixActions()
sxjs = ScalixJson()
ac_log = ActionStack()


class ObjectAPI(MethodView):

    def __init__(self):
        self.server = CONFIG.SERVER

    def get(self, object_gid):
        data = request.args
        print(data)
        url = CONFIG.MAILNODES.get(data['mailnode'], '')

        if len(url) == 0:
            return json.dumps(dict())

        if url[-1] != '/':
            url += '/'

        ac_log.push('Get object action. ID: %s   action:%s' % (data['action'], data['id']))
        status, JSONdata = sxjs.get(url + data['action'] + '/' + data['id'])
        #print(status)
        #print(JSONdata)
        # print(json.dumps(JSONdata))
        if status == 200:
            return json.dumps(JSONdata)
        else:
            return json.dumps(dict())

    def post(self):
        pass

    def put(self):
        pass

    def delete(self, object_gid):
        resp, data = sxjs.delete(self.server + '/object/%s' % object_gid)
        if resp == 200:
            ac_log.push('Object (ID:%s) has been deleted ' % object_gid)
            return json.dumps([200])
        else:
            ac_log.push("Can't delete object (ID:%s)" % object_gid, data)
            return json.dumps([500])


class GroupAPI(MethodView):
    def __init__(self):
        pass

    def get(self, group_id):
        if not session.get('logged_in'):
            return redirect(url_for('login'))
        if group_id is None:
            # return group list
            print('group list')
            ac_log.push('Get group list ')
            return render_template('object_list.html', my_arr=sxac.get_group_list())
        else:
            # geturn group INFO
            pass


class UserAPI(MethodView):

    def get(self, user_id):
        if not session.get('logged_in'):
            return redirect(url_for('login'))

        if user_id is None:
            ac_log.push('Get user list')
            return render_template('object_list.html', my_arr=sxac.get_user_list())
        else:
            data = request.args
            print(data)
            url = CONFIG.MAILNODES.get(data['mailnode'], '')
            if len(url) == 0:
                return json.dumps(dict())
            if url[-1] != '/':
                url += '/'
            ac_log.push('Get object action. ID: %s   action:%s' % (data['action'], data['id']))
            status, JSONdata = sxjs.get(url + data['action'] + '/' + data['id'])
            #print(status)
            #print(JSONdata)
            # print(json.dumps(JSONdata))
            if status == 200:
                return json.dumps(JSONdata)
            else:
                return json.dumps(dict())


    def post(self):
        # create a new user
        return render_template('object_list.html', my_arr=sxac.get_user_list())

    def put(self, user_id):
        # delete a single user
        return render_template('object_list.html', my_arr=sxac.get_user_list())

    def delete(self, user_id):
        # update a single user
        return render_template('object_list.html', my_arr=sxac.get_user_list())