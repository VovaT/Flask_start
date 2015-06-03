import config as CONFIG
import json
import logging
import requests

"""
 1) add to exceptions and to log raise ValueError("No JSON object could be decoded")

"""


class ActionStack(object):
    def __init__(self):
        # print('init ActionStack')
        self.items = []
        self.id = 1
        self.last_id = 0

    def push(self, item, result='', _type='INFO'):
        self.items.append(dict(id=self.id, type=_type, message=item, result=result))
        self.id += 1

    def is_empty(self):
        return len(self.items) == 0

    def get_id(self):
        return self.id

    def __repr__(self):
        return self.items

    def __str__(self):
        return self.items

    def get_rest_records(self, last_id):
        # print(self.items)
        self.last_id = last_id
        if last_id == 0:
            # print('ren when 0')
            # print(self.items)
            return self.items
        if len(self.items) <= last_id:
            return []
        return self.items[last_id:]


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
        return self.OU1

    @property
    def OU1(self):
        return self.attrs.get('OU1', '')

    @property
    def OU1_location_url(self):
        url = CONFIG.MAILNODES.get(self.OU1, '')
        if len(url) == 0:
            return ''
        if url[-1] != '/':
            url += '/'
        return url

    @property
    def gid(self):
        return self.attrs.get('GLOBAL-UNIQUE-ID', None)

    def generate_menu_item(self, item_name, action):
        # print(dict(cn=item_name, gid=self.gid, action=action, mailnode=self.OU1))
        return dict(cn=item_name, gid=self.gid, action=action, mailnode=self.OU1)


class ScalixUser(ScalixObject):

    def __init__(self, attrs=[]):
        ScalixObject.__init__(self, attrs)

    def get_menu_items(self):
        ret = [self.generate_menu_item(item_name='User_info', action="object_all_attrs"),
               self.generate_menu_item(item_name='CN', action="object"),
               self.generate_menu_item(item_name='Delete', action="delete")
        ]
        return ret


class ScalixGroup(ScalixObject):
    def __init__(self, attrs=[]):
        ScalixObject.__init__(self, attrs)

    def get_menu_items(self):
        ret = [self.generate_menu_item(item_name='group_info', action="object_all_attrs"),
               self.generate_menu_item(item_name='CN', action="object"),
               self.generate_menu_item(item_name='Delete', action="delete"),
        ]
        return ret


class ScalixActions(object):

    def __init__(self):
        self.server = CONFIG.SERVER
        self.sxjs = ScalixJson()

    def get_user_list(self, mailnode='all'):
        resp, userlist = self.sxjs.get(self.server + '/user_names/%s' % mailnode)
        if resp == 200:
            for _item in userlist:
                yield (ScalixUser(_item))

    def get_user_attr(self, gid):
        pass

    def get_group_list(self):
        mailnode = 'all'
        resp, grouplist = self.sxjs.get(self.server + '/group/%s' % mailnode)
        if resp == 200:
            for _item in grouplist:
                yield (ScalixGroup(_item))

    def show_user_info(self):
        pass





