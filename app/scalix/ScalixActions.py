import config as CONFIG
import json
import logging
import requests

"""
 1) add to exceptions and to log raise ValueError("No JSON object could be decoded")

"""



class ScalixJson():

    def __init__(self, my_logging=None):
        self.headers = {'Content-Type': 'application/json'}
        logging.getLogger('requests').setLevel(logging.WARNING)
        # self.my_logging = my_logging
        self.my_logging = logging.getLogger('requests')

    def get(self, url, ldap_data=None):
        try:
            resp = requests.get(url, data=ldap_data, headers=self.headers, timeout=10)
            return resp.status_code, json.loads(resp.content)

        except requests.ConnectionError, e:
            self.my_logging.warn_informal("Request timeout", str(e))
            return 408, str(e)

    def create(self, url, ldap_data):
        try:
            resp = requests.post(url, data=json.dumps(ldap_data), headers=self.headers, timeout=15)
            return resp.status_code, json.loads(resp.content)

        except requests.ConnectionError, e:
            self.my_logging.warn_informal("Request timeout", str(e))
            return 408, str(e)

    def update(self, url, ldap_data):
        try:
            resp = requests.put(url, data=json.dumps(ldap_data), headers=self.headers, timeout=15)
            return resp.status_code, json.loads(resp.content)

        except requests.ConnectionError, e:
            self.my_logging.warn_informal("Request timeout", str(e))
            return 408, str(e)

    def delete(self, url, ldap_data=[]):
        try:
            resp = requests.delete(url, data=json.dumps(ldap_data), headers=self.headers,timeout=10)
            return resp.status_code, json.loads(resp.content)

        except requests.ConnectionError, e:
            self.my_logging.warn_informal("Request timeout", str(e))
            return 408, str(e)


class ScalixObject(object):
    def __init__(self, attrs=[]):
        self.attrs = attrs

    @property
    def cn(self):
        return self.attrs.get('CN', None)

    @property
    def mailnode(self):
        pass

    @property
    def gid(self):
        return self.attrs.get('GLOBAL-UNIQUE-ID', None)


class ScalixUser(ScalixObject):

    def __init__(self, attrs=[], server = ''):
        ScalixObject.__init__(self, attrs)
        self.server_url = server

    def get_user_info(self):
        return dict(cn='user_info', gid=self.gid, action='user_info', server_url=self.server_url)
        # submenu=[dict(cn='sub', gid=self.gid, action='user_info_sub')])


    def get_menu_items(self):
        ret = []
        ret.append(self.get_user_info())
        return ret


class ScalixActions(object):

    def __init__(self):
        self.protocol = CONFIG.PROTOCOL
        self.server = CONFIG.SERVER
        self.sxjs = ScalixJson()

    def get_user_list(self):
        mailnode = 'all'
        resp, userlist = self.sxjs.get(self.protocol + self.server + '/user_names/%s' % mailnode)
        if resp == 200:
            for _item in userlist:
                yield (ScalixUser(_item, self.protocol + self.server))

    def show_user_info(self):
        pass





