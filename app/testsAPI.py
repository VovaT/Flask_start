from app import app
from flask import render_template
from flask import session
from flask import request
from scalix.ScalixActions import *
from flask import redirect
from flask import url_for
from flask.views import MethodView

sxacT = ScalixActions()
sxjsT = ScalixJson()
ac_logT = ActionStack()


class TestAPI(MethodView):

    def __init__(self):
        pass

    def get(self, object_gid, item):
        print(object_gid)
        print(item)
        return "TEST"

