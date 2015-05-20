import config as CONFIG


import requests
import json


class ScalixJson(object):

    def __init__(self):
        self.headers = {'Content-Type': 'application/json'}

    def get(self, url, ldap_data=None):
        resp = requests.get(url, data=ldap_data, headers=self.headers, timeout=10)
        #print(resp.status_code)
        return resp.status_code, json.loads(resp.content)

    def create(self, url, ldap_data):
        resp = requests.post(url, data=json.dumps(ldap_data), headers=self.headers, timeout=15)
        return resp.status_code, json.loads(resp.content)

    def update(self, url , ldap_data):
        resp = requests.put(url, data=json.dumps(ldap_data), headers=self.headers, timeout=15)
        return resp.status_code, json.loads(resp.content)

    def delete(self, url, ldap_data=[]):
        resp = requests.delete(url, data=json.dumps(ldap_data), headers=self.headers,timeout=10)
        return resp.status_code, json.loads(resp.content)

class ScalixActions(object):

    def __init__(self):
        self.server = CONFIG.SERVER
        self.sxjs = ScalixJson()

    def get_user_list(self):
        mailnode = 'all'
        userlist = self.sxjs.get(self.server, '/user/%s' % mailnode)
        print(userlist)

